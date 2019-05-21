import React, { Component } from 'react';

class AddContact extends Component {

    constructor (props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            company:''
        };
        //this.handleInputChange = this.handleInputChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }
/*
    handleInputChange (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit (event) {
        event.preventDefault();
        const newContactItem = Object.assign({}, this.state);
        console.log(newContactItem);
    }
*/
    render () {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center mt-3 ml-3">
                    <div className="col col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h5>New contact</h5>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <input type="text" name="firstName"
                                           className="form-control form-control-sm"
                                           id="InputFirstName"
                                           placeholder="Firstname"
                                           //value={this.state.firstName}
                                           //onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <input type="text" name="lastName"
                                           className="form-control form-control-sm"
                                           id="InputLastName"
                                           placeholder="Lastname"
                                           //value={this.state.lastName}
                                           //onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <input type="text" name="company"
                                           className="form-control form-control-sm"
                                           id="InputCompany"
                                           placeholder="Company"
                                           //value={this.state.company}
                                           //onChange={this.handleInputChange }
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <input type="text" name="company"
                                           className="form-control form-control-sm"
                                           id="InputCompany"
                                           placeholder="Company"
                                           //value={this.state.company}
                                           //onChange={this.handleInputChange }
                                    />
                                </div>
                            </div>
                            <div><input className="btn btn-secondary" type="submit" value="Create" /></div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddContact;