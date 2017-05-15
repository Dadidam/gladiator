import {observable} from 'mobx';
import tabs from 'components/mainMenuTabs';

import * as storage from 'services/localStorage';

class UiStore {
    @observable currentTab = null;

    constructor() {
        this.currentTab = storage.get('player') ? 1 : 4;
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
                // TODO: fix changeHero, include playerStore and execute changeHero() method
                // this.changeHero();
                this.updateCurrentTab(tabs.changeHero);
                break;
        }
    };
}

export default UiStore;
