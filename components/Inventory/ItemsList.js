import React from 'react';
import { connect } from 'react-redux';
import { useItem, addCoins, deleteItem, takeOffItem } from '../../actions';
import {Tooltip, Button, Card, Row, Col, Icon} from 'antd';

import './inventory.less';

class ItemsList extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
    }

    render() {
        const filteredList = this.filterHeroInventory(this.hero, this.props.type);

        if (!filteredList.length) {
            return null;
        }

        const result = filteredList.map((item, i) => {
            const params = Object.keys(item.params);
            const tooltipContent = (
                <div>
                    {params.map((param, i) => <div key={i}>{param}: {item.params[param]}</div>)}
                </div>
            );
            
            return (
                <Card.Grid style={{ width: '25%', textAlign: 'center' }} key={i}>
                    <Tooltip placement="top" title={tooltipContent}>
                        <h3>{item.name}</h3>
                    </Tooltip>
                    <Tooltip placement="right" title={tooltipContent}>
                        <img src={`img/${this.props.type}/${item.icon}.jpg`} />
                    </Tooltip>
                    {this.hero.equipment[this.props.type] !== item.id ?
                        <Button.Group>
                            <Button type="dashed" onClick={() => this.props.useItem(item, this.hero)}>
                                <Icon type="skin" /> Equip
                            </Button>
                            <Button type="dashed" onClick={() => this.props.sellItem(item, this.hero)}>
                                <Icon type="wallet" /> Sell: +{item.price.sell} coin(s)
                            </Button>
                            <Button type="dashed" onClick={() => this.props.deleteItem(item, this.hero)}>
                                <Icon type="delete" /> Delete
                            </Button>
                        </Button.Group>
                        : 
                        <Button type="dashed" onClick={() => this.props.takeOffItem(item, this.hero)}>
                            <Icon type="skin" /> Take off
                        </Button>
                    }
                </Card.Grid>
            );
        });

        {/*return <Card title={this.props.type}>{result}</Card>;*/}
        return <div>{result}</div>;
    }

    filterHeroInventory = (hero, type) => {
        return hero.inventory.filter((item) => {
            return item.type === type;
        });
    };
}

const mapStateToProps = (state) => ({
    hero: state.hero
});

const mapDispatchToProps = dispatch => ({
    useItem: (item, hero) => dispatch(useItem(item, hero)),
    sellItem: (item, hero) => {
        dispatch(deleteItem(item, hero));
        dispatch(addCoins(item.price.sell, hero));
    },
    deleteItem: (item, hero) => dispatch(deleteItem(item, hero)),
    takeOffItem: (item, hero) => dispatch(takeOffItem(item, hero)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
