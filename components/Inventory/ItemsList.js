import React from 'react';
import {Tooltip, Button, Card, Row, Col, Icon} from 'antd';

export default class ItemsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const hero = this.props.hero;
        const filteredList = this.filterHeroInventory(hero, this.props.type);

        if (!filteredList.length) {
            return null;
        }

        const result = filteredList.map((item, i) => {
            const params = Object.keys(item.params);
            const tooltipContent = (
                <div>
                    {params.map((param, i) => {
                            return <div key={i}>{param}: {item.params[param]}</div>
                        }
                    )}
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
                        {hero.equipment[this.props.type] !== item.id ?
                            <Button.Group>
                                <Button type="dashed" onClick={this.props.useItem.bind(this, item)}>
                                    <Icon type="skin" /> Use It!
                                </Button>
                                <Button type="dashed" onClick={this.props.sellItem.bind(this, item)}>
                                    <Icon type="wallet" /> Sell: +{item.price.sell} coin(s)
                                </Button>
                                <Button type="dashed" onClick={this.props.deleteItem.bind(this, item)}>
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
