import React from 'react';
import items from './Items';
import Icon from 'Icon/Icon';
import { connect } from 'react-redux';
import { quests } from 'dictionary/quests';
import narrative from 'dictionary/narrative';
import { addExp, addCoins, addHp, addItem } from '../actions';
import { Table, Button, Tooltip, Collapse, Row, Col, message } from 'antd';

const Panel = Collapse.Panel;


class Quests extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
    }

    componentWillReceiveProps(nextProps) {
        this.hero = nextProps.hero;
    };

    getFormattedList = (obj) => {
        let list = '';
        for (let key in obj) {
            if (list !== '') {
                list += ', ';
            }

            if (obj.hasOwnProperty(key)) {
                if (key == 'items') {
                    obj[key].map((elem, i) => {
                        list += `${elem.name} (${elem.probability}%)`;
                        list += i !== obj[key].length - 1 ? ', ': '';
                    })
                } else {
                    list += `${obj[key]} ${key}`;
                }
            }
        }
        return list;
    };

    render() {
        if (!this.hero) {
            return null;
        }

        const cols = this.getTableColumns();
        const data = this.getQuestsByHeroLevel();
        const narrativeQuests = Object.keys(narrative);

        return (
            <div>
                <Collapse accordion>
                    {narrativeQuests.map((quest, i) => {
                        const q = narrative[quest];
                        return <Panel header={<h3>{q.title}</h3>} key={i}>
                            <Row>
                                <Col span={5}>
                                    <p><img src={`img/narrative/${q.icon}.svg`} width="100" alt=""/></p>
                                </Col>
                                <Col span={19} className="narrDescBlock">
                                    <p className="narrDescText">{q.description}</p>
                                    <p>You need: {this.getFormattedList(q.questPrice)}</p>
                                    <p>Reward: {this.getFormattedList(q.reward)}</p>
                                    <p><Button type="primary" size="large" onClick={() => this.executeQuest()}><Icon type={'mouse'} size={20} />{' '}{'execute'}</Button></p>
                                </Col>
                            </Row>
                        </Panel>
                    })}
                </Collapse>
                <div style={{ marginBottom: 30 }}>&nbsp;</div>
                <Table columns={cols} dataSource={data} pagination={false} />
            </div>
        )
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
                <Button type="primary" size="large" onClick={() => this.executeQuest(params)}><Icon type={params.icon} size={20} />{' '}{params.title}</Button>
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
                this.props.addExp(value, this.hero);
                break;
            case 'health':
                this.props.addHp(value, this.hero);
                break;
            case 'coins':
                this.props.addCoins(value, this.hero);
                break;
            case 'items':
                this.props.addItems(value, this.hero);
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

const mapStateToProps = (state) => ({
    hero: state.hero
});

const mapDispatchToProps = dispatch => ({
    addExp: (exp, hero) => dispatch(addExp(exp, hero)),
    addCoins: (coins, hero) => dispatch(addCoins(coins, hero)),
    addHp: (hp, hero) => dispatch(addHp(hp, hero)),
    addItems: (itemList, hero) => {
        const probability = Math.floor((Math.random() * 100) + 1);
        itemList.map((item) => {
            if (probability <= item.probability) {
                dispatch(addItem(items[item.name], hero));
            }
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Quests);
