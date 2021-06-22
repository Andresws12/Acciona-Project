import { Getters } from 'vuex-smart-module';

import MainState from './MainState';

export default class MainGetters extends Getters<MainState> {
    public get query(): string {
        return `${this.getters.totalQuery}${this.getters.searchGenderQuery}${this.getters.searchNationalityQuery}${this.getters.searchAgeQuery}`;
    }

    public get totalQuery(): string {
        return this.state.total ? `?results=${this.state.total}` : '';
    }

    public get searchGenderQuery(): string {
        return this.state.userGenderQuery !== ''
            ? `&gender=${this.state.userGenderQuery}`
            : '';
    }

    public get searchNationalityQuery(): string {
        return this.state.userNationalityQuery !== ''
            ? `&nat=${this.state.userNationalityQuery}`
            : '';
    }

    public get searchAgeQuery(): string {
        return this.state.userAgeQuery !== 0
            ? `&dob=${this.state.userAgeQuery}`
            : '';
    }

    public get favUsersToDownload(): object[] {
        return this.state.favUsers.map(user => {
            return {
                Genero: user.gender,
                Nombre: user.name.first,
                Nacionalidad: user.location.country,
                FechaNacimiento: user.dob.date,
                FechaRegistro: user.registered.date,
            };
        });
    }

    public get usersToDownload(): object[] {
        return this.state.users
            ? this.state.users.results.map(user => {
                  return {
                      Genero: user.gender,
                      Nombre: user.name.first,
                      Nacionalidad: user.location.country,
                      FechaNacimiento: user.dob.date,
                      FechaRegistro: user.registered.date,
                  };
              })
            : [];
    }
}
