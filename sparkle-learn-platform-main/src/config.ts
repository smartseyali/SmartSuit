interface Config {
  apiBaseUrl: string;
  subscriberId: string;
}

const config: Config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5217/api/client',
  subscriberId: import.meta.env.VITE_SUBSCRIBER_ID || '',
};

if (!config.subscriberId) {
  console.error('VITE_SUBSCRIBER_ID is not defined in environment variables');
}

export default config;
