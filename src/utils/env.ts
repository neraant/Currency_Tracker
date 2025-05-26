type EnvVars = {
  CURRENCY_API_KEY: string;
  TWELVEDATA_API_KEY: string;
  CURRENCY_API_BASE_URL: string;
  TWELVEDATA_API_BASE_URL: string;
};

function validateEnvVar(key: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const ENV: EnvVars = {
  CURRENCY_API_KEY: validateEnvVar(
    'REACT_APP_CURRENCY_API_KEY',
    process.env.REACT_APP_CURRENCY_API_KEY
  ),
  TWELVEDATA_API_KEY: validateEnvVar(
    'REACT_APP_TWELVEDATA_API_KEY',
    process.env.REACT_APP_TWELVEDATA_API_KEY
  ),
  CURRENCY_API_BASE_URL: validateEnvVar(
    'REACT_APP_CURRENCY_API_BASE_URL',
    process.env.REACT_APP_CURRENCY_API_BASE_URL
  ),
  TWELVEDATA_API_BASE_URL: validateEnvVar(
    'REACT_APP_TWELVEDATA_BASE_URL',
    process.env.REACT_APP_TWELVEDATA_BASE_URL
  ),
};
