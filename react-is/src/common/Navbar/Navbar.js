import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import callLogo from '../../img/call_logo.png';
import './Navbar.css'

class Navbar extends Component {
    render () {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-secondary">
                <div className="container">
                    <Link to="/" className="navbar-brand" href="#">
                        IS
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="mobile-nav">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/shops" className="nav-link">Shops</Link>
                            </li>
                        </ul>
                        { this.props.authenticated && this.props.currentUser.role === 'ADMIN' ? (
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to="/profiles" className="nav-link">Profiles</Link>
                                    </li>
                                </ul>
                            ): (
                                <div/>
                            )
                        }
                        { this.props.authenticated && this.props.currentUser.role === 'SELLER' ? (
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to="/sales" className="nav-link">Sales</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/adverts/create" className="nav-link">Create advert</Link>
                                    </li>
                                </ul>
                            ): (
                                <div/>
                            )
                        }
                        { this.props.authenticated && this.props.currentUser.role === 'USER' ? (
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to="/cart" className="nav-link">Cart</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/orders" className="nav-link">Orders</Link>
                                </li>
                            </ul>
                        ): (
                            <div/>
                        )
                        }
                    </div>
                    <div className="navbar-options">
                        { this.props.authenticated ? (
                            <Link to={"/profiles/" + this.props.currentUser.id} className="btn btn-secondary">Profile</Link>
                        ): (
                            <Link to="/login" className="btn btn-secondary">Login / Sign Up</Link>
                        )}
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar;