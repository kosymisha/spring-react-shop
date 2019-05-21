import React, { Component } from 'react';
import { getBankCards, createBankCard,
    updateBankCard, deleteBankCard } from '../../../util/BankCardRequests'
import {Link} from "react-router-dom";
import Alert from "react-s-alert";
import {isValidNumberValue, isValidTextValue} from "../../../validation/Validation";
import {isValidNewCardForm} from "../../../validation/isValidNewCardForm";

class CardInfoSettings extends Component {

    constructor (props) {
        super (props);
        this.state = {
            cards: [],
            numberCard: '',
            firstNameCard: '',
            lastNameCard: '',
            month: '',
            year: '',
            msgFirstNameCard: '',
            msgLastNameCard: '',
            msgNumberCard: '',
            msgMonth: '',
            msgYear: ''
        };
        this.loadCards = this.loadCards.bind(this);
        this.handleSetDefault = this.handleSetDefault.bind(this);
        this.handleDeleteCard = this.handleDeleteCard.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddBankCard = this.handleAddBankCard.bind(this);
        this.handleInputChangeCardNames = this.handleInputChangeCardNames.bind(this);
        this.handleInputChangeCardValues = this.handleInputChangeCardValues.bind(this);
    }


    handleInputChangeCardNames (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value.toUpperCase();
        if (isValidTextValue(inputValue)){
            this.setState({
                [inputName]: inputValue
            });
        }
    }

    handleInputChangeCardValues (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        if (isValidNumberValue(inputValue)){
            this.setState({
                [inputName]: inputValue
            });
        }
    }

    handleInputChange (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleSetDefault(event) {
        console.log(this.props.currentProfileId);
        updateBankCard(this.props.currentProfileId, event.target.value)
            .then(() => {
                Alert.success("New default card.");
                this.loadCards();
            });
    }

    handleDeleteCard(event) {
        deleteBankCard(this.props.currentProfileId, event.target.value)
            .then(() => {
                Alert.success("Card was deleted.");
                this.loadCards();
            });
    }

    handleAddBankCard() {
        let validation = isValidNewCardForm(this.state);
        if (validation.isValid) {
            let newCard = {
                numberCard: this.state.numberCard,
                firstNameCard: this.state.firstNameCard,
                lastNameCard: this.state.lastNameCard,
                month: this.state.month,
                year: this.state.year
            };
            createBankCard(this.props.currentProfileId, newCard)
                .then(() => {
                    Alert.success("Card was added.");
                    this.loadCards();
                });
        } else {
            this.setState({
                msgFirstNameCard: validation.msgFirstNameCard,
                msgLastNameCard: validation.msgLastNameCard,
                msgNumberCard: validation.msgNumberCard,
                msgMonth: validation.msgMonth,
                msgYear: validation.msgYear
            });
        }
    }

    loadCards () {
        getBankCards(this.props.currentProfileId)
            .then(response => {
                this.setState({
                    cards: response.data
                })
            });
    }

    componentDidMount() {
        this.loadCards();
    }

    render() {
        let data = this.state.cards;
        let listCards = data.map((card) =>
            <BankCard
                cardId={card.id}
                key={card.id}
                numberCard={card.numberCard}
                firstNameCard={card.firstNameCard}
                lastNameCard = {card.lastNameCard}
                month = {card.month}
                year = {card.year}
                active = {card.active}
                onSetDefault={this.handleSetDefault}
                onDeleteCard={this.handleDeleteCard}
            />);
        return (
            <div className="row mt-3">
                <div className="col">
                    <h5>Card info</h5>
                    <div id="table-wrapper">
                        <div id="table-scroll">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Number</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Date</th>
                                    <th/>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody id="tBody">
                                { listCards }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <h5>Add new card</h5>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>First name</label>
                            <input type="text" name="firstNameCard" maxLength="20"
                                   className="form-control form-control-sm"
                                   value={this.state.firstNameCard}
                                   onChange={this.handleInputChangeCardNames}
                            /><small>{this.state.msgFirstNameCard}</small>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Last name</label>
                            <input type="text" name="lastNameCard" maxLength="20"
                                   className="form-control form-control-sm"
                                   value={this.state.lastNameCard}
                                   onChange={this.handleInputChangeCardNames}
                            /><small>{this.state.msgLastNameCard}</small>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Number</label>
                            <input type="text" name="numberCard" maxLength="16"
                                   className="form-control form-control-sm"
                                   value={this.state.numberCard}
                                   onChange={this.handleInputChangeCardValues}
                            /><small>{this.state.msgNumberCard}</small>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Month</label>
                            <input type="text" name="month" maxLength="2"
                                   className="form-control form-control-sm"
                                   value={this.state.month}
                                   onChange={this.handleInputChangeCardValues}
                            /><small>{this.state.msgMonth}</small>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Year</label>
                            <input type="text" name="year" maxLength="2"
                                   className="form-control form-control-sm"
                                   value={this.state.year}
                                   onChange={this.handleInputChangeCardValues}
                            /><small>{this.state.msgYear}</small>
                        </div>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button  className="btn btn-primary" onClick={this.handleAddBankCard}>Add</button>
                        <Link to={'/profiles/' + this.props.currentProfileId}  className="btn btn-secondary" >Back</Link>
                    </div><br/>
                </div>
            </div>
        );
    }
}

export default CardInfoSettings;

class BankCard extends Component {


    render() {
        return(
            <tr className="rows">
                <td>ends at {this.props.numberCard.substr(12, 4)}</td>
                <td>{this.props.firstNameCard} {this.props.lastNameCard}</td>
                <td>{this.props.month}/{this.props.year}</td>
                <td>
                    {
                        this.props.active ? (
                            <div>DEFAULT</div>
                        ) : (
                            <button className="btn btn-sm btn-outline-secondary"
                                    value={this.props.cardId}
                                    onClick={this.props.onSetDefault}
                            >MAKE DEFAULT</button>
                        )
                    }
                </td>
                <td>
                    {
                        this.props.active ? (
                            <div/>
                        ) : (
                            <button className="btn btn-sm btn-outline-danger"
                                    value={this.props.cardId}
                                    onClick={this.props.onDeleteCard}
                            >DELETE</button>
                        )
                    }
                </td>
            </tr>
        );
    }
}