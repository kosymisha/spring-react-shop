import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getNonPaidOrders, deleteOrder, confirmOrder } from '../util/OrdersRequests';
import './Cart.css';
import {getDefaultBankCard, getNonDefaultBankCards} from "../util/BankCardRequests";

class Cart extends Component {

    constructor (props) {
        super (props);
        this.state = {
            orders: [],
            defaultBankCard: {
                id: 0
            },
            selectedBankCard: {
                id: 0,
                firstNameCard: 'undefined',
                lastNameCard: 'undefined',
                numberCard: '0000000000000000'
            },
            selectedBankCards: [],
            bankCards: [],
            isLoad: false
        };
        this.loadOrders = this.loadOrders.bind(this);
        this.handleDeleteOrder = this.handleDeleteOrder.bind(this);
        this.handleConfirmOrder = this.handleConfirmOrder.bind(this);
        this.handleChangeBankCard = this.handleChangeBankCard.bind(this);
    }

    handleChangeBankCard(event, w) {/*
        for (let i = 0; i < this.state.selectedBankCards.length; i++) {
            if (this.state.selectedBankCards[i].orderId === event.target.value) {

            }
        }*/
        console.log(event.target.value);
        console.log(event.target);
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleDeleteOrder (event) {
        console.log(event);
        deleteOrder(event.target.value).then(this.loadOrders);
    }

    handleConfirmOrder (event) {
        //confirmOrder(event.target.value, { id: this.state.})
    }

    async loadOrders() {
        if (this.props.currentUser !== null) {
            await getDefaultBankCard(this.props.currentUser.id.toString())
                .then(response => {
                    console.log(response);
                    this.setState({
                        defaultBankCard: response.data,
                        selectedBankCard: response.data
                    });
                });
            await getNonDefaultBankCards(this.props.currentUser.id.toString())
                .then(response => {
                    console.log(response);
                    this.setState({
                        bankCards: response.data,
                        isLoad: true
                    });
                });
            await getNonPaidOrders()
                .then(response => {
                    console.log(response);
                    response.data.forEach((order) => {
                        this.setState(state => {
                            state.selectedBankCards.push({
                                orderId: order.id,
                                id: this.state.selectedBankCard.id,
                                firstNameCard: this.state.selectedBankCard.firstNameCard,
                                lastNameCard: this.state.selectedBankCard.lastNameCard,
                                numberCard: this.state.selectedBankCard.numberCard
                            });
                        });
                    });
                    this.setState({
                        orders: response.data
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
            <Order
                key={order.id}
                bankCards={this.state.bankCards}
                defaultCard={this.state.selectedBankCard}
                onChangeCard={this.handleChangeBankCard}
                loadOrders={this.loadOrders}
                order={order}
                onConfirm={this.handleConfirmOrder}
                onDelete={this.handleDeleteOrder}
            />
        );
        return (
            <div>
            {
                this.state.isLoad ? (
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">ID order</th>
                            <th scope="col">Photo</th>
                            <th scope="col" width="50%">Title</th>
                            <th scope="col">Price</th>
                            <th/>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {orderList}
                </tbody>
                </table>
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

export default Cart;

class Order extends Component {

    constructor(props) {
        super (props);
        this.state = {
            selectedBankCardId: 0
        };
        this.handleConfirmOrder = this.handleConfirmOrder.bind(this);
        this.handleChangeBankCard = this.handleChangeBankCard.bind(this);
    }

    componentDidMount() {
        this.setState({
            selectedBankCardId: this.props.defaultCard.id.toString()
        });
    }

    handleConfirmOrder(event) {
        confirmOrder(this.props.order.id.toString(), { id: this.state.selectedBankCardId})
            .then(response => {
                this.props.loadOrders();
            });
    }

    handleChangeBankCard(event) {
        console.log(event.target.value);
        console.log(event.target);
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    render() {
        let cards = this.props.bankCards;
        let cardList = cards.map((card) =>
            <option key={card.id} value={card.id}>
                {card.numberCard} {card.firstNameCard} {card.lastNameCard}
            </option>
        );
        return(
            <tr className="rows">
                <td>{this.props.order.id}</td>
                <td><img height="100" src={this.props.order.advert.photoURL}  alt={'...'}/></td>
                <td>
                    <div className="row">
                        <Link to={'/adverts/' + this.props.order.advert.id}>{this.props.order.advert.title}</Link>
                    </div>
                    <div className="row mt-4">
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <label className="input-group-text" >Card</label>
                            </div>
                            <select className="custom-select"
                                    name="selectedBankCardId"
                                    onChange={this.handleChangeBankCard}
                            >
                                <option value={this.props.defaultCard.id}>
                                    {this.props.defaultCard.numberCard} {this.props.defaultCard.firstNameCard} {this.props.defaultCard.lastNameCard}
                                </option>
                                { cardList }
                            </select>
                        </div>
                    </div>
                </td>
                <td>{this.props.order.advert.intPartPrice}.{this.props.order.advert.fractPartPrice}<sup>{this.props.order.advert.currency}</sup></td>
                <td>
                    <button className="btn btn-warning"
                            value={this.props.order.id}
                            onClick={this.handleConfirmOrder}
                    >CONFIRM</button>
                </td>
                <td><button className="btn btn-danger"
                            value={this.props.order.id}
                            onClick={this.props.onDelete}
                >DELETE</button></td>
            </tr>
        );
    }
}