import { guid }       from 'utils/tools';
import { dispatch }   from 'utils/Dispatcher';

export class ActionExecutor {
    successName:string;
    failureName:string;
    _promise:Promise;
    resolved:boolean = false;

    constructor( successName:string, failureName:string ) {
        this.successName = successName;
        this.failureName = failureName;
    }

    get promise():Promise {
        return this._promise;
    }

    set promise( value:Promise ) {
        this._promise = value;
        if( this.promise ) {
            this.promise
                .then( this.success.bind( this ) )
                .catch( this.failure.bind( this ) );
        }
    }

    success( result ) {
        if( !this.resolved ) {
            this.resolved = true;
            dispatch( this.successName, [result] );
        }
    }

    failure( error ) {
        if( !this.resolved ) {
            this.resolved = true;
            dispatch( this.failureName, [error] );
        }
    }
}

export default class Action {

    constructor() {
        this.guid = guid();
    }

    /**
     * @param callback undefined | ( args ) => Promise
     * @returns {func}
     */
    async( callback ) {
        const successName = this.guid + "_success";
        const failureName = this.guid + "_failure";

        const func = ( ...args ) => {
            const executor = new ActionExecutor( successName, failureName );
            if( callback ) {
                executor.promise = callback( ...args );
            }
            dispatch( this.guid, args.concat( executor ) );
            return executor;
        };

        Object.defineProperties( func, {
            name:    { value: this.guid },
            success: { value: successName },
            failure: { value: failureName }
        } );
        return func;
    }
};