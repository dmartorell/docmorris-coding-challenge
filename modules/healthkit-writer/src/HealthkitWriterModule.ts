import { NativeModule, requireNativeModule } from 'expo';

import { HealthkitWriterModuleEvents } from './HealthkitWriter.types';

export interface MedicationData {
  name: string;
  brand: string;
  notes: string;
}

declare class HealthkitWriterModule extends NativeModule<HealthkitWriterModuleEvents> {
  requestMedicationAuthorization(): Promise<boolean>;
  writeMedication(medication: MedicationData): Promise<boolean>;
}

export default requireNativeModule<HealthkitWriterModule>('HealthkitWriter');
