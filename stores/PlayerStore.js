import {observable} from 'mobx';

import * as storage from 'services/localStorage';
import * as playerService from 'services/player';

class PlayerStore {
    @observable player = {};

    constructor() {
        this.player = storage.get('player');
    }

    resetTimer() {
        this.timer = 0;
    }

    changeName(name) {
        this.player.name = name;
    }
}

export default PlayerStore;
