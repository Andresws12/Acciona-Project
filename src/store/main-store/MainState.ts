import { UserResponse, User, ListUsers } from '../../webservices/models';

export default class MainState {
    public users: UserResponse | null = null;
    public userNationalityQuery: string = '';
    public currentLanguage: string = 'es';
    public userGenderQuery: string = '';
    public isLoading: boolean = false;
    public userAgeQuery: number = 0;
    public favApiUsers: ListUsers[] = [];
    public favUsers: User[] = [];
    public total: number = 100;
    public currentUser: User | null = null;
}
