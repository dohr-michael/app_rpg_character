import Store          from 'utils/Store';
import * as Actions   from 'actions/MainActions';


class SayHelloStore extends Store {

    message:string = '';

    constructor() {
        super();
        this.listenOf( Actions.sayHello.success, this.sayHello.bind( this ) );
    }

    sayHello( result ) {
        this.message = result.message;
        this.emitChange();
    }

    get states() {
        return {
            message: this.message
        }
    }
}

const store = new SayHelloStore();
export default store;