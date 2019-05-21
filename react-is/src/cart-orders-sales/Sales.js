import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPaidOrders, deleteOrder } from '../util/OrdersRequests';
import './Cart.css';
import {getPaidOrdersByKeyword} from "../util/OrdersRequests";
import {getShops} from "../util/ShopRequests";
import {getSales} from "../util/OrdersRequests";

class Sales extends Component {

    constructor (props) {
        super (props);
        this.state = {
            sales: [],
            shops: [],
            shopId: '0',
            isLoad: false
        };
        this.loadShops = this.loadShops.bind(this);
        this.loadSales = this.loadSales.bind(this);
        this.handleInputSearch = this.handleInputSearch.bind(this);
    }

    handleInputSearch(event) {
        this.setState({
            isLoad: false
        });
        console.log(event.target.value);
        getSales(this.state.shopId, event.target.value)
            .then(response => {
                this.setState({
                    sales: response.data,
                    isLoad: true
                });
            });
    }

    loadSales() {
        if (this.props.currentUser !== null) {
            getSales(this.state.shopId, '')
                .then(response => {
                    this.setState({
                        sales: response.data,
                        isLoad: true
                    });
                });
        }
    }

    loadShops () {
        getShops()
            .then(response => {
                console.log(response.data);
                this.setState({
                    shops: response.data
                });
            });
    }

    componentDidMount() {
        this.loadSales();
        this.loadShops();
    }

    render() {
        let sales = this.state.sales;
        let salesList = sales.map((sale) =>
            <tr key={sale.id} className="rows">
                <td scope="row"><Link to={'/shops/' + sale.advert.shop.id}>{sale.advert.shop.nameShop}</Link></td>
                <td><img height="100" src={sale.advert.photoURL}/></td>
                <td><Link to={'/adverts/' + sale.advert.id}>{sale.advert.title}</Link></td>
                <td>
                    {sale.advert.intPartPrice}.{sale.advert.fractPartPrice}<sup>{sale.advert.currency}</sup>
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
                                        <th scope="col">Shop</th>
                                        <th scope="col">Photo</th>
                                        <th scope="col" width="300">Title</th>
                                        <th scope="col">Price</th>
                                        <th/>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { salesList }
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

export default Sales;