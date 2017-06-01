import React from 'react';
import { Table, Button, Tooltip, message } from 'antd';

const fightDelay = 1000;
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
        // this.updateHero = props.playerStore.updateHero;

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
        // TODO: draw healthBars for opponents
        return <div>
            <h3>Battle's Chronicle</h3>
            {this.state.fightResult ? <div><a onClick={this.props.leaveArena}>Leave arena</a></div> : null}
            {this.state.fightLog.map((item, i) => {
                return <h5 key={i}>{item}</h5>
            })}
        </div>
    }

    nextTurn = () => {
        if (this.state.fightResult) {
            return;
        }

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
