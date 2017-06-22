import React from 'react';
import {Modal, Button} from 'antd';
import ItemsList from './Inventory/ItemsList';

const itemTypes = ['weapon', 'armor'];

export default class Inventory extends React.Component {
    constructor(props) {
        super(props);
    }

    renderEmptyListMessage() {
        return <div>You haven't any items. You can buy it at shop or get as a quest award.</div>;
    }

    renderItemList(items) {
        return items.map((type, i) => {
            return (
                <div key={type}>
                    <ItemsList
                        type={type}
                        hero={this.props.hero}
                        playerStore={this.props.playerStore}
                    />
                    {itemTypes.length !== i + 1 ?
                        <div className="divider"></div> : null
                    }
                </div>
            )
        })
    }

    render() {
        if (!this.props.hero) {
            return null;
        }

        const itemCount = this.props.hero.inventory.length;
        const itemsList = itemCount ? this.renderItemList(itemTypes) : this.renderEmptyListMessage();

        return (
            <Modal
                title={`Inventory Items (${itemCount} pcs.)`}
                wrapClassName="vertical-center-modal"
                visible={this.props.show}
                width={800}
                footer={[
                    <Button key="submit" type="primary" onClick={this.close}>
                        Close
                    </Button>,
                ]}
            >
                {itemsList}
            </Modal>
        );
    }

    close = () => {
        this.props.toggle();
    };
}
