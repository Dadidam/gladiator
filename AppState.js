import {observable} from 'mobx';

class AppState {
    @observable timer = 0;
    @observable player = {
        name: 'Willhelm'
    };

    constructor() {
        setInterval(() => {
            this.timer += 1;
        }, 1000);
    }

    resetTimer() {
        this.timer = 0;
    }

    changeName(name) {
        this.player.name = name;
    }
}

export default AppState;
