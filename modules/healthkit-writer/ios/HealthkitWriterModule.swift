import ExpoModulesCore
import HealthKit

public class HealthKitWriterModule: Module {
  private let healthStore = HKHealthStore()

  private func parseISODateString(_ dateString: String?) -> Date? {
    guard let dateString = dateString else { return nil }
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return formatter.date(from: dateString)
  }

  public func definition() -> ModuleDefinition {
    Name("HealthKitWriter")

    AsyncFunction("requestMedicationAuthorization") { (promise: Promise) in
      guard HKHealthStore.isHealthDataAvailable() else {
        promise.reject("HEALTHKIT_UNAVAILABLE", "HealthKit is not available on this device.")
        return
      }

      guard let mindfulType = HKObjectType.categoryType(forIdentifier: .mindfulSession) else {
        promise.reject("INTERNAL_ERROR", "Mindful Session type is not available.")
        return
      }
      
      let typesToWrite: Set<HKSampleType> = [mindfulType]

      healthStore.requestAuthorization(toShare: typesToWrite, read: nil) { (success, error) in
        if let error = error {
          promise.reject("AUTHORIZATION_ERROR", "HealthKit authorization failed: \(error.localizedDescription)")
          return
        }
        promise.resolve(success)
      }
    }

    AsyncFunction("writeMedication") { (medicationData: [String: Any], promise: Promise) in
      guard HKHealthStore.isHealthDataAvailable() else {
        promise.reject("HEALTHKIT_UNAVAILABLE", "HealthKit is not available on this device.")
        return
      }

      guard let name = medicationData["name"] as? String else {
        promise.reject("INVALID_DATA", "Medication name is required.")
        return
      }

      guard let mindfulType = HKObjectType.categoryType(forIdentifier: .mindfulSession) else {
        promise.reject("INVALID_TYPE", "Mindful session type is not available.")
        return
      }
      
      var metadata: [String: Any] = ["MedicationName": name]
      
      if let dosage = medicationData["dosage"] as? String { metadata["Dosage"] = dosage }
      if let form = medicationData["form"] as? String { metadata["Form"] = form }
      if let frequency = medicationData["frequency"] as? String { metadata["Frequency"] = frequency }
      if let notes = medicationData["notes"] as? String { metadata["Notes"] = notes }
      metadata["SourceApp"] = "HeimApo"

      let startDate = self.parseISODateString(medicationData["startDate"] as? String) ?? Date()
      let endDate = self.parseISODateString(medicationData["endDate"] as? String) ?? startDate

      let mindfulSample = HKCategorySample(
        type: mindfulType,
        value: HKCategoryValue.notApplicable.rawValue,
        start: startDate,
        end: endDate,
        metadata: metadata
      )

      healthStore.save(mindfulSample) { (success, error) in
        if let error = error {
          promise.reject("SAVE_ERROR", "Failed to save medication to HealthKit: \(error.localizedDescription)")
          return
        }
        promise.resolve(success)
      }
    }
  }
}