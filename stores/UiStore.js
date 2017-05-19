import {observable} from 'mobx';
import tabs from 'components/mainMenuTabs';

import * as storage from 'services/localStorage';


class UiStore {
    @observable currentTab = null;

    constructor() {
        this.player = storage.get('player');
        this.currentTab = this.player && this.player.activeHeroId ? 1 : 4;
    }

    updateCurrentTab = tab => {
        this.currentTab = tab;
    };

    changeTab = (item) => {
        switch (item.key) {
            case '1':
                this.updateCurrentTab(tabs.quests);
                break;
            case '2':
                this.updateCurrentTab(tabs.arena);
                break;
            case '3':
                this.updateCurrentTab(tabs.shop);
                break;
            case '4':
                this.updateCurrentTab(tabs.changeHero);
                break;
        }
    };
}

export default UiStore;
