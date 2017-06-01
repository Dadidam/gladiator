import React from 'react';
import { Table, Button, Tooltip, message } from 'antd';

const fightDelay = 1000;
const resultEnum = {
    playerWin: 1,
    playerLoose: 2,
    draw: 3
};

class Fight extends React.Component {
    constructor(props) {
        super(props);

        this.fight = null;
        // this.hero = props.hero;
        // this.updateHero = props.playerStore.updateHero;

        this.state = {
            turn: 1,
            fightLog: [],
            fightResult: null
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     this.hero = nextProps.hero;
    // };

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
        return <div>
            <h3>Battle's Chronicle</h3>
            {this.state.fightResult ? <div><a onClick={this.props.leaveArena}>Leave arena</a></div> : null}
            {this.state.fightLog.map((item, i) => {
                return <h5 key={i}>{item}</h5>
            })}
        </div>
    }

    nextTurn = () => {
        let fightLog = this.state.fightLog;
        let turn = this.state.turn;

        switch (this.state.turn) {
            case 1:
                fightLog.push('Oh... It was so painful!');
                turn++;
                break;
            case 2:
                fightLog.push('You are beating like a girl');
                turn++;
                break;
            default:
                this.setState({
                    fightResult: resultEnum.playerWin
                });
                break;
        }

        this.setState({
            fightLog, turn
        });
    }
}

export default Fight;
