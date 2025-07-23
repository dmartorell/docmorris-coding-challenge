package expo.modules.healthkitwriter

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

class HealthkitWriterModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("HealthkitWriter")

    AsyncFunction("requestMedicationAuthorization") { promise: Promise ->
      promise.reject(
        "HEALTHKIT_UNAVAILABLE", 
        "HealthKit is not available on Android. Consider using Health Connect.",
        null
      )
    }

    AsyncFunction("writeMedication") { medicationData: Map<String, Any?>, promise: Promise ->
      promise.reject(
        "HEALTHKIT_UNAVAILABLE",
        "HealthKit is not available on Android. Consider using Health Connect for health data.",
        null
      )
    }
  }
}