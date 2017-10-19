import React from 'react';
import {Modal, Button, Tabs, Icon} from 'antd';
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
                title={`Inventory Items`}
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
                    <TabPane tab={<span><Icon type="shrink" />Weapon</span>} key="1">
                        <ItemsList type={itemTypes[0]} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="skin" />Armor</span>} key="2">
                        <ItemsList type={itemTypes[1]} />
                    </TabPane>
                    <TabPane tab={<span><Icon type="tool" />Staff</span>} disabled key="3">Other Staff</TabPane>
                </Tabs>
            </Modal>
        );
    }

    close = () => {
        this.props.toggle();
    };
}
