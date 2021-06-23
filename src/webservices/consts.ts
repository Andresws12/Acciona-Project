export const API_PREFIX = 'https://randomuser.me/api';
export const API_PREFIX_CUSTOM = 'http://localhost:3000/api';

export const apiPrefix = (url: string): any => API_PREFIX + url;
export const apiPrefixCustom = (url: string): any => API_PREFIX_CUSTOM + url;

export const jsonHeaders = {
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
};
export const htmlHeaders = {
    headers: {
        Accept: 'text/html',
    },
};
