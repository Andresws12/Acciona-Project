import { getElem } from './utilities/utils';

import {
    topNavbar,
    userTable,
    favUserTable,
} from './utilities/01UserTables.selectors';

describe('01 User tables', () => {
    beforeEach(() => {
        cy.visit('/');
    });
    it('User overview', () => {
        getElem(topNavbar).should('be.visible');
        getElem(userTable).should('be.visible');
        getElem(favUserTable).should('be.visible');
    });
});
