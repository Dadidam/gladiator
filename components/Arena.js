import React from 'react';
import InventoryItems from 'Items';
import { Button } from 'react-bootstrap';
import { getHeroLevel } from 'services/player';

export default class Arena extends React.Component {
    constructor(props) {
        super(props);
        this.hero = this.props.hero;
        this.updateHero = this.props.updateHero;
    }

    render() {
        return (
            <div>
                <h3>Quests</h3>
                <div className="well" style={{ maxWidth: 500, margin: '0 auto 10px' }}>
                    <Button block onClick={this.collectCoins.bind(this, 1)}>Kill the rat (+1 coin)</Button>
                    <Button bsStyle="success" block onClick={this.collectCoins.bind(this, 2)}>Beat wolf (+2 coins)</Button>
                    <Button bsStyle="warning" block onClick={this.collectCoins.bind(this, 3)}>Punish the thief (+3 coins)</Button>
                    <Button bsStyle="danger" block onClick={this.collectCoins.bind(this, 5)}>Find treasure (+5 coins)</Button>
                    <Button block onClick={this.getItem.bind(this, InventoryItems.rustySword)}>Get the Rusty Sword (2-3 attack)</Button>
                    <Button block onClick={this.getItem.bind(this, InventoryItems.sharpSword)}>Get the Sharp Sword (3-5 attack)</Button>
                    <Button bsStyle="success" block onClick={this.getItem.bind(this, InventoryItems.rustyArmor)}>Get the Rusty Armor (+10 maxHealth)</Button>
                    <Button bsStyle="success" block onClick={this.getItem.bind(this, InventoryItems.shinyArmor)}>Get the Shiny Armor (+15 maxHealth)</Button>
                    <Button block onClick={this.getExp.bind(this, 25)}>Cut the grass (+25 exp)</Button>
                    <Button block onClick={this.getExp.bind(this, 3)}>Tell funny stories (+3 exp)</Button>
                </div>
            </div>
        )
    }

    collectCoins = (count) => {
        this.hero.coins += count;

        this.updateHero(this.hero);
    };

    getItem = (item) => {
        let newItem = Object.assign({}, item); // clone item
        newItem.id = this.hero.inventory.length + 1; // set unique item ID

        this.hero.inventory.push(newItem); // add new item to inventory

        this.updateHero(this.hero); // update changes
    };

    getExp = (value) => {
        this.hero.exp += value;

        const heroLevel = getHeroLevel(this.hero);

        if (heroLevel > this.hero.level) {
            this.hero.level = heroLevel;
        }

        this.updateHero(this.hero);
    };
}
