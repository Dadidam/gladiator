import React from 'react';
import Character from 'Character';
import { connect } from 'react-redux';
import HeroSelector from 'Player/HeroSelector';
import CreateButton from 'Player/CreateButton';
import CreateHeroForm from 'Player/CreateHeroForm';
import { updatePlayer } from '../actions';


class Player extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            heroName: '',
            editMode: false,
            formDisabled: true
        };
    }

    render() {
        const player = this.props.player;
        const showSelector = player ? !this.state.editMode && !player.activeHeroId : !this.state.editMode;

        return (
            <div>
                <CreateHeroForm
                    updatePlayerHandler={this.updatePlayer}
                    updateHeroNameHandler={this.updateHeroName}
                    createNewHeroHandler={this.createNewHero}
                    formDisabled={this.state.formDisabled}
                    editMode={this.state.editMode}
                    player={player}
                />
                <HeroSelector
                    player={player}
                    show={showSelector}
                    createButton={
                        <CreateButton renderFormHandler={this.renderNewHeroForm} />
                    }
                />
            </div>
        )
    }

    renderNewHeroForm = () => {
        this.setState({ editMode: true });
    };

    updateHeroName = (e) => {
        this.setState({
            heroName: e.target.value,
            formDisabled: e.target.value.length < 3
        });
    };

    createNewHero = () => {
        if (this.state.heroName !== '') {
            let player = this.props.player;

            const startHealth = 5;

            let newHero = new Character(this.state.heroName, startHealth, startHealth);
            // TODO: use spread operator instead Character constructor
            // let newHero = { 
            //     ...character, 
            //     name: this.state.heroName, 
            //     health: startHealth, 
            //     maxHealth: startHealth 
            // };

            if (player) {
                newHero.id = player.heroes.length + 1;
                player.heroes.push(newHero);
            } else {
                newHero.id = 1;
                player = {
                    heroes: [newHero],
                    lastVisit: new Date(),
                    activeHeroId: null
                };
            }

            this.props.updatePlayer(player);

            this.setState({ editMode: false });
        }
    };
}

const mapStateToProps = (state) => ({
    player: state.player
});

const mapDispatchToProps = dispatch => ({
    updatePlayer: (player) => dispatch(updatePlayer(player)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
