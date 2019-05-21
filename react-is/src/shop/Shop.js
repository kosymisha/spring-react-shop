import React, {Component} from 'react';
import { getShop, deleteShop } from "../util/ShopRequests";
import Comments from './Comments';
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import './Shop.css';

class Shop extends Component {

    constructor (props) {
        super(props);
        console.log(props);
        this.state = {
            id: {},
            nameShop: '',
            url: '',
            photoURL: '',
            description: '',
            adverts: [],
            owner: {
                id: {},
                firstName: '',
                lastName: ''
            },
            isLoad: false
        };
        this.loadShop = this.loadShop.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.loadShop();
    }

    loadShop () {
        getShop(this.props.match.params.shop)
            .then(response => {
                console.log(response.data);
                this.setState({
                    id: response.data.id,
                    nameShop: response.data.nameShop,
                    url: response.data.url,
                    photoURL: response.data.photoURL,
                    description: response.data.description,
                    owner: response.data.owner,
                    isLoad: true
                });
            })
            .catch(errors => {
                this.setState({
                    errors: errors
                });
            });
    }

    handleDelete() {
        deleteShop(this.props.match.params.shop).then(() => {
            this.props.history.push('/shops')
        });
    }

    render () {
        return (
            <div className="row">
                <div className="col ml-8 mr-8 mt-5" id="shop">
                    {
                        this.state.isLoad ? (
                            <div>
                                <div className="row">
                                    <div className="col-3">
                                        <img width="170" src={this.state.photoURL} />
                                    </div>
                                    <div className="col-9">
                                        <h3>{this.state.nameShop}</h3>
                                        <a href={this.state.url}>{this.state.url}</a><br/>
                                        <label>Owner: </label>{this.state.owner.firstName}<br/>
                                        <label>Description: </label> {this.state.description}<br/>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col">
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            {
                                                this.props.currentUser !== null && this.props.currentUser.id === this.state.owner.id ?
                                                    (
                                                        <div>
                                                            <a className="btn btn-secondary" >Sales
                                                                of {this.state.nameShop}</a>

                                                            <Link className="btn btn-secondary"
                                                                  to={'/shops/' + this.state.id + '/update'}
                                                            >Change info</Link>

                                                            <button className="btn btn-danger"
                                                                    onClick={this.handleDelete}
                                                            >Delete {this.state.nameShop}</button>
                                                        </div>
                                                    ) : (<div/>)
                                            }
                                            {
                                                this.props.currentUser !== null && this.props.currentUser.role === 'ADMIN' ?
                                                    (
                                                        <button className="btn btn-danger"
                                                                onClick={this.handleDelete}
                                                        >Delete {this.state.nameShop}</button>

                                                    ) : (<div/>)
                                            }
                                        </div>
                                    </div>
                                </div>
                                <Comments shopId={this.props.match.params.shop}
                                          authenticated={this.props.authenticated}
                                          currentUser={this.props.currentUser}
                                />
                            </div>
                        ) : (
                            <div align="center">
                                <div className="spinner-border text-secondary mt-5" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }

}

export default Shop;