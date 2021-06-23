import axios from 'axios';

import { apiPrefix, apiPrefixCustom, jsonHeaders } from './consts';

import { UserResponse, User } from './models';

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

export const updateFavUsers: (params: User[]) => Promise<User[]> =
    async params => {
        const response = await axios.post<User[]>(
            `${baseUrlCustom}/update-fav-users`,
            params,
            jsonHeaders
        );
        return response.data;
    };

export const getFavUsers: () => Promise<User[]> = async () => {
    const response = await axios.get<User[]>(
        `${baseUrlCustom}/fav-users`,
        jsonHeaders
    );
    return response.data;
};
