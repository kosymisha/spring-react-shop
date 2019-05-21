import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ShopOfList.css';

class ShopOfList extends Component {
    render() {
        return (
            <Link to={"/shops/" + this.props.shopId}>
                <div className="row mt-2">
                    <div className="col-1">
                        <div className="shop-avatar">
                            {
                                this.props.photoURL ? (
                                    <img src={this.props.photoURL} className="mr-3" alt="..."/>
                                ) : (
                                    <div className="text-avatar">
                                        <span>{this.props.nameShop[0]}</span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="col" >
                        <p>{this.props.nameShop}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

export default ShopOfList;