import axios from 'axios';

import { apiPrefix, apiPrefixCustom, jsonHeaders } from './consts';

import { UserResponse, ListUsers } from './models';

const baseUrl: string = apiPrefix('/');

const baseUrlCustom: string = apiPrefixCustom('');

export const getUsers: (params: string) => Promise<UserResponse> = async (
    params: string
) => {
    const response = await axios.get<UserResponse>(
        `${baseUrl}${params}`,
        jsonHeaders
    );
    return response.data;
};

export const updateFavUsers: (params: ListUsers) => Promise<ListUsers[]> =
    async params => {
        const response = await axios.post<ListUsers[]>(
            `${baseUrlCustom}/update-fav-users`,
            params,
            jsonHeaders
        );
        return response.data;
    };

export const getFavUsers: () => Promise<ListUsers[]> = async () => {
    const response = await axios.get<ListUsers[]>(
        `${baseUrlCustom}/fav-users`,
        jsonHeaders
    );
    return response.data;
};
