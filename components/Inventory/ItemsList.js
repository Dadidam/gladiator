import React from 'react';
import {Tooltip, Button, Card, Row, Col, Icon} from 'antd';

export default class ItemsList extends React.Component {
    constructor(props) {
        super(props);

        this.hero = props.hero;
        this.playerStore = props.playerStore;
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
                                <Button type="dashed" onClick={() => this.playerStore.useItem(item, this.hero)}>
                                    <Icon type="skin" /> Use It!
                                </Button>
                                <Button type="dashed" onClick={() => this.playerStore.sellItem(item, this.hero)}>
                                    <Icon type="wallet" /> Sell: +{item.price.sell} coin(s)
                                </Button>
                                <Button type="dashed" onClick={() => this.playerStore.deleteItem(item, this.hero)}>
                                    <Icon type="delete" /> Remove
                                </Button>
                            </Button.Group>
                            : <b>The item equipped by your hero!</b>
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
