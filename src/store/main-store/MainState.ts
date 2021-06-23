import { UserResponse, User } from '../../webservices/models';

export default class MainState {
    public users: UserResponse | null = null;
    public currentLanguage: string = 'es';
    public userNationalityQuery: string = '';
    public userGenderQuery: string = '';
    public userAgeQuery: number = 0;
    public currentUser: User;
    public favUsers: User[] = [];
    public favApiUsers: User[] = [];
    public isLoading: boolean = false;
    public total: number = 100;
}
