import React, { Component } from 'react';
import { createContact } from "../../util/APIUtils";
import {Link} from "react-router-dom";
import Alert from 'react-s-alert';

class NewContactForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            company:'',
            numbers: [],
            numNumbers: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputNumberChange = this.handleInputNumberChange.bind(this);
    }

    handleInputChange (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    onAddNumber = () => {
        this.setState(state => {
            state.numbers.push({ phoneNumber: '' });
        });
        this.setState({
            numNumbers: this.state.numNumbers + 1
        });
    };

    onDeleteNumber = i => {
        this.setState(state => {
            console.log(i);
            state.numbers.splice(i, 1);
            console.log(state.numbers);
        });
        this.setState({
            numNumbers: this.state.numNumbers - 1
        });

    };

    handleInputNumberChange (event) {
        const target = event.target;
        const idNumber = target.id;
        this.setState(state => {
            state.numbers[idNumber].phoneNumber = target.value;
            return {};
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        const newContactItem = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            company: this.state.company,
            numbers: this.state.numbers,
            user: this.props.currentUser
        };
        //Object.assign({}, this.state);
        console.log(newContactItem);
        createContact(newContactItem).then(object => {
            Alert.success("Сontact was created successfully!");
            this.props.history.push('/contacts/' + object.id);
        });
    }

    render () {
        const numberList = [];
        if (this.state.numNumbers === 0) numberList.push(<br key={-1} />);
        for (let i = 0; i < this.state.numNumbers; i += 1) {
            numberList.push(
                <div key={i} className="input-group ">
                    <input type="text" name={"phoneNumber" + i}
                           className="form-control mt-3"
                           aria-label="Recipient's username" aria-describedby="button-addon2"
                           id={i}
                           placeholder="Numbers"
                           value={this.state.numbers[i].phoneNumber}
                           onChange={this.handleInputNumberChange}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-outline-danger mt-3"
                                type="button"
                                id="button-addon2"
                                onClick={() => this.onDeleteNumber(i)}
                        >Delete
                        </button>
                    </div>
                </div>
            );
        };

        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center mt-3 ml-3">
                    <div className="col col-md-6">
                        <h5>New contact</h5>
                        <label className={"mt-4"}>First name</label>
                        <input type="text" name="firstName"
                               className="form-control"
                               id="InputFirstName"
                               placeholder="Firstname"
                               value={this.state.firstName}
                               onChange={this.handleInputChange}
                        />
                        <label className={"mt-4"}>Last name</label>
                        <input type="text" name="lastName"
                               className="form-control"
                               id="InputLastName"
                               placeholder="Lastname"
                               value={this.state.lastName}
                               onChange={this.handleInputChange}
                        />
                        <label className={"mt-4"}>Company</label>
                        <input type="text" name="company"
                               className="form-control"
                               id="InputCompany"
                               placeholder="Company"
                               value={this.state.company}
                               onChange={this.handleInputChange }
                        />
                        <label className={"mt-4"}>Numbers</label>
                        <button onClick={this.onAddNumber} className="btn btn-outline-success btn-sm ml-2">add</button>
                        {numberList}
                        <div className="btn-group mt-3">
                            <Link to={"/contacts"} className="btn btn-secondary">Back</Link>
                            <button className="btn btn-success" onClick={this.handleSubmit}>Create</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default NewContactForm;