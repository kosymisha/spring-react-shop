import React, {Component} from 'react';
import { updateContact, getContactById } from "../../util/APIUtils";
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import './UpdateContactForm.css';

class UpdateContactForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            file: null,
            firstName: '',
            lastName: '',
            company:'',
            numbers: [],
            numNumbers: 0
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadContactById = this.loadContactById.bind(this);
        this.handleInputNumberChange = this.handleInputNumberChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
    }

    handleInputFileChange(event) {
        this.setState({
            file: URL.createObjectURL(event.target.files[0])
        })
    }

    loadContactById() {
        getContactById(this.props.computedMatch.params.contact)
            .then(response => {
                console.log(response);
                this.setState({
                    firstName: response.firstName,
                    lastName: response.lastName,
                    company: response.company,
                    numbers: response.numbers,
                    numNumbers: response.numbers.length
                });
            }).catch(error => {
                this.setState({
                    contact: {}
                });
        });
    }

    componentDidMount() {
        this.loadContactById();
    }

    handleInputChange (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleInputNumberChange (event) {
        const target = event.target;
        const idNumber = target.id;
        this.setState(state => {
            state.numbers[idNumber].phoneNumber = target.value;
            return {};
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
            /*const numbers =*/ state.numbers.splice(i, 1);
            console.log(state.numbers);
            //return {numbers, };
        });


        this.setState({
            numNumbers: this.state.numNumbers - 1
        });

    };

    handleDelete (event) {
        event.preventDefault();
        /*
        deleteContact(this.props.computedMatch.params.contact).then(object => {
            Alert.success("Сontact was deleted successfully!");
            this.props.history.push('/contacts');
        });
        */
    }

    handleSubmit (event) {
        event.preventDefault();
        const newContactItem = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            company: this.state.company,
            numbers: this.state.numbers
        };
        updateContact(this.props.computedMatch.params.contact, newContactItem).then(object => {
            Alert.success("Сontact was updated successfully!");
            this.props.history.push('/contacts/' + object.id);
        });
    }

    render () {

        const numberList = [];
        if (this.state.numNumbers === 0) numberList.push(<br key={-1} />);
        for (let i = 0; i < this.state.numNumbers; i += 1) {
                numberList.push(
                    <div key={i} className="input-group mb-2">
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
        let avatarPicture = {};
        if (this.state.file === null) {
            let avatarLetters = '';
            if (this.state.firstName[0] !== undefined) avatarLetters = this.state.firstName[0];
            if (this.state.lastName[0] !== undefined) avatarLetters += this.state.lastName[0];
            avatarPicture = <div className="text-avatar-update">
                <span>{avatarLetters}</span>
            </div>;
        } else {
            avatarPicture = <div className="text-avatar-update"><img alt={''} src={this.state.file}/></div>;
        }
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center mt-3">
                    <div className="col col-md-6">
                        <div className={'row justify-content-between'}>
                            <div className={'col'}>
                                <Link to={"/contacts"} className="btn btn-secondary">Back</Link>
                            </div>
                            <div className={'col'}>
                                {avatarPicture}
                            </div>
                            <div className={'col'}>
                                <div className="btn-group-toggle" data-toggle="buttons">
                                    <label className="btn btn-warning float-right">
                                        <input type="checkbox" autoComplete="off" /> Fav
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="input-group mb-3">
                                <div className="custom-file">
                                    <input type="file"  id="inputGroupFile02" onChange={this.handleInputFileChange} />
                                    <label className="custom-file-label" htmlFor="inputGroupFile02"
                                           aria-describedby="inputGroupFileAddon02" >Choose file</label>
                                </div>
                            </div>
                        </div>
                        <label className={"mt-4"}>First name</label>
                        <input type="text" name="firstName"
                               className="form-control"
                               id="InputFirstName"
                               placeholder="First name"
                               value={this.state.firstName}
                               onChange={this.handleInputChange}
                        />
                        <label className={"mt-4"}>Last name</label>
                        <input type="text" name="lastName"
                               className="form-control"
                               id="InputLastName"
                               placeholder="Last name"
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
                            <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>
                            <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateContactForm;