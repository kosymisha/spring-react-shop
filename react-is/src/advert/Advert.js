import React, { Component } from 'react';
import { getAdvert, addToCart, setAvailable, deleteAdvert } from '../util/AdvertRequests';
import { Link } from 'react-router-dom';
import './Advert.css';
import Comments from './Comments';


class Advert extends Component {

    constructor (props) {
        super (props);
        this.state = {
            advertId: {},
            title: '',
            photoURL: '',
            available: false,
            productURL: '',
            currency: '',
            views: {},
            intPartPrice: {},
            fractPartPrice: {},
            description: '',
            shop: {
                id: {},
                nameShop: '',
                url: '',
                owner: {
                    id: 0,
                    email: ''
                }
            },
            isLoad: false
        };
        this.loadAdvert = this.loadAdvert.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleSetAvailable = this.handleSetAvailable.bind(this);
        this.handleDeleteAdvert = this.handleDeleteAdvert.bind(this);
    }

    handleSetAvailable () {
        setAvailable(this.props.match.params.advert)
            .then(() => {
                this.setState({
                    available: !this.state.available
                });
            });
    }

    handleDeleteAdvert () {
        deleteAdvert(this.props.match.params.advert)
            .then(() => {
                this.props.history.push('/');
            });
    }

    handleAddToCart () {
        addToCart(this.props.match.params.advert)
            .then(() => {
                this.setState({
                    available: false
                });
            });
    }

    loadAdvert () {
        getAdvert(this.props.match.params.advert)
            .then(response => {
                console.log(response);
                this.setState({
                    advertId: response.data.id,
                    title: response.data.title,
                    available: response.data.available,
                    photoURL: response.data.photoURL,
                    productURL: response.data.productURL,
                    currency: response.data.currency,
                    views: response.data.views,
                    intPartPrice: response.data.intPartPrice,
                    fractPartPrice: response.data.fractPartPrice,
                    description: response.data.description,
                    shop: {
                        id: response.data.shop.id,
                        nameShop: response.data.shop.nameShop,
                        url: response.data.shop.url,
                        owner: {
                            id: response.data.shop.owner.id,
                            email: response.data.shop.owner.email
                        }
                    },
                    isLoad: true
                });
            });
    }

    componentDidMount() {
        this.loadAdvert();
    }

    render() {

        return (
            <div className="row">
                <div className="col ml-8 mr-8 mt-5" id="advert">
                    {
                        this.state.isLoad ? (
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <img width="250" src={this.state.photoURL} /> <br/>
                                    </div>
                                    <div className="col">
                                        <h3>{this.state.title}</h3>
                                        <label><a href={this.state.productURL}>go to {this.state.shop.nameShop}</a></label><br/>
                                        <label>Price:</label><b> {this.state.intPartPrice.toString()}.{this.state.fractPartPrice.toString()}</b>
                                        <sup>{this.state.currency}</sup><br/>
                                        <label>Views: </label> <b>{this.state.views.toString()}</b><br/>
                                        <label>Description:</label> {this.state.description}<br/>
                                        <label>Shop: </label><b><Link to={'/shops/' + this.state.shop.id}> {this.state.shop.nameShop}</Link></b>
                                        <br/>

                                            {
                                                this.props.currentUser !== null && this.state.shop.owner.id === this.props.currentUser.id ? (
                                                    <div>
                                                        <a className="btn btn-danger mr-2"
                                                           onClick={this.handleDeleteAdvert}
                                                        >DELETE</a>
                                                        {
                                                            this.state.available ? (
                                                                <a className="btn btn-warning mr-2"
                                                                   onClick={this.handleSetAvailable}
                                                                >SET NON AVAILABLE</a>
                                                            ) : (<a className="btn btn-warning mr-2"
                                                                    onClick={this.handleSetAvailable}
                                                            >SET AVAILABLE</a>)
                                                        }
                                                    </div>
                                                ) : (<div/>)
                                            }
                                            {
                                                this.props.currentUser !== null && this.props.currentUser.role === 'USER' ? (
                                                    <div>
                                                        {
                                                            this.state.available ? (<a className="btn btn-warning mr-2"
                                                                                       onClick={this.handleAddToCart}
                                                                >ADD TO CART</a>
                                                            ) : (<a className="btn btn-warning mr-2">NOT AVAILABLE</a>)
                                                        }
                                                    </div>
                                                ) : (<div/>)
                                            }
                                            {
                                                this.props.currentUser !== null && this.props.currentUser.role === 'ADMIN' ? (
                                                    <a className="btn btn-danger mr-2"
                                                       onClick={this.handleDeleteAdvert}
                                                    >DELETE</a>
                                                ) : (<div/>)
                                            }
                                        <br/>
                                    </div>
                                </div>
                                <Comments advertId={this.props.match.params.advert}
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

export default Advert;