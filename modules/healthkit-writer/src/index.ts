import { requireNativeModule } from 'expo-modules-core';

export interface MedicationData {
  name: string;
  brand: string;
  notes: string;
}

interface HealthKitWriterModule {
  requestMedicationAuthorization(): Promise<boolean>;
  writeMedication(medication: MedicationData): Promise<boolean>;
}

const HealthKitWriter: HealthKitWriterModule = requireNativeModule('HealthKitWriter');

export default HealthKitWriter;
