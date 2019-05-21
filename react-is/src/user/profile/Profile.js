import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import { getProfile, setActive, setRole, deleteProfile } from '../../util/ProfileRequests';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: '',
            firstName: '',
            lastName: '',
            email: '',
            active: false,
            photoURL: ''
        };
        this.handleRole = this.handleRole.bind(this);
        this.loadProfile = this.loadProfile.bind(this);
        this.handleActive = this.handleActive.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDeleteProfile = this.handleDeleteProfile.bind(this);
    }

    componentDidMount() {
        this.loadProfile();
    }

    /*
    componentDidUpdate(prevProps, prevState, snapshot) {
    }*/

    handleDeleteProfile () {
        deleteProfile(this.props.computedMatch.params.profile)
            .then(this.props.onLogout);
    }

    loadProfile() {
        getProfile(this.props.computedMatch.params.profile)
            .then(response => {
                console.log(response);
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    active: response.data.active,
                    role: response.data.role,
                    photoURL: response.data.photoURL
                });
            });
    }

    handleInputChange (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleRole() {
        if (this.state.role !== '' && this.state.role !== 'EMPTY') {
            setRole(this.props.computedMatch.params.profile, this.state.role)
                .then(response => {
                    this.setState({
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        active: response.data.active,
                        role: response.data.role,
                        photoURL: response.data.photoURL
                    });
                });
        }
    }

    handleActive() {
        setActive(this.props.computedMatch.params.profile)
            .then(response => {
                this.setState({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    active: response.data.active,
                    role: response.data.role,
                    photoURL: response.data.photoURL
                });
            });
    }



    render() {
        let name = '';
        if (this.state.lastName !== undefined && this.state.lastName !== null)
            name = this.state.firstName + ' ' + this.state.lastName;
        else
            name = this.state.firstName;
        return (
            <div className="row">
                <div className="col ml-8 mr-8 mt-5" id="profile">
                    <div className="row">
                        <div className="col-3">
                            <img width="250" src={this.state.photoURL} alt={this.state.firstName}/>
                        </div>
                        <div className="col-9">
                            <h3>Info</h3>
                            {
                                this.state.active ? (
                                    <div>Profile is active</div>
                                ) : (
                                    <div>Profile is not active</div>
                                )
                            }
                            <div><label>Name: </label> {name}</div>
                            <div><label>Email: </label> {this.state.email}</div>
                            <div><label>Role: </label> {this.state.role}</div>
                            {
                                this.props.currentUser.id.toString() !== this.props.computedMatch.params.profile &&
                                    this.state.role !== 'SELLER' ?
                                    (
                                        <ProfileInputRole onChange={this.handleInputChange}
                                                          onSubmitRole={this.handleRole}
                                        />
                                    ) : (
                                        <div/>
                                    )
                            }
                            <ProfileButtons onSubmitActive={this.handleActive}
                                            profileId={this.props.computedMatch.params.profile}
                                            currentUserId={this.props.currentUser.id.toString()}
                                            isActive={this.state.active}
                                            onLogout={this.props.onLogout}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;

class ProfileButtons extends Component {
    render () {
        let buttonActive = <div/>;
        let buttonLogout = <div/>;
        let buttonSettings = <div/>;
        if (this.props.currentUserId !== this.props.profileId) {
            if (this.props.isActive) {
                buttonActive = <button
                    className="btn btn-danger" onClick={this.props.onSubmitActive}
                >Set non active</button>;
            } else buttonActive = <button
                className="btn btn-warning" onClick={this.props.onSubmitActive}
            >Set active</button>;
        } else {
            buttonSettings = <Link to={this.props.profileId + '/settings'}
                    className="btn btn-secondary"
                >Settings</Link>;
            buttonLogout = <button
                    className="btn btn-primary" onClick={this.props.onLogout}
                >Log out</button>;
        }

        return(
            <div className="btn-group mt-1" role="group" aria-label="Basic example">
                { buttonActive }
                { buttonSettings }
                { buttonLogout }
            </div>
        );
    }
}

class ProfileInputRole extends Component {
    render () {
        return(
            <div className="input-group">
                <div className="input-group-prepend">
                    <label className="input-group-text"
                           htmlFor="inputGroupSelect01">Role</label>
                </div>
                <select className="custom-select" id="inputRole" name="role"
                        aria-label="Example select with button addon"
                        onChange={this.props.onChange}
                >
                    <option value="EMPTY">Choose...</option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary"
                            onClick={this.props.onSubmitRole}
                    >Save</button>
                </div>
            </div>
        );
    }
}