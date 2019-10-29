export const ENV = (process.env.REACT_APP_ENV || 'production').trim();

export const API_ENDPOINT = (process.env.REACT_APP_API_ENDPOINT || '').trim();
if (!API_ENDPOINT) throw new Error('Please provide an API_ENDPOINT');

export const AUTH_ENDPOINT = (process.env.REACT_APP_AUTH_ENDPOINT || '').trim();
if (!AUTH_ENDPOINT) throw new Error('Please provide an API_ENDPOINT');

export const SENTRY_KEY = (process.env.REACT_APP_SENTRY_KEY || '').trim();

export const IS_DEVELOPMENT = ENV === 'development';
export const SNACKBAR_DEFAULT_TIMEOUT = 3000;
