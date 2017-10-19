import React from 'react';
import {Modal, Button, Tabs} from 'antd';
import ItemsList from 'Inventory/ItemsList';

const TabPane = Tabs.TabPane;

const itemTypes = ['weapon', 'armor'];

export default class Inventory extends React.Component {
    constructor(props) {
        super(props);

        this.renderEmptyListMessage = () => {
            return <div>You haven't any items. You can buy it at shop or get as a quest award.</div>;
        }
    }

    renderItemList(items) {
        return items.map((type, i) => {
            return (
                <div key={type}>
                    <ItemsList type={type} />
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
                onCancel={this.close}
                footer={
                    <Button key="submit" type="primary" onClick={this.close}>
                        Close
                    </Button>
                }
            >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Weapon" key="1">
                        <ItemsList type={itemTypes[0]} />
                    </TabPane>
                    <TabPane tab="Armor" key="2">
                        <ItemsList type={itemTypes[1]} />
                    </TabPane>
                    <TabPane tab="Staff" disabled key="3">Other Staff</TabPane>
                </Tabs>
            </Modal>
        );
    }

    close = () => {
        this.props.toggle();
    };
}
