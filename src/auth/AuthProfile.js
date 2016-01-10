/* @flow */

export default class AuthProfile {
    email:string;
    name:string;
    locale:string;
    picture:string;
}

export class AuthProfileFormatter {

    reads( json:?Object ):?AuthProfile {
        if ( !json ) {
            return null;
        }
        const result = new AuthProfile();
        result.email = json.email;
        result.name = json.name;
        result.locale = json.locale;
        result.picture = json.picture;
        return result;
    }

    readsAsString( jsonStr:?string ):?AuthProfile {
        return jsonStr ? this.reads( JSON.parse( jsonStr )) : null;
    }


    writes( obj:?AuthProfile ):?Object {
        if ( !obj ) {
            return null;
        }
        return {
            email: obj.email,
            name: obj.name,
            locale: obj.locale,
            picture: obj.picture
        };
    }

    writesAsString( obj:?AuthProfile ):?string {
        return obj ? JSON.stringify( this.writes( obj )) : null;
    }

}
