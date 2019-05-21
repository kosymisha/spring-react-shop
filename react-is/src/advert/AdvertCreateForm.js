import React, { Component } from 'react';
import { createAdvert } from "../util/AdvertRequests";
import { getShopsByOwner } from "../util/ShopRequests";
import { uploadFileAdvert } from '../util/FileRequests';
import {Link} from "react-router-dom";
import Alert from 'react-s-alert';
import './AdvertCreateForm.css';
import {NO_AVATAR_URL} from "../constants";
import Categories from '../main/Categories';
import { isValidPrice, getIntPartPrice, getFractPartPrice } from "../validation/Validation";
import { isValidNewAdvertForm } from '../validation/isValidNewAdvertForm';

class AdvertCreateForm extends Component {

    constructor (props) {
        super(props);
        this.state = {
            title: '',
            price: '',
            availableShops: [],
            shop: '0',
            category: '-1',
            photoURL: NO_AVATAR_URL,
            selectedPhotoURL: { name: 'no file selected' },
            previewPhotoURL: NO_AVATAR_URL,
            description: '',
            msgTitle: '',
            msgPrice: '',
            msgCategory: '',
            msgShop: ''
        };
        this.loadShops = this.loadShops.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShopChange = this.handleShopChange.bind(this);
        this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChooseCategory = this.handleChooseCategory.bind(this);
        this.handleInputFileChange = this.handleInputFileChange.bind(this);
        this.handleInputPriceChange = this.handleInputPriceChange.bind(this);
    }

    loadShops() {
        getShopsByOwner(this.props.currentUser.id)
            .then(response => {
                this.setState({
                    availableShops: response.data
                });
            });
    }

    handleInputPriceChange (event) {
        let target = event.target;
        let inputValue = target.value;
        if (isValidPrice(inputValue)) {
            if (inputValue.length === 1 &&
                inputValue.length > this.state.price.length  &&
                inputValue[inputValue.length - 1] === "0") { inputValue += "."; }
            else if (inputValue === "0" && this.state.price === "0.") { inputValue = ''; }
            this.setState({
                price: inputValue
            });
        }
    }

    handleShopChange (event) {
        console.log(event.target.value);
        this.setState({
            shop: event.target.value
        });
    }

    componentDidMount() {
        this.loadShops();
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

    handleChooseCategory (event) {
        this.setState({
            category: event.target.id
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
        let validation = isValidNewAdvertForm(this.state);
        if (validation.isValid){
            const newAdvert = {
                title: this.state.title,
                intPartPrice: getIntPartPrice(this.state.price),
                fractPartPrice: getFractPartPrice(this.state.price),
                description: this.state.description,
                shop: { id: this.state.shop },
                category: { id: this.state.category }
            };
            createAdvert(newAdvert).then(advert => {
                if (this.state.selectedPhotoURL.name !== 'no file selected') {
                    let data = new FormData();
                    data.append('file', this.state.selectedPhotoURL, this.state.selectedPhotoURL.name);
                    uploadFileAdvert(advert.data.id, data)
                        .then(() => {
                            Alert.success("Shop was created successfully!");
                            this.props.history.push('/adverts/' + advert.data.id);
                        });
                } else {
                    Alert.success("Shop was created successfully!");
                    this.props.history.push('/adverts/' + advert.data.id);
                }
            }).catch(error => {
                console.log(error);
            });
        } else {
            this.setState({
                msgTitle: validation.msgTitle,
                msgPrice: validation.msgPrice,
                msgCategory: validation.msgCategory,
                msgShop: validation.msgShop
            });
        }
    }

    render () {
        let data = this.state.availableShops;
        let availableShopslist = data.map((shop) =>
            <option key={shop.id} value={shop.id}>
                {shop.nameShop}
            </option>
        );
        return (
            <div className="container-fluid">
                <div className='row justify-content-md-center mt-2' id='create-advert'>
                    <div className='col'>
                        <h5 align="center">New advert</h5>
                        <div className={'row justify-content-between'}>
                            <div className='col'>
                                <div className="shop-avatar-create mb-2">
                                    <img src={this.state.previewPhotoURL} alt="..."/>
                                </div>
                            </div>
                        </div>
                        <div className={'row'}>
                            <div className='col'>
                                <label className={"mt-4"}>Photo</label>
                                <div className="input-group input-group-sm">
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-md-center mt-3" id='create-advert'>
                    <div className="col col-md-6">
                        <label className={"mt-4"}>Title</label>
                        <small className='ml-3'>{this.state.msgTitle}</small>
                        <input type="text" name="title"
                               className="form-control form-control-sm"
                               placeholder="Title"
                               value={this.state.title}
                               onChange={this.handleInputChange}
                        />
                        <label className={"mt-4"}>Price</label>
                        <small className='ml-3'>{this.state.msgPrice}</small>
                        <div className="input-group input-group-sm mb-3">
                            <div className="input-group-prepend">
                                <span className="btn btn-outline-secondary">$</span>
                            </div>
                            <input type="text" className="form-control"
                                   aria-label="Amount (to the nearest dollar)"
                                   name='price'
                                   placeholder="0.00"
                                   value={this.state.price}
                                   onChange={this.handleInputPriceChange}
                            />
                        </div>
                        <label className={"mt-4"}>Description</label>
                        <textarea type="text" name="description"
                                  className="form-control form-control-sm"
                                  id="InputCompany"
                                  placeholder="Description"
                                  value={this.state.description}
                                  onChange={this.handleInputChange }
                        />
                        <label className={'mt-4'}>Shop</label>
                        <small className='ml-3'>{this.state.msgShop}</small>
                        <div className="input-group input-group-sm mb-3">
                            <select className="custom-select"
                                    onChange={this.handleShopChange}
                            >
                                <option value='0' defaultValue={'0'}>Choose...</option>
                                { availableShopslist }
                            </select>
                        </div>
                        <div className="btn-group mt-3 mb-5">
                            <Link to={"/shops"} className="btn btn-secondary">Back</Link>
                            <button className="btn btn-success" onClick={this.handleSubmit}>Create</button>
                        </div>
                    </div>
                    <div className='col col-md-6'>
                        <label className={'mt-4'}>Category</label>
                        <small className='ml-3'>{this.state.msgCategory}</small>
                        <Categories onChooseCategory={this.handleChooseCategory}
                                    valueActiveId={this.state.category}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default AdvertCreateForm;