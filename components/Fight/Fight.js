import React from 'react';
import { Timeline, Progress, Card, Col, Row } from 'antd';

import './fight.less';

const circleWidth = 80;
const fightDelay = 2500;

const resultEnum = {
    playerWin: 1,
    playerLoose: 2,
    draw: 3
};

const fightLogPhrases = [
    'Oh... It was so painful!',
    'You are beating like a girl',
    'And you call this a blow?',
    'What was it?..',
    'Gosh, that\'s power!'
];


class Fight extends React.Component {
    constructor(props) {
        super(props);

        this.fight = null;
        this.playerHero = props.playerHero;
        this.playerOpponent = props.playerOpponent;

        this.state = {
            turn: 1,
            fightLog: [],
            fightResult: null
        };
    }

    componentDidMount() {
        this.fight = setInterval(
            () => this.nextTurn(),
            fightDelay
        );
    }

    componentWillUnmount() {
        clearInterval(this.fight);
    }

    render() {
        const result = this.getResultObject();

        const plHero = this.playerHero;
        const opHero = this.playerOpponent;
        const playerHP = this.getPercentValue(plHero.health, plHero.maxHealth);
        const opponentHP = this.getPercentValue(opHero.health, opHero.maxHealth);

        return <div style={{ background: '#ECECEC', padding: '30px' }}>
            {this.state.fightResult ? <div className="fightResult">
                    <div><span className={result.style}>{result.description}</span></div>
                    <a onClick={this.props.leaveArena}>Leave arena</a>
                </div> : null
            }
            <Row className="fightRow">
                <Col span="8" className="fightCol">
                    <Card title={this.playerHero.name} bordered={false}>
                        <Progress
                            type="circle"
                            percent={playerHP}
                            width={circleWidth}
                            status="exception"
                            format={val => val > 0 ? `${val}%` : 'Died'}
                        />
                    </Card>
                </Col>
                <Col span="8" className="fightCol">
                    <Card title="Battle's Chronicle" bordered={false}>
                        <Timeline>
                            {this.state.fightLog.map((item, i) => {
                                return <Timeline.Item key={i}>{item}</Timeline.Item>
                            })}
                        </Timeline>
                    </Card>
                </Col>
                <Col span="8" className="fightCol">
                    <Card title={this.playerOpponent.name} bordered={false}>
                        <Progress
                            type="circle"
                            percent={opponentHP}
                            width={circleWidth}
                            status="exception"
                            format={val => val > 0 ? `${val}%` : 'Died'}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    }

    getPercentValue = (val, maxVal) => {
        return (val * 100) / maxVal;
    };

    getResultObject = () => {
        if (!this.state.fightResult) {
            return {
                description: '',
                style: ''
            };
        }

        switch (this.state.fightResult) {
            case resultEnum.playerWin:
                return {
                    description: 'You won!',
                    style: 'fightGreenLabel'
                };
                break;
            case resultEnum.playerLoose:
                return {
                    description: 'You loose :(',
                    style: 'fightRedLabel'
                };
                break;
            case resultEnum.draw:
                return {
                    description: 'DRAW!',
                    style: ''
                };
                break;
            default:
                return {
                    description: '',
                    style: ''
                };
                break;
        }
    };

    nextTurn = () => {
        if (this.state.fightResult) {
            return;
        }
        // TODO: hero restore HP in a battle
        let fightResult = null;

        this.playerHero.health -= this.getRandomValue(this.playerOpponent.minDamage, this.playerOpponent.maxDamage);
        this.playerOpponent.health -= this.getRandomValue(this.playerHero.minDamage, this.playerHero.maxDamage);

        if (this.playerHero.health <= 0 && this.playerOpponent.health <= 0) {
            fightResult = resultEnum.draw;
        } else if (this.playerOpponent.health <= 0) {
            fightResult = resultEnum.playerWin;
        } else if (this.playerHero.health <= 0) {
            fightResult = resultEnum.playerLoose;
        }

        // FINISH HIM!
        if (fightResult) {
            this.setState({
                fightResult
            });
        } else {
            // TODO: improve log entries
            let fightLog = this.state.fightLog;
            let turn = this.state.turn;

            fightLog.push(fightLogPhrases[this.getRandomValue(0,4)]);
            turn++;

            this.setState({
                fightLog, turn
            });
        }
    };

    getRandomValue = (min, max) => {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }
}

export default Fight;
