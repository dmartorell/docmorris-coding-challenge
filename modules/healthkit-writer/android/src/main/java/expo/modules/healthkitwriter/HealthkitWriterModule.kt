package expo.modules.healthkitwriter

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

public class HealthKitWriterModule : Module() {
  public override fun definition() = ModuleDefinition {
    Name("HealthKitWriter")

    AsyncFunction("requestMedicationAuthorization") { promise ->
      android.util.Log.w("HealthKitWriter", "HealthKit is an iOS-specific API. No HealthKit authorization on Android. Resolving false.")
      promise.resolve(false)
    }

    AsyncFunction("writeMedication") { medicationData: Map<String, Any?>, promise ->
      android.util.Log.w("HealthKitWriter", "HealthKit is an iOS-specific API. Cannot write medication on Android: $medicationData. Resolving false.")
      promise.resolve(false)
    }
  }
}