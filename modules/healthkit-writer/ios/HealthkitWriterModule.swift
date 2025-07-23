import ExpoModulesCore
import HealthKit

public class HealthkitWriterModule: Module {
  private let healthStore = HKHealthStore()
  
  private func parseISODateString(_ dateString: String?) -> Date? {
    guard let dateString = dateString else { return nil }
    let formatter = ISO8601DateFormatter()
    formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    return formatter.date(from: dateString)
  }
  
  public func definition() -> ModuleDefinition {
    Name("HealthkitWriter")
    
    AsyncFunction("requestMedicationAuthorization") { (promise: Promise) in
      guard HKHealthStore.isHealthDataAvailable() else {
        promise.reject("HEALTHKIT_UNAVAILABLE", "HealthKit is not available.")
        return
      }
      
      guard let medicationType = HKObjectType.quantityType(forIdentifier: .inhalerUsage) else {
        promise.reject("INTERNAL_ERROR", "Medication type is not available.")
        return
      }
      
      let typesToWrite: Set<HKSampleType> = [medicationType]
      healthStore.requestAuthorization(toShare: typesToWrite, read: nil) { (success, error) in
        if let error = error {
          promise.reject("AUTHORIZATION_ERROR", "Authorization failed: \(error.localizedDescription)")
          return
        }
        let status = self.healthStore.authorizationStatus(for: medicationType)
        promise.resolve(status == .sharingAuthorized)
      }
    }
    
    AsyncFunction("writeMedication") { (medicationData: [String: Any], promise: Promise) in
      guard HKHealthStore.isHealthDataAvailable() else {
        promise.reject("HEALTHKIT_UNAVAILABLE", "HealthKit is not available.")
        return
      }
      
      guard let medicationType = HKObjectType.quantityType(forIdentifier: .inhalerUsage) else {
        promise.reject("INVALID_TYPE", "Medication type is not available.")
        return
      }
      
      var metadata: [String: Any] = [:]
      
      metadata["DataType"] = "Medication"
      if let name = medicationData["name"] as? String { 
        metadata["Medication Name"] = name 
      }
      if let brand = medicationData["brand"] as? String { 
        metadata["Medication Brand"] = brand 
      }
      if let notes = medicationData["notes"] as? String { 
        metadata["Notes"] = notes 
      }
      
      metadata[HKMetadataKeyWasUserEntered] = true
      
      let startDate = self.parseISODateString(medicationData["startDate"] as? String) ?? Date()
      let endDate = startDate
      
      let quantityValue: Double = 1.0
      
      let quantity = HKQuantity(unit: HKUnit.count(), doubleValue: quantityValue)
      
      let medicationSample = HKQuantitySample(
        type: medicationType,
        quantity: quantity,
        start: startDate,
        end: endDate,
        metadata: metadata
      )
      
      healthStore.save(medicationSample) { (success, error) in
        if let error = error {
          promise.reject("SAVE_ERROR", "Failed to save: \(error.localizedDescription)")
          return
        }
        promise.resolve(success)
      }
    }
  }
}