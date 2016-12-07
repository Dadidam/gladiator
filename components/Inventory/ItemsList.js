import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default class ItemsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const hero = this.props.hero;
        const filteredList = this.filterHeroInventory(hero, this.props.type);

        const result = filteredList.map((item, i) => {
            const params = Object.keys(item.params);
            const tooltip = (
                <Tooltip id="tooltip">
                    {params.map((param, i) => {
                            return <div key={i}>{param}: {item.params[param]}</div>
                        }
                    )}
                </Tooltip>
            );

            return (
                <div key={i}>
                    <OverlayTrigger placement="top" overlay={tooltip}>
                        <span style={{ borderBottom: '1px dotted #333', cursor: 'pointer' }}>{item.name}</span>
                    </OverlayTrigger>
                    &nbsp;
                    {hero.equipment[this.props.type] !== item.id ?
                        <span>
                            <a href="#" onClick={this.props.useItem.bind(this, item)}>Use It!</a>
                            {' '}
                            <a href="#" style={{ color: 'red' }} onClick={this.props.deleteItem.bind(this, item)}>Delete</a>
                            {' '}
                            <a href="#" style={{ color: 'green' }} onClick={this.props.sellItem.bind(this, item)}>Sell (+{item.price.sell} coins)</a>
                        </span>
                        : <b>Equipped</b>
                    }
                </div>
            )
        });

        return <div>{result}</div>;
    }

    filterHeroInventory = (hero, type) => {
        return hero.inventory.filter((item) => {
            return item.type === type;
        });
    };
}
