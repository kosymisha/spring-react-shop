import React, { Component } from 'react';
import { getProfiles, getProfilesByKeyword } from "../../util/ProfileRequests";
import { Link } from 'react-router-dom';

class ProfileList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            isLoad: false
        };
        this.loadProfiles = this.loadProfiles.bind(this);
        this.handleInputSearch = this.handleInputSearch.bind(this);
    }

    handleInputSearch (event) {
        this.setState({
            isLoad: false
        });
        getProfilesByKeyword(event.target.value)
            .then(response => {
                this.setState({
                    profiles: response.data,
                    isLoad: true
                });
            });
    }

    loadProfiles() {
        getProfiles()
            .then(response => {
                this.setState({
                    profiles: response.data,
                    isLoad: true
                });
            }).catch(error => {
            this.setState({
                profiles: []
            });
        });
    }

    componentDidMount() {
        this.loadProfiles();
    }

    render() {
        const data = this.state.profiles;
        const listData = data.map((d) =>
            <ProfileOfList
                profileId={d.id}
                key={d.id}
                firstName={d.firstName}
                lastName={d.lastName}
                photoURL = {d.photoURL}
            />);
        return (
            <div className="container mb-2">
                <div className="input-group input-group-sm mb-3  mt-3">
                    <div className="input-group-prepend " id="button-addon3">
                        <button className="btn btn-outline-secondary" type="button" disabled={true}>Search</button>
                    </div>
                    <input type="text" className="form-control" placeholder=""
                           aria-label="Example text with two button addons"
                           onChange={this.handleInputSearch}
                           aria-describedby="button-addon3" />
                </div>
                {
                    this.state.isLoad ? (
                        listData
                    ) : (
                        <div align="center">
                            <div className="spinner-border text-secondary mt-2" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default ProfileList;

class ProfileOfList extends Component {
    render() {
        return (
            <Link to={"/profiles/" + this.props.profileId}>
                <div className="row mt-2">
                    <div className="col-1">
                        <div className="shop-avatar">
                            {
                                this.props.photoURL ? (
                                    <img src={this.props.photoURL} className="mr-3" alt="..."/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.firstName[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="col" >
                        <p>{this.props.firstName} {this.props.lastName}</p>
                    </div>
                </div>
            </Link>
        )
    }
}