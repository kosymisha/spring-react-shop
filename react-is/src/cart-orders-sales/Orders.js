import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPaidOrders, deleteOrder } from '../util/OrdersRequests';
import './Cart.css';
import {getPaidOrdersByKeyword} from "../util/OrdersRequests";

class Orders extends Component {

    constructor (props) {
        super (props);
        this.state = {
            orders: [],
            isLoad: false
        };
        this.loadOrders = this.loadOrders.bind(this);
        this.handleInputSearch = this.handleInputSearch.bind(this);
    }

    handleInputSearch(event) {
        this.setState({
            isLoad: false
        });
        getPaidOrdersByKeyword(event.target.value)
            .then(response => {
                this.setState({
                    orders: response.data,
                    isLoad: true
                });
            });
    }

    loadOrders() {
        if (this.props.currentUser !== null) {
            getPaidOrders()
                .then(response => {
                    console.log(response);
                    this.setState({
                        orders: response.data,
                        isLoad: true
                    });
                });
        }
    }

    componentDidMount() {
        this.loadOrders();
    }

    render() {
        let orders = this.state.orders;
        let orderList = orders.map((order) =>
            <tr key={order.id} className="rows">
                <td scope="row">{order.id}</td>
                <td scope="row">{order.date.substr(0, 10)}</td>
                <td><img height="100" src={order.advert.photoURL} /></td>
                <td>{order.advert.title}</td>
                <td>
                    {order.advert.intPartPrice}.{order.advert.fractPartPrice}<sup>{order.advert.currency}</sup>
                </td>
            </tr>
        );
        return (
            <div>
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
                        <div id="table-wrapper">
                            <div id="table-scroll">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">ID order</th>
                                        <th scope="col" width="10%">Date</th>
                                        <th scope="col">Photo</th>
                                        <th scope="col" width="50%">Title</th>
                                        <th scope="col">Price</th>
                                        <th/>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { orderList }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    ) : (
                        <div align="center">
                            <div className="spinner-border text-secondary mt-4" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Orders;