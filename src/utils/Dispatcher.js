import { Dispatcher } from 'flux';

const flux = new Dispatcher();

export function register( callback ) {
    return flux.register( callback );
}

export function waitFor( ids ) {
    return flux.waitFor( ids );
}

// Some Flux examples have methods like `handleViewAction`
// or `handleServerAction` here. They are only useful if you
// want to have extra pre-processing or logging for such actions,
// but I found no need for them.

/**
 * Dispatches a single action.
 */
export function dispatch( type, args = [] ) {
    if( !type ) {
        throw new Error( 'You forgot to specify type.' );
    }
    flux.dispatch( { type, data: args } );
}