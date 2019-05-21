import React, { Component } from 'react';
import Shop from './Shop';
import { getShopList, getShopsByKeyword } from "../util/ShopRequests";
import { Link } from 'react-router-dom';
import ShopOfList from "./ShopOfList";

class ShopList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shops: [],
            isLoad: false
        };
        this.handleInputSearch = this.handleInputSearch.bind(this);
        this.loadContactsByCurrentUser = this.loadContactsByCurrentUser.bind(this);
    }

    handleInputSearch (event) {
        this.setState({
            isLoad: false
        });
        getShopsByKeyword(event.target.value)
            .then(response => {
                this.setState({
                    shops: response.data,
                    isLoad: true
                });
            });
    }

    loadContactsByCurrentUser() {
        getShopList()
            .then(response => {
                this.setState({
                    shops: response,
                    isLoad: true
                });
            }).catch(error => {
            this.setState({
                shops: []
            });
        });
    }

    componentDidMount() {
        this.loadContactsByCurrentUser();
    }

    render() {
        const data = this.state.shops;
        const listData = data.map((d) =>
            <ShopOfList
                shopId={d.id}
                key={d.id}
                nameShop={d.nameShop}
                url={d.url}
                photoURL = {d.photoURL}
                computedMatch= {this.props.match}
            />);
        return (
            <div className="container mb-2">
                <div className="input-group input-group-sm mb-3  mt-3">
                    <div className="input-group-prepend " id="button-addon3">
                        {
                            this.props.authenticated && this.props.currentUser.role === 'SELLER' ? (
                                <Link to={"/shops/create"} className={"btn btn-secondary"}>Create new shop</Link>
                            ) : (<div/>)
                        }
                        <button className="btn btn-outline-secondary" type="button" disabled={true}>Search</button>
                    </div>
                    <input type="text" className="form-control" placeholder=""
                           aria-label="Example text with two button addons"
                           onChange={this.handleInputSearch}
                           aria-describedby="button-addon3" />
                </div>
                {
                    this.state.isLoad ? (
                        listData.length === 0 ? <div>Nothing found</div> : listData
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

export default ShopList;