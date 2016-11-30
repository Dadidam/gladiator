import React from 'react';
import { Button } from 'react-bootstrap';
import { getHeroLevel } from 'services/player';

class Arena extends React.Component {
    collectCoins(hero, count, updateHero) {
        hero.coins += count;

        updateHero(hero);
    }

    getItem(hero, item, updateHero) {
        item.id = hero.inventory.length + 1; // set unique item ID

        hero.inventory.push(item); // add new item to inventory

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

        const rustySword = {
            name: 'Rusty sword',
            type: 'weapon',
            params: {
                minDamage: 2,
                maxDamage: 3
            }
        };

        const sharpSword = {
            name: 'Sharp sword',
            type: 'weapon',
            params: {
                minDamage: 3,
                maxDamage: 5
            }
        };

        const rustyArmor = {
            name: 'Rusty armor',
            type: 'armor',
            params: {
                maxHealth: 10
            }
        };

        const shinyArmor = {
            name: 'Shiny armor',
            type: 'armor',
            params: {
                maxHealth: 15
            }
        };

        return (
            <div>
                <h3>Quests</h3>
                <div className="well" style={{ maxWidth: 500, margin: '0 auto 10px' }}>
                    <Button block onClick={this.collectCoins.bind(this, hero, 1, updateHero)}>Kill the rat (+1 coin)</Button>
                    <Button bsStyle="success" block onClick={this.collectCoins.bind(this, hero, 2, updateHero)}>Beat wolf (+2 coins)</Button>
                    <Button bsStyle="warning" block onClick={this.collectCoins.bind(this, hero, 3, updateHero)}>Punish the thief (+3 coins)</Button>
                    <Button bsStyle="danger" block onClick={this.collectCoins.bind(this, hero, 5, updateHero)}>Find treasure (+5 coins)</Button>
                    <Button block onClick={this.getItem.bind(this, hero, rustySword, updateHero)}>Get the Rusty Sword (2-3 attack)</Button>
                    <Button block onClick={this.getItem.bind(this, hero, sharpSword, updateHero)}>Get the Sharp Sword (3-5 attack)</Button>
                    <Button bsStyle="success" block onClick={this.getItem.bind(this, hero, rustyArmor, updateHero)}>Get the Rusty Armor (+10 maxHealth)</Button>
                    <Button bsStyle="success" block onClick={this.getItem.bind(this, hero, shinyArmor, updateHero)}>Get the Shiny Armor (+15 maxHealth)</Button>
                    <Button block onClick={this.getExp.bind(this, hero, 25, updateHero)}>Cut the grass (+25 exp)</Button>
                    <Button block onClick={this.getExp.bind(this, hero, 3, updateHero)}>Tell funny stories (+3 exp)</Button>
                </div>
            </div>
        )
    }
}

export default Arena
