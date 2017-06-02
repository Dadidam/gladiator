import React from 'react';
import { resultEnum } from './resultEnum';
import { Timeline, Progress, Card, Col, Row } from 'antd';

import './fight.less';

const circleWidth = 80;
const fightDelay = 1500;

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
        const playerHP = Math.round(this.getPercentValue(plHero.health, plHero.maxHealth));
        const opponentHP = Math.round(this.getPercentValue(opHero.health, opHero.maxHealth));

        return <div style={{ background: '#ECECEC', padding: '30px' }}>
            {this.state.fightResult ? <div className="fightResult">
                    <div><span className={result.style}>{result.description}</span></div>
                    <a onClick={this.props.leaveArena.bind(this, this.playerHero, this.state.fightResult)}>Leave arena</a>
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
         
        let fightResult = null;

        const heroDamage = this.getRandomValue(this.playerOpponent.minDamage, this.playerOpponent.maxDamage);
        const oppDamage = this.getRandomValue(this.playerHero.minDamage, this.playerHero.maxDamage);

        this.playerHero.health -= heroDamage;
        this.playerOpponent.health -= oppDamage;

        if (this.playerHero.health <= 0 && this.playerOpponent.health <= 0) {
            fightResult = resultEnum.draw;
        } else if (this.playerOpponent.health <= 0) {
            fightResult = resultEnum.playerWin;
        } else if (this.playerHero.health <= 0) {
            fightResult = resultEnum.playerLoose;
        }

        let turn = this.state.turn;
        let fightLog = this.state.fightLog;
        const logMsg = this.generateLogMessage(this.playerHero.name, heroDamage, this.playerOpponent.name, oppDamage);

        fightLog.push(logMsg);
        turn++;

        this.setState({
            fightLog, turn, fightResult
        });
    };

    getRandomValue = (min, max) => {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    };

    generateLogMessage = (p1Name, p1Damage, p2Name, p2Damage) => {
        return <div>
            <p>
                <span className="fightLogHeroName">{p1Name}</span> take <span className="fightLogDamage">{p1Damage}</span> damage from <span className="fightLogHeroName">{p2Name}</span>
            </p>
            <p className="fightLogMessage">
                {fightLogPhrases[this.getRandomValue(0,4)]}
            </p>
            <p>
                <span className="fightLogHeroName">{p2Name}</span> take <span className="fightLogDamage">{p2Damage}</span> damage from <span className="fightLogHeroName">{p1Name}</span>
            </p>
        </div>;

    };
}

export default Fight;
