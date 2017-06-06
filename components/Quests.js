import React from 'react';
import Icon from 'Icon/Icon';
import {quests} from 'dictionary/quests';
import { Table, Button, Tooltip, message } from 'antd';


class Quests extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
        this.playerStore = props.playerStore;
    }

    componentWillReceiveProps(nextProps) {
        this.hero = nextProps.hero;
    };

    render() {
        if (!this.hero) {
            return null;
        }

        const cols = this.getTableColumns();
        const data = this.getQuestsByHeroLevel();

        return <Table columns={cols} dataSource={data} pagination={false} />
    }

    checkQuest = params => {
        const costs = Object.keys(params.cost);

        let canExecute = true;

        for (let i = 0; i < costs.length; i++) {
            if (params.cost[costs[i]] > this.hero[costs[i]]) {
                canExecute = false;
                break;
            }
        }

        if (canExecute) {
            return <span>
                <Button type="primary" size="large" onClick={this.executeQuest.bind(this, params)}><Icon type={params.icon} size={20} />{' '}{params.title}</Button>
            </span>
        }

        return <Tooltip placement="top" title="Quest conditions not met">
            <Button disabled size="large"><Icon type={params.icon} size={20} />{' '}{params.title}</Button>
        </Tooltip>;
    };

    executeQuest = params => {
        // Apply costs subtraction action
        const costs = Object.keys(params.cost);

        for (let i = 0; i < costs.length; i++) {
            this.doActionByType(costs[i], params.cost[costs[i]], false);
        }

        // Apply reward action
        const rewards = Object.keys(params.reward);

        for (let i = 0; i < rewards.length; i++) {
            this.doActionByType(rewards[i], params.reward[rewards[i]]);
        }

        message.success(`You\'ve finished the quest and received: ${params.textReward} `, 3);
    };

    doActionByType = (type, value, addition = true) => {
        if (!addition) {
            value = -value;
        }

        switch (type) {
            case 'exp':
                this.playerStore.addExp(value, this.hero);
                break;
            case 'health':
                this.playerStore.addHp(value, this.hero);
                break;
            case 'coins':
                this.playerStore.addCoins(value, this.hero);
                break;
        }
    };

    getTableColumns = () => {
        return [{
            title: 'Quest title',
            dataIndex: 'quest',
            key: 'quest',
            render: params => this.checkQuest(params)
        }, {
            title: 'Reward',
            dataIndex: 'reward',
            key: 'reward',
        }, {
            title: 'Cost',
            dataIndex: 'cost',
            key: 'cost',
        }];
    };

    getQuestsByHeroLevel = () => {
        const level = this.hero.level;

        return quests.filter((quest) => {
            return level >= quest.level.min && level <= quest.level.max;
        })
    };
}

export default Quests;
