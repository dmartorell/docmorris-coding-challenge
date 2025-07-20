import { requireNativeModule } from 'expo-modules-core';

// Define the interface for the medication data you'll pass
export interface MedicationData {
  name: string;
  dosage?: string; 
  form?: string; 
  frequency?: string;
  startDate?: string; 
  endDate?: string; 
  notes?: string; 
}

// Define the interface for your native module's methods
interface HealthKitWriterModule {
  requestMedicationAuthorization(): Promise<boolean>;
  writeMedication(medication: MedicationData): Promise<boolean>;
}

// Get the native module instance
const HealthKitWriter: HealthKitWriterModule = requireNativeModule('HealthKitWriter');

export default HealthKitWriter;