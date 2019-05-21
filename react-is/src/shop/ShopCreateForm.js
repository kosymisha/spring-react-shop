import React, { Component } from 'react';
import { createShop } from "../util/ShopRequests";
import { uploadFileShop } from '../util/FileRequests'
import {Link} from "react-router-dom";
import Alert from 'react-s-alert';
import './ShopCreateForm.css';
import {NO_AVATAR_URL} from "../constants";
import {forEach} from "react-bootstrap/es/utils/ElementChildren";
import {isValidNewShopForm} from "../validation/isValidNewShopForm";

class ShopCreateForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            nameShop: '',
            url: '',
            photoURL: '',
            selectedPhotoURL: { name: 'no file selected' },
            previewPhotoURL: NO_AVATAR_URL,
            description: '',
            msgNameShop: '',
            msgUrl: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
    }

    handleDeletePhoto () {
        this.setState({
            selectedPhotoURL: { name: 'no file selected' },
            previewPhotoURL: NO_AVATAR_URL
        });
    }

    handleInputChange (event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({
            [inputName]: inputValue
        });
    }

    handleInputFileChange(event) {
        if (event.target.files[0] !== undefined)
            this.setState({
                selectedPhotoURL: event.target.files[0],
                previewPhotoURL: URL.createObjectURL(event.target.files[0]),
            });
    }

    handleSubmit (event) {
        event.preventDefault();
        let validation = isValidNewShopForm(this.state);
        if (validation.isValid) {
            const newShop = {
                nameShop: this.state.nameShop,
                url: this.state.url,
                photoURL: this.state.photoURL,
                description: this.state.description,
                user: this.props.currentUser
            };

            createShop(newShop).then(shop => {
                console.log(shop);
                if (this.state.selectedPhotoURL.name !== 'no file selected') {
                    let data = new FormData();
                    data.append('file', this.state.selectedPhotoURL, this.state.selectedPhotoURL.name);
                    uploadFileShop(shop.data.id, data)
                        .then(() => {
                            Alert.success("Shop was created successfully!");
                            this.props.history.push('/shops/' + shop.data.id);
                        });
                } else {
                    Alert.success("Shop was created successfully!");
                    this.props.history.push('/shops/' + shop.data.id);
                }
            }).catch(errors => {
                Alert.error(errors.response.data.errorMsg);
            });
        } else {
            this.setState({
                msgNameShop: validation.msgNameShop,
                msgUrl: validation.msgUrl
            });
        }
    }

    render () {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center mt-3 ml-3">
                    <div className="col col-md-6">
                        <h5 align="center">New shop</h5>
                        <div className={'row justify-content-between'}>
                            <div className='col'>
                                <div className="shop-avatar-create mb-2">
                                    <img src={this.state.previewPhotoURL} alt="..."/>
                                </div>
                            </div>
                        </div>
                        <label className={"mt-4"}>Photo</label>
                        <div className="input-group">
                            <div className="custom-file">
                                <input type="file"  id="inputGroupFile02" onChange={this.handleInputFileChange} />
                                <label className="custom-file-label" htmlFor="inputGroupFile02"
                                       aria-describedby="inputGroupFileAddon02" >
                                    {this.state.selectedPhotoURL.name.substr(0, 45) + '...'}
                                </label>
                            </div>
                            <div className="input-group-append">
                                <button className="btn btn-outline-danger" type="button"
                                        id="inputGroupFileAddon04" onClick={this.handleDeletePhoto}>Delete
                                </button>
                            </div>
                        </div>
                        <label className={"mt-4"}>Name</label>
                        <small className='ml-3'> {this.state.msgNameShop}</small>
                        <input type="text" name="nameShop"
                               className="form-control"
                               id="InputNameShop"
                               maxLength='60'
                               placeholder="Name"
                               value={this.state.nameShop}
                               onChange={this.handleInputChange}
                        />
                        <label className={"mt-4"}>URL</label>
                        <small className='ml-3'> {this.state.msgUrl}</small>
                        <input type="text" name="url"
                               className="form-control"
                               maxLength='100'
                               id="InputUrl"
                               placeholder="www.example.com"
                               value={this.state.url}
                               onChange={this.handleInputChange}
                        />
                        <label className={"mt-4"}>Description</label>
                        <textarea type="text" name="description"
                               className="form-control"
                               id="InputCompany"
                                  maxLength='500'
                               placeholder="Description"
                               value={this.state.description}
                               onChange={this.handleInputChange }
                        >f</textarea>
                        <div className="btn-group mt-3">
                            <Link to={"/shops"} className="btn btn-secondary">Back</Link>
                            <button className="btn btn-success" onClick={this.handleSubmit}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShopCreateForm;