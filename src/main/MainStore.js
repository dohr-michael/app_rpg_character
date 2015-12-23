import Store          from 'utils/Store';
import Player         from 'model/Player';


class MainStore extends Store {

    player:Player;

    constructor() {
        super();
        this.player = new Player().withName( 'Michael DOHR' );
    }


    get states() {
        return {
            player: this.player
        };
    }
}

export default new MainStore();