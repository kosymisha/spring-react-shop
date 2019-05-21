import React, { Component } from 'react';
import {createShop, getShop, updateShop} from "../util/ShopRequests";
import { uploadFileShop, deleteFileShop } from '../util/FileRequests'
import {Link} from "react-router-dom";
import Alert from 'react-s-alert';
import './ShopCreateForm.css';
import {NO_AVATAR_URL} from "../constants";

class ShopUpdateForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            id: {},
            nameShop: '',
            url: '',
            description: '',
            photoURL: '',
            selectedPhotoURL: { name: 'no file selected' },
            previewPhotoURL: NO_AVATAR_URL,
            photoChanged: false,
            isLoad: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
        this.loadShop = this.loadShop.bind(this);
    }

    componentDidMount() {
        this.loadShop();
    }

    loadShop () {
        getShop(this.props.computedMatch.params.shop)
            .then(response => {
                console.log(response);
                this.setState({
                    id: response.data.id,
                    nameShop: response.data.nameShop,
                    url: response.data.url,
                    photoURL: response.data.photoURL,
                    selectedPhotoURL: { name: response.data.photoURL },
                    previewPhotoURL: response.data.photoURL,
                    description: response.data.description,
                    shop: response.data,
                    owner: response.data.owner,
                    comments: response.data.comments,
                    isLoad: true
                });
            })
            .catch(errors => {
                this.setState({
                    errors: errors
                });
            });
    }

    handleDeletePhoto () {
        this.setState({
            selectedPhotoURL: { name: 'no file selected' },
            previewPhotoURL: NO_AVATAR_URL,
            photoChanged: true
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
                photoChanged: true
            });
    }

    handleSubmit (event) {
        event.preventDefault();
        const newShop = {
            nameShop: this.state.nameShop,
            url: this.state.url,
            photoURL: this.state.photoURL,
            description: this.state.description
        };
        console.log(newShop);

        updateShop(this.props.computedMatch.params.shop, newShop).then(shop => {

            if (this.state.photoChanged && this.state.selectedPhotoURL.name !== 'no file selected') {
                let data = new FormData();
                data.append('file', this.state.selectedPhotoURL, this.state.selectedPhotoURL.name);
                uploadFileShop(this.props.computedMatch.params.shop, data).then(() => {
                    this.props.history.push('/shops/' + shop.data.id);
                    Alert.success("Success1");
                });
            } else if (this.state.photoChanged && this.state.selectedPhotoURL.name === 'no file selected') {
                deleteFileShop(this.props.computedMatch.params.shop).then(() => {
                        this.props.history.push('/shops/' + shop.data.id);
                        Alert.success("Success3");
                    }
                );
            } else {
                this.props.history.push('/shops/' + shop.data.id);
                Alert.success("Success2");
            }
        }).catch(errors => {
            Alert.error(errors.response.data.errorMsg);
        });

    }

    render () {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center mt-3 ml-3">
                {
                    this.state.isLoad ? (
                                <div className="col col-md-6">
                                    <h5 align="center">Update shop</h5>
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
                                    <input type="text" name="nameShop"
                                           className="form-control"
                                           id="InputNameShop"
                                           placeholder="Name"
                                           value={this.state.nameShop}
                                           onChange={this.handleInputChange}
                                    />
                                    <label className={"mt-4"}>URL</label>
                                    <input type="text" name="url"
                                           className="form-control"
                                           id="InputUrl"
                                           placeholder="www.example.com"
                                           value={this.state.url}
                                           onChange={this.handleInputChange}
                                    />
                                    <label className={"mt-4"}>Description</label>
                                    <textarea name="description"
                                              className="form-control"
                                              id="InputCompany"
                                              placeholder="Description"
                                              value={this.state.description}
                                              onChange={this.handleInputChange }
                                    >f</textarea>
                                    <div className="btn-group mt-3">
                                        <Link to={"/shops/" + this.state.id} className="btn btn-secondary">Back</Link>
                                        <button className="btn btn-success" onClick={this.handleSubmit}>Save</button>
                                    </div>
                                </div>

                    ) : (
                        <div align="center">
                            <div className="spinner-border text-secondary mt-5" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        )
    }
}

export default ShopUpdateForm;