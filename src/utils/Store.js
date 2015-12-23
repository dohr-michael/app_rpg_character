import { EventEmitter } from 'events';
import { register }     from 'utils/Dispatcher';


const CHANGE_EVENT = 'CHANGE';

function listenDispatcher( store:Store ):Function {
    return action => {
        if( store.listenMap.has( action.type ) ) {
            store.listenMap.get( action.type )( ...action.data );
        }
    };
}


export default class Store {

    constructor() {
        this.emitter = new EventEmitter();
        this.emitter.setMaxListeners( 0 );
        register( listenDispatcher( this ) );
        this.listenMap = new Map();
    }

    listenOf( action, callback ) {
        var actionName = action;
        if( action.hasOwnProperty( 'name' ) ) {
            actionName = action.name;
        }
        this.listenMap.set( actionName, callback );
    }

    get states() {
        return {};
    }

    emitChange() {
        this.emitter.emit( CHANGE_EVENT );
    }

    addChangeListener( callback ) {
        this.emitter.on( CHANGE_EVENT, callback );
    }

    removeChangeListener( callback ) {
        this.emitter.removeListener( CHANGE_EVENT, callback );
    }
}