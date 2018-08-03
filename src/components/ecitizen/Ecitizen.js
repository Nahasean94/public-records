import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import NewTitleDeed from "./title-deed/NewTitleDeed"
import NewDrivingLicense from "./driving-license/NewDrivingLicense"

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        return (
            <div className="row">
            <div className="col-sm-6 offset-sm-3">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                        >
                            Driving License
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                        >
                           Title Deed
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <br/>
                    <TabPane tabId="1">
                       <NewDrivingLicense/>
                    </TabPane>
                    <TabPane tabId="2">
                        <NewTitleDeed/>
                    </TabPane>
                </TabContent>
            </div>
            </div>
        );
    }
}