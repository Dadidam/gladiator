import React from 'react';
// import Arena from 'Arena';
import Hero from 'Hero/Main';

import { getHeroById } from 'services/player';

export default class MainPanel extends React.Component {
  constructor(props) {
    super(props);

    this.updateHeroHandler = this.props.updateHero;
    this.changeHeroHandler = this.props.changeHero;
  }

  render() {
    return this.props.player && this.props.player.activeHeroId
      ? this._renderMainPanel()
      : null;
  }

  _renderMainPanel = () => {
    const hero = getHeroById(
      this.props.player.heroes,
      this.props.player.activeHeroId
    );

    return (
      <Hero
        params={hero}
        changeHero={this.changeHeroHandler}
        updateHero={this.updateHeroHandler}
      />
    );
    // return (
    //     <div>
    //         <Col md={3}>
    //             <Hero params={hero} changeHero={this.changeHeroHandler} updateHero={this.updateHeroHandler} />
    //         </Col>
    //         <Col md={6}>
    //             <Arena hero={hero} updateHero={this.updateHeroHandler} />
    //         </Col>
    //     </div>
    // )
  };
}
