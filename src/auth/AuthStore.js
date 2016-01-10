/* @flow */
import { Store }             from 'airflux';
// $IgnoreFlow : global library
import Auth0Lock             from 'auth0lock';
// $IgnoreFlow : global library
import AppConfig             from 'app-config';
import moment                from 'moment';
import type Moment           from 'moment';
import * as Actions          from './AuthActions';
import AuthProfile,
    { AuthProfileFormatter } from './AuthProfile';

export type AuthStoreState = { idToken:?string, profile:?AuthProfile };

const formatter:AuthProfileFormatter = new AuthProfileFormatter();

class AuthStore extends Store {

    lock:Auth0Lock = new Auth0Lock( AppConfig.auth0.clientId, AppConfig.auth0.provider );
    idToken:?string;
    profile:?AuthProfile;
    expirationDate:?Moment;

    constructor() {
        super();
        this.listenTo( Actions.checkAuth, this.checkAuth.bind( this ));
        this.listenTo( Actions.showLoginForm, this.showLoginForm.bind( this ));
        this.listenTo( Actions.logout, this.logout.bind( this ));
        this.readStorage();
    }

    readStorage() {
        this.idToken = localStorage.getItem( 'authUserToken' );
        this.profile = formatter.readsAsString( localStorage.getItem( 'authUserProfile' ));
        const expStr = localStorage.getItem( 'authUserExpiration' );
        this.expirationDate = expStr ? moment( expStr, moment.ISO_8601 ) : null;
    }

    resetStorage() {
        localStorage.removeItem( 'authUserToken' );
        localStorage.removeItem( 'authUserProfile' );
        localStorage.removeItem( 'authUserExpiration' );
        this.readStorage();
    }

    logout() {
        this.resetStorage();
        this.publishState();
    }

    showLoginForm() {
        this.lock.show({ container: 'login-container' }, ( err, profile, token ) => {
            if ( !err ) {
                const identity = ( profile.identities || []).find( obj => profile.user_id === `${obj.provider}|${obj.user_id}` );
                this.expirationDate = moment().add( identity ? identity.expires_in : 30, 'second' );
                this.profile = formatter.reads( profile );
                this.idToken = token;
                localStorage.setItem( 'authUserToken', this.idToken );
                // $IgnoreFlow
                localStorage.setItem( 'authUserProfile', formatter.writesAsString( this.profile ));
                // $IgnoreFlow
                localStorage.setItem( 'authUserExpiration', this.expirationDate.toISOString());
                this.publishState();
            }
        });
    }

    checkAuth() {
        if ( !this.idToken || !this.expirationDate || moment().isAfter( this.expirationDate )) {
            this.resetStorage();
        }
        this.publishState();
    }

    get state():AuthStoreState {
        return {
            idToken: this.idToken,
            profile: this.profile
        };
    }
}

export default new AuthStore();
