const isDevelopment = __DEV__;

export const logger = {
  error: (message: string, error?: any): void => {
    if (isDevelopment) {
      console.error(`🔴 ERROR: ${message}`, error);
    }
  },

  warn: (message: string, ...args: any[]): void => {
    if (isDevelopment) {
      console.warn(`🟠 WARNING: ${message}`, ...args);
    }
  },

  log: (message: string, ...args: any[]): void => {
    if (isDevelopment) {
      console.log(`🟢 LOG: ${message}`, ...args);
    }
  },

};
