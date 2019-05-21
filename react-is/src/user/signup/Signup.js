import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom'
import { GOOGLE_AUTH_URL } from '../../constants';
import { signup } from '../../util/APIUtils';
import { createProfile } from '../../util/ProfileRequests';
import Alert from 'react-s-alert';
import { isValidNumberValue, isValidTextValue } from '../../validation/Validation'
import { isValidSignUpForm } from '../../validation/isValidSignUpForm'

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'EMPTY',
            firstNameCard: '',
            lastNameCard: '',
            numberCard: '',
            month: '',
            year: '',
            msgFirstName: '',
            msgLastName: '',
            msgEmail: '',
            msgPassword: '',
            msgConfirmPassword: '',
            msgRole: '',
            msgFirstNameCard: '',
            msgLastNameCard: '',
            msgNumberCard: '',
            msgMonth: '',
            msgYear: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputChangeCardNames = this.handleInputChangeCardNames.bind(this);
        this.handleInputChangeCardValues = this.handleInputChangeCardValues.bind(this);
    }

    handleSubmit(event) {
        //event.preventDefault();
        let validation = isValidSignUpForm(this.state);
        if (validation.isValid){
            let roles = [];
            roles.push(this.state.role);
            let newProfile = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                roles: roles,
                cards: [{
                    firstNameCard: this.state.firstNameCard,
                    lastNameCard: this.state.lastNameCard,
                    numberCard: this.state.numberCard,
                    month: this.state.month,
                    year: this.state.year
                }]
            };
            createProfile(newProfile)
                .then(response => {
                    Alert.success("You're successfully registered. Please login to continue!");
                    this.props.history.push("/login");
                }).catch(error => {
                Alert.error(/*(error && error.message) ||*/ 'Oops! Something went wrong. Please try again!');
            });
        } else {
            console.log(validation);
            this.setState({
                msgFirstName: validation.msgFirstName,
                msgLastName: validation.msgLastName,
                msgEmail: validation.msgEmail,
                msgPassword: validation.msgPassword,
                msgConfirmPassword: validation.msgConfirmPassword,
                msgRole: validation.msgRole,
                msgFirstNameCard: validation.msgFirstNameCard,
                msgLastNameCard: validation.msgLastNameCard,
                msgNumberCard: validation.msgNumberCard,
                msgMonth: validation.msgMonth,
                msgYear: validation.msgYear
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

    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="row justify-content-md-center mt-3 ml-3">
                <div className="col col-md-6">
                        <h5>New user</h5>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label id="labelFirstName" htmlFor="inputFirstName4">First name</label>
                                <input type="text" name="firstName" maxLength="20"
                                       className="form-control form-control-sm" id="inputFirstName4"
                                       placeholder="First name"
                                       value={this.state.firstName}
                                       onChange={this.handleInputChange}
                                /><small>{this.state.msgFirstName}</small>
                            </div>
                            <div className="form-group col-md-6">
                                <label id="labelLastName" htmlFor="inputLastName4">Last name</label>
                                <input type="text" name="lastName" maxLength="20"
                                       className="form-control form-control-sm" id="inputLastName4"
                                       placeholder="Last name"
                                       value={this.state.lastName}
                                       onChange={this.handleInputChange}
                                /><small>{this.state.msgLastName}</small>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label id="labelInputEmail" htmlFor="inputEmail4">Email</label>
                                <input type="email" name="email" className="form-control form-control-sm"
                                       id="inputEmail4" maxLength="50" placeholder="Email"
                                       value={this.state.email}
                                       onChange={this.handleInputChange}
                                /><small>{this.state.msgEmail}</small>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label id="labelInputPass" htmlFor="inputPassword4">Password</label>
                                <input type="password" name="password" maxLength="20"
                                       className="form-control form-control-sm" id="inputPassword4"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this.handleInputChange}
                                /><small>{this.state.msgPassword}</small>
                            </div>
                            <div className="form-group col-md-6">
                                <label id="labelInputConfirmPass" htmlFor="inputPasswordConfirm4">Confirm
                                    password</label>
                                <input type="password" name="confirmPassword" maxLength="20"
                                       className="form-control form-control-sm" id="inputPasswordConfirm4"
                                       placeholder="Confirm password"
                                       value={this.state.confirmPassword}
                                       onChange={this.handleInputChange}
                                /><small>{this.state.msgConfirmPassword}</small>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                <label id="labelInputRole" htmlFor="inputRole">Role</label>
                                <select id="inputRole" name="role" className="custom-select custom-select-sm"
                                        onChange={this.handleInputChange}
                                >
                                    <option value="EMPTY" defaultValue={"EMPTY"}>Choose...</option>
                                    <option value="USER">USER</option>
                                    <option value="SELLER">SELLER</option>
                                </select><small>{this.state.msgRole}</small>
                            </div>
                        </div>
                        <h5>Card info</h5>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label id="labelInputFNCard" htmlFor="inputFirstNameCard">First name</label>
                                <input type="text" name="firstNameCard" maxLength="20"
                                       className="form-control form-control-sm" id="inputFirstNameCard"
                                       value={this.state.firstNameCard}
                                       onChange={this.handleInputChangeCardNames}
                                /><small>{this.state.msgFirstNameCard}</small>
                            </div>
                            <div className="form-group col-md-6">
                                <label id="labelInputLNCard" htmlFor="inputLastNameCard">Last name</label>
                                <input type="text" name="lastNameCard" maxLength="20"
                                       className="form-control form-control-sm" id="inputLastNameCard"
                                       value={this.state.lastNameCard}
                                       onChange={this.handleInputChangeCardNames}
                                /><small>{this.state.msgLastNameCard}</small>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label id="labelInputNumber" htmlFor="inputNumber">Number</label>
                                <input type="text" name="numberCard" maxLength="16"
                                       className="form-control form-control-sm" id="inputNumber"
                                       placeholder="0000000000000000"
                                       value={this.state.numberCard}
                                       onChange={this.handleInputChangeCardValues}
                                /><small>{this.state.msgNumberCard}</small>
                            </div>
                            <div className="form-group col-md-3">
                                <label id="labelInputMonth" htmlFor="inputMonth">Month</label>
                                <input type="text" name="month" maxLength="2"
                                       className="form-control form-control-sm" id="inputMonth" placeholder="00"
                                       value={this.state.month}
                                       onChange={this.handleInputChangeCardValues}
                                /><small>{this.state.msgMonth}</small>
                            </div>
                            <div className="form-group col-md-3">
                                <label id="labelInputYear" htmlFor="inputYear">Year</label>
                                <input type="text" name="year" maxLength="2"
                                       className="form-control form-control-sm" id="inputYear" placeholder="00"
                                       value={this.state.year}
                                       onChange={this.handleInputChangeCardValues}
                                /><small>{this.state.msgYear}</small>
                            </div>
                        </div>
                        <button onClick={this.handleSubmit} className="btn btn-primary">Sign up</button>
                        <a className="btn btn-secondary ml-2" href={GOOGLE_AUTH_URL}>Sign up with Google</a><br/>
                        <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                </div>
            </div>
        );
    }
}



export default Signup;