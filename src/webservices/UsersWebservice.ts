import axios from 'axios';

import { apiPrefix, jsonHeaders } from './consts';

import { UserResponse } from './models';

const baseUrl: string = apiPrefix('/');

export const getUsers: (params: string) => Promise<UserResponse> = async (
    params: string
) => {
    const response = await axios.get<UserResponse>(
        `${baseUrl}${params}`,
        jsonHeaders
    );
    return response.data;
};
