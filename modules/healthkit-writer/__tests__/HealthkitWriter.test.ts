import HealthkitWriter, { MedicationData } from '../src/HealthkitWriterModule';

jest.mock('../src/HealthkitWriterModule', () => ({
  __esModule: true,
  default: {
    requestMedicationAuthorization: jest.fn(),
    writeMedication: jest.fn(),
  },
}));

describe('HealthkitWriter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('requestMedicationAuthorization', () => {
    it('should resolve with true when authorization is granted', async () => {
      const mockModule = HealthkitWriter as jest.Mocked<typeof HealthkitWriter>;
      mockModule.requestMedicationAuthorization.mockResolvedValue(true);

      const result = await HealthkitWriter.requestMedicationAuthorization();

      expect(result).toBe(true);
      expect(mockModule.requestMedicationAuthorization).toHaveBeenCalledTimes(1);
    });

    it('should reject when HealthKit is unavailable', async () => {
      const mockModule = HealthkitWriter as jest.Mocked<typeof HealthkitWriter>;
      mockModule.requestMedicationAuthorization.mockRejectedValue(
        new Error('HEALTHKIT_UNAVAILABLE'),
      );

      await expect(HealthkitWriter.requestMedicationAuthorization())
        .rejects.toThrow('HEALTHKIT_UNAVAILABLE');
    });
  });

  describe('writeMedication', () => {
    const mockMedication: MedicationData = {
      name: 'Aspirin',
      brand: 'Bayer',
      notes: 'Take with food',
    };

    it('should resolve with true when medication is written successfully', async () => {
      const mockModule = HealthkitWriter as jest.Mocked<typeof HealthkitWriter>;
      mockModule.writeMedication.mockResolvedValue(true);

      const result = await HealthkitWriter.writeMedication(mockMedication);

      expect(result).toBe(true);
      expect(mockModule.writeMedication).toHaveBeenCalledWith(mockMedication);
    });

    it('should reject when writing fails', async () => {
      const mockModule = HealthkitWriter as jest.Mocked<typeof HealthkitWriter>;
      mockModule.writeMedication.mockRejectedValue(
        new Error('SAVE_ERROR'),
      );

      await expect(HealthkitWriter.writeMedication(mockMedication))
        .rejects.toThrow('SAVE_ERROR');
    });

    it('should handle medication data with all fields', async () => {
      const fullMedication: MedicationData = {
        name: 'Ibuprofen',
        brand: 'Advil',
        notes: 'Take every 6 hours',
      };

      const mockModule = HealthkitWriter as jest.Mocked<typeof HealthkitWriter>;
      mockModule.writeMedication.mockResolvedValue(true);

      await HealthkitWriter.writeMedication(fullMedication);

      expect(mockModule.writeMedication).toHaveBeenCalledWith(fullMedication);
    });
  });
});
