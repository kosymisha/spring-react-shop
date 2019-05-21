import React, { Component } from "react";
import { getShops } from '../util/ShopRequests';

class Search extends Component {

    constructor (props) {
        super (props);
        this.state = {
            shops: []
        };
        this.loadShops = this.loadShops.bind(this);
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
        this.loadShops();
    }

    render() {
        let shops = this.state.shops;
        let listShops = shops.map((shop) =>
            <option
                key={shop.id}
                value={shop.id}
            >
                {shop.nameShop}
            </option>
        );
        return (
            <div className='row'>
                <div className='col'>
                    <div className="input-group input-group-sm mb-3">
                        <input type="text"
                               className="form-control"
                               placeholder="Search item"
                               name='search'
                               value={this.props.valueKeywords}
                               onChange={this.props.onChangeInputSearch}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary"
                                    onClick={this.props.onClickSearch}
                            >Search</button>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="btn btn-outline-secondary">Min $</span>
                        </div>
                        <input type="text" className="form-control"
                               aria-label="Amount (to the nearest dollar)"
                               name='minPrice'
                               placeholder="0.00"
                               value={this.props.valueMinPrice}
                               onChange={this.props.onChangeInputMinPrice}
                        />
                    </div>
                </div>
                <div className="col-2">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="btn btn-outline-secondary">Max $</span>
                        </div>
                        <input type="text" className="form-control"
                               aria-label="Amount (to the nearest dollar)"
                               name='maxPrice'
                               placeholder="0.00"
                               value={this.props.valueMaxPrice}
                               onChange={this.props.onChangeInputMaxPrice}
                        />
                    </div>
                </div>
                <div className="col-2">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <label className="btn btn-outline-secondary" htmlFor="inputGroupSelect01">Sort</label>
                        </div>
                        <select className="custom-select"
                                onChange={this.props.onSelectSortType}
                        >
                            <option value="0" defaultValue>None</option>
                            <option value="1">Price low to high</option>
                            <option value="2">Price high to low</option>
                            <option value="3">Most viewed</option>
                            <option value="4">Most commented</option>
                        </select>
                    </div>
                </div>
                <div className="col-2">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <label className="btn btn-outline-secondary" htmlFor="inputGroupSelect01">Shop</label>
                        </div>
                        <select className="custom-select"
                                onChange={this.props.onSelectShop}
                        ><option value="0" defaultValue>All</option>
                            { listShops }
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;