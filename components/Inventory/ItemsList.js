import React from 'react';
import { connect } from 'react-redux';
import { useItem, sellItem, deleteItem } from '../../actions';
import {Tooltip, Button, Card, Row, Col, Icon} from 'antd';

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
                <Row key={i}>
                    <Col span={12}>
                        <Tooltip placement="top" title={tooltipContent}>
                            <span className="inventoryItem">{item.name}</span>
                        </Tooltip>
                    </Col>
                    <Col span={12}>
                        {this.hero.equipment[this.props.type] !== item.id ?
                            <Button.Group>
                                <Button type="dashed" onClick={() => this.props.useItem(item, this.hero)}>
                                    <Icon type="skin" /> Use It!
                                </Button>
                                <Button type="dashed" onClick={() => this.props.sellItem(item, this.hero)}>
                                    <Icon type="wallet" /> Sell: +{item.price.sell} coin(s)
                                </Button>
                                <Button type="dashed" onClick={() => this.props.deleteItem(item, this.hero)}>
                                    <Icon type="delete" /> Remove
                                </Button>
                            </Button.Group>
                            : <b>The item's equipped by your hero!</b>
                        }
                    </Col>
                </Row>
            )
        });

        return <Card title={this.props.type}>{result}</Card>;
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
    sellItem: (item, hero) => dispatch(sellItem(item, hero)),
    deleteItem: (item, hero) => dispatch(deleteItem(item, hero)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
