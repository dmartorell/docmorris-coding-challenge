// modules/healthkit-writer/ios/HealthKitWriterModule.swift (UPDATED)

import ExpoModulesCore
import HealthKit // Import HealthKit framework

public class HealthKitWriterModule: Module { // Renamed class to match module name
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to it.
    Name("HealthKitWriter") // <-- Module name for JS

    let healthStore = HKHealthStore()

    // --- Helper to parse ISO 8601 strings to Date ---
    func parseISODateString(_ dateString: String?) -> Date? {
        guard let dateString = dateString else { return nil }
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter.date(from: dateString)
    }

    // --- Method to Request Authorization ---
    AsyncFunction("requestMedicationAuthorization") { promise in
      guard HKHealthStore.isHealthDataAvailable() else {
        promise.reject("HEALTHKIT_UNAVAILABLE", "HealthKit is not available on this device.")
        return
      }

      // Define the types of data we want to write
      // For general medication logging, medicationAdherence or medinicationUsage are common.
      let typesToWrite: Set<HKSampleType> = [
        HKObjectType.categoryType(forIdentifier: .medicationAdherence)!,
        HKObjectType.categoryType(forIdentifier: .medinicationUsage)!, // Specific usage if applicable
      ]

      healthStore.requestAuthorization(toShare: typesToWrite, read: nil) { (success, error) in
        if let error = error {
          promise.reject("AUTHORIZATION_ERROR", "HealthKit authorization failed: \(error.localizedDescription)", error)
          return
        }
        promise.resolve(success)
      }
    }

    // --- Method to Write Medication Data ---
    AsyncFunction("writeMedication") { (medicationData: [String: Any], promise: Promise) in
      guard HKHealthStore.isHealthDataAvailable() else {
        promise.reject("HEALTHKIT_UNAVAILABLE", "HealthKit is not available on this device.")
        return
      }

      // Extract all fields from JavaScript data
      guard let name = medicationData["name"] as? String else {
        promise.reject("INVALID_DATA", "Medication name is required.")
        return
      }
      let dosage = medicationData["dosage"] as? String
      let form = medicationData["form"] as? String
      let frequency = medicationData["frequency"] as? String
      let startDateString = medicationData["startDate"] as? String
      let endDateString = medicationData["endDate"] as? String
      let notes = medicationData["notes"] as? String

      // Parse start and end dates (use current date if not provided)
      let startDate = parseISODateString(startDateString) ?? Date()
      let endDate = parseISODateString(endDateString) ?? startDate // End date defaults to start date if not provided

      // HealthKit doesn't have a direct "medication name" type for category samples.
      // We store details like name, dosage, etc., in the metadata dictionary.
      let medicationType = HKObjectType.categoryType(forIdentifier: .medicationAdherence)! // Or .medinicationUsage

      var metadata: [String: Any] = [:]

      // Add custom metadata keys for all relevant fields
      metadata["MedicationName"] = name // Custom key for the medication name
      if let dosage = dosage { metadata["Dosage"] = dosage }
      if let form = form { metadata[HKMetadataKeyMedicationForm] = form } // Use standard HK key for form
      if let frequency = frequency { metadata["Frequency"] = frequency }
      if let notes = notes { metadata[HKMetadataKeyNotes] = notes } // Use standard HK key for notes

      // Create a category sample for medication adherence (e.e., taken)
      let medicationSample = HKCategorySample(
        type: medicationType,
        value: HKCategoryValueMedicationAdherence.taken, // Value indicating medication was taken
        start: startDate,
        end: endDate,
        metadata: metadata
      )

      // Save the sample to HealthKit
      healthStore.save(medicationSample) { (success, error) in
        if let error = error {
          promise.reject("SAVE_ERROR", "Failed to save medication to HealthKit: \(error.localizedDescription)", error)
          return
        }
        promise.resolve(success)
      }
    }
  }
}