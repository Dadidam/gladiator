import React from 'react';
import InventoryItems from 'Items';
import { Button } from 'react-bootstrap';
import { getHeroLevel } from 'services/player';

export default class Arena extends React.Component {
    collectCoins(hero, count, updateHero) {
        hero.coins += count;

        updateHero(hero);
    }

    getItem(hero, item, updateHero) {
        let newItem = Object.assign({}, item); // clone item
        newItem.id = hero.inventory.length + 1; // set unique item ID

        hero.inventory.push(newItem); // add new item to inventory

        updateHero(hero); // update changes
    }

    getExp(hero, value, updateHero) {
        hero.exp += value;

        const heroLevel = getHeroLevel(hero);

        if (heroLevel > hero.level) {
            hero.level = heroLevel;
        }

        updateHero(hero);
    }

    render() {
        const hero = this.props.hero;
        const updateHero = this.props.updateHero;

        return (
            <div>
                <h3>Quests</h3>
                <div className="well" style={{ maxWidth: 500, margin: '0 auto 10px' }}>
                    <Button block onClick={this.collectCoins.bind(this, hero, 1, updateHero)}>Kill the rat (+1 coin)</Button>
                    <Button bsStyle="success" block onClick={this.collectCoins.bind(this, hero, 2, updateHero)}>Beat wolf (+2 coins)</Button>
                    <Button bsStyle="warning" block onClick={this.collectCoins.bind(this, hero, 3, updateHero)}>Punish the thief (+3 coins)</Button>
                    <Button bsStyle="danger" block onClick={this.collectCoins.bind(this, hero, 5, updateHero)}>Find treasure (+5 coins)</Button>
                    <Button block onClick={this.getItem.bind(this, hero, InventoryItems.rustySword, updateHero)}>Get the Rusty Sword (2-3 attack)</Button>
                    <Button block onClick={this.getItem.bind(this, hero, InventoryItems.sharpSword, updateHero)}>Get the Sharp Sword (3-5 attack)</Button>
                    <Button bsStyle="success" block onClick={this.getItem.bind(this, hero, InventoryItems.rustyArmor, updateHero)}>Get the Rusty Armor (+10 maxHealth)</Button>
                    <Button bsStyle="success" block onClick={this.getItem.bind(this, hero, InventoryItems.shinyArmor, updateHero)}>Get the Shiny Armor (+15 maxHealth)</Button>
                    <Button block onClick={this.getExp.bind(this, hero, 25, updateHero)}>Cut the grass (+25 exp)</Button>
                    <Button block onClick={this.getExp.bind(this, hero, 3, updateHero)}>Tell funny stories (+3 exp)</Button>
                </div>
            </div>
        )
    }
}
