import React, { Component } from 'react';
import { getProfile, updateProfile } from "../../../util/ProfileRequests";
import { uploadFileProfile, deleteFileProfile } from "../../../util/FileRequests";
import UserInfoSettings from './UserInfoSettings';
import CardInfoSettings from './CardInfoSettings';
import PasswordSettings from './PasswordSettings';
import { Link } from 'react-router-dom';
import { NO_AVATAR_URL } from "../../../constants";
import './Settings.css';
import  Tabs from 'react-bootstrap/Tabs'
import  Tab from 'react-bootstrap/Tabs'
import Alert from "react-s-alert";

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                photoURL: '',
            }
        };
    }
    render() {
        return (
            <div className="row">
                <div className="col ml-8 mr-8 mt-5" id="settings">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={this.state.tab}
                        onSelect={tab => this.setState({ tab })}
                        profile={this.state.profile}
                    >
                        <Tab eventKey="cardInfo" title="Card info">
                            <CardInfoSettings currentProfileId={this.props.computedMatch.params.profile} />
                        </Tab>
                        <Tab eventKey="userInfo" title="User info" disabled={this.props.currentUser.provider !== 'local'}>
                            <UserInfoSettings currentProfileId={this.props.computedMatch.params.profile} />
                        </Tab>
                        <Tab eventKey="password" title="Password" disabled={this.props.currentUser.provider !== 'local'}>
                            <PasswordSettings currentProfileId={this.props.computedMatch.params.profile} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default Settings;





