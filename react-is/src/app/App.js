import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../common/Navbar/Navbar';
import LoadingIndicator from '../common/LoadingIndicator/LoadingIndicator';
import NotFound from '../common/NotFound/NotFound';
import PrivateRoute from '../common/PrivateRoute/PrivateRoute';
import { ACCESS_TOKEN } from '../constants';
import Main from '../main/Main';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import Settings from '../user/profile/settings/Settings';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import { getCurrentUser } from '../util/APIUtils';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import ShopList from "../shop/ShopList";
import Shop from "../shop/Shop"
import NewContactForm from "../components/Contact/NewContactForm";
import UpdateContactForm from "../components/Contact/UpdateContactForm";
import ShopCreateForm from "../shop/ShopCreateForm";
import ShopUpdateForm from "../shop/ShopUpdateForm";
import ProfileList from "../user/profile/ProfileList";
import AdvertCreateForm from "../advert/AdvertCreateForm";
import Advert from "../advert/Advert";
import Cart from "../cart-orders-sales/Cart";
import Orders from "../cart-orders-sales/Orders";
import Sales from '../cart-orders-sales/Sales';

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            authenticated: false,
            currentUser: null,
            loading: false,
            isAdmin: false,
            isSeller: false,
            isUser: false
        };
        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
            loading: true
        });

        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    authenticated: true,
                    loading: false,
                    isAdmin: response.admin,
                    isSeller: response.seller,
                    isUser: response.user
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }

    handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            authenticated: false,
            currentUser: null
        });
        Alert.success("You're safely logged out!");
    }

    componentDidMount() {
        this.loadCurrentlyLoggedInUser();
    }

    render () {
        if(this.state.loading) {
            return <LoadingIndicator />
        }

        return (

                    <div className="app">
                        <div className="app-top-box">
                            <Navbar authenticated={this.state.authenticated}
                                    isAdmin={this.state.isAdmin}
                                    onLogout={this.handleLogout}
                                    currentUser={this.state.currentUser}
                            />
                        </div>
                        <div className="container-fluid">
                                <div className="app-body">
                                    <Switch>
                                        <Route exact path="/" component={Main}/>
                                        <Route path="/login" render={(props) => <Login authenticated={this.state.authenticated} {...props} />}/>
                                        <Route exact path="/signup" render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}/>
                                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
                                        <PrivateRoute exact path="/sales" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                                      component={Sales}/>
                                        <PrivateRoute exact path="/adverts/create" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                                      component={AdvertCreateForm}/>
                                        <Route exact path="/adverts/:advert" render={(props) => <Advert authenticated={this.state.authenticated}
                                                                                            currentUser={this.state.currentUser}
                                                                                            {...props} />}/>
                                        <Route exact path="/shops" render={(props) => <ShopList authenticated={this.state.authenticated}
                                                                                            currentUser={this.state.currentUser}
                                                                                            {...props} />}/>
                                        <PrivateRoute exact path="/shops/create" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                                      component={ShopCreateForm}/>
                                        <Route exact path="/shops/:shop" render={(props) => <Shop authenticated={this.state.authenticated}
                                                                                                  currentUser={this.state.currentUser}
                                                                                                  {...props} />}/>
                                        <Route exact path="/cart" render={(props) => <Cart authenticated={this.state.authenticated}
                                                                                                        currentUser={this.state.currentUser}
                                                                                                        {...props} />}/>
                                        <Route exact path="/orders" render={(props) => <Orders authenticated={this.state.authenticated}
                                                                                                        currentUser={this.state.currentUser}
                                                                                                        {...props} />}/>
                                        <PrivateRoute exact path="/profiles" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                                      component={ProfileList} onLogout={this.handleLogout}/>
                                        <PrivateRoute exact path="/profiles/:profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                            component={Profile} onLogout={this.handleLogout}/>
                                        <PrivateRoute exact path="/profiles/:profile/settings" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                            component={Settings} onLogout={this.handleLogout}/>

                                        <PrivateRoute exact path="/shops/:shop/update" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                                      component={ShopUpdateForm}/>
                                        <PrivateRoute exact path="/adverts/create" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                            component={NewContactForm}/>
                                        <PrivateRoute exact path="/adverts" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                            component={ShopList}/>
                                        <PrivateRoute exact path="/adverts/:advert" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
                                            component={UpdateContactForm}/>

                                        <Route component={NotFound}/>
                                    </Switch>
                                </div>

                        </div>
                        <Alert stack={{limit: 3}}
                               timeout = {3000}
                               position='top-right' effect='slide' offset={65} />
                    </div>

        );
    }
}

export default App;
