import React, { Component } from 'react';
import './Main.css';
import Categories from "./Categories";
import Search from './Search';
import SearchResult from './SearchResult';
import { search } from '../util/SearchRequests';
import {isValidPrice} from "../validation/Validation";
import Alert from "react-s-alert";
import Pager from "./Pager";

class Main extends Component {

    constructor (props) {
        super (props);
        this.state = {
            isLoad: false,
            adverts: [],
            minPrice: '',
            maxPrice: '',
            sortType: '0',
            keywords: '',
            category: '-1',
            currentPage: 1,
            currentSize: 9,
            totalPages: {},
            shopId: '0'
        };
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handleSelectShop = this.handleSelectShop.bind(this);
        this.handleInputSearch = this.handleInputSearch.bind(this);
        this.handleClickSearch = this.handleClickSearch.bind(this);
        this.handleChooseCategory = this.handleChooseCategory.bind(this);
        this.hanldeSelectSortType = this.hanldeSelectSortType.bind(this);
        this.handleInputMinPriceChange = this.handleInputMinPriceChange.bind(this);
        this.handleInputMaxPriceChange = this.handleInputMaxPriceChange.bind(this);
    }

    handleSelectShop (event) {
        this.setState({
            shopId: event.target.value
        });
    }

    handleChooseCategory (event) {
        this.setState({
            category: event.target.id
        });
    }

    handlePageClick (event) {
        let currentPage = Number(event.target.innerText);
        let totalPages = Math.ceil(this.state.adverts.length / this.state.currentSize);
        let head = currentPage > 4 ? [1, -1] : [1, 2, 3];
        let tail = currentPage < totalPages - 3 ? [-1, totalPages] : [totalPages - 2, totalPages - 1, totalPages];
        let bodyBefore = currentPage > 4 && currentPage < totalPages - 1 ? [currentPage - 2, currentPage - 1] : [];
        let bodyAfter = currentPage > 2 && currentPage < totalPages - 3 ? [currentPage + 1, currentPage + 2] : [];
        let body = [];
        if (totalPages > 7)
            body = head.concat(bodyBefore, (currentPage > 3 && currentPage < totalPages - 2 ? [currentPage] : []), bodyAfter, tail);
        else
            for(let j = 0; j < totalPages; j++) body.push(j + 1);
        this.setState({
            totalPages: totalPages,
            head: head,
            tail: tail,
            bodyBefore: bodyBefore,
            bodyAfter: bodyAfter,
            body: body,
            currentPage: currentPage
        });
    }

    handleInputMinPriceChange (event) {
        let target = event.target;
        let inputValue = target.value;
        if (isValidPrice(inputValue)) {
            if (inputValue.length === 1 &&
                inputValue.length > this.state.minPrice.length  &&
                inputValue[inputValue.length - 1] === "0") { inputValue += "."; }
            else if (inputValue === "0" && this.state.minPrice === "0.") { inputValue = ''; }
            this.setState({
                minPrice: inputValue
            });
        }
    }

    handleInputMaxPriceChange (event) {
        let target = event.target;
        let inputValue = target.value;
        if (isValidPrice(inputValue)) {
            if (inputValue.length === 1 &&
                inputValue.length > this.state.maxPrice.length  &&
                inputValue[inputValue.length - 1] === "0") { inputValue += "."; }
            else if (inputValue === "0" && this.state.maxPrice === "0.") { inputValue = ''; }
            console.log(event);
            this.setState({
                maxPrice: inputValue
            });
        }
    }

    hanldeSelectSortType (event) {
        this.setState({
            sortType: event.target.value
        });
    }

    handleInputSearch (event) {
        this.setState({
            keywords: event.target.value
        });
    }

    handleClickSearch (event) {
        if (this.state.category !== '-1' || this.state.keywords.length > 0 || this.state.shopId !== '0') {
            this.setState({ isLoad: false, currentPage: 1 });
            search(this.state.sortType, this.state.category, this.state.keywords,
                this.state.minPrice, this.state.maxPrice, this.state.shopId)
                .then(response => {
                    let totalPages = Math.ceil(response.data.length / this.state.currentSize); // 1
                    let head = this.state.currentPage > 4 ? [1, -1] : [1, 2, 3];                  // 1, -1
                    let tail = this.state.currentPage < totalPages - 3 ? [-1, totalPages] : [totalPages - 2, totalPages - 1, totalPages];
                    let bodyBefore = this.state.currentPage > 4 && this.state.currentPage < totalPages - 1 ? [this.state.currentPage - 2, this.state.currentPage - 1] : [];
                    let bodyAfter = this.state.currentPage > 2 && this.state.currentPage < totalPages - 3 ? [this.state.currentPage + 1, this.state.currentPage + 2] : [];
                    let body = [];
                    if (totalPages > 7)
                        body = head.concat(bodyBefore, (this.state.currentPage > 3 && this.state.currentPage < totalPages - 2 ? [this.state.currentPage] : []), bodyAfter, tail);
                    else
                        for(let j = 0; j < totalPages; j++) body.push(j + 1);
                    //console.log(response.data);
                    this.setState({
                        adverts: response.data,
                        isLoad: true,
                        totalPages: totalPages,
                        head: head,
                        tail: tail,
                        bodyBefore: bodyBefore,
                        bodyAfter: bodyAfter,
                        body: body
                    });
                });
        } else {
            Alert.warning('Input keywords or choose category or shop');
        }
    }

    render() {
        return (
            <div className="row mt-3">
                <div className='col-2'>
                    <Categories onChooseCategory={this.handleChooseCategory} valueActiveId={this.state.category} />
                </div>
                <div className="col-10" id="main">
                    <div className='row'>
                        <div className='col'>
                            <Search onClickSearch={this.handleClickSearch}
                                    onChangeInputMinPrice={this.handleInputMinPriceChange}
                                    onChangeInputMaxPrice={this.handleInputMaxPriceChange}
                                    onSelectSortType={this.hanldeSelectSortType}
                                    onSelectShop={this.handleSelectShop}
                                    onChangeInputSearch={this.handleInputSearch}
                                    valueKeywords={this.state.keywords}
                                    valueMinPrice={this.state.minPrice}
                                    valueMaxPrice={this.state.maxPrice}
                                    valueSortType={this.state.sortType}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            {
                                this.state.isLoad ? (
                                    <div>
                                        <Pager onPageClick={this.handlePageClick}
                                               body={this.state.body}
                                               currentPage={this.state.currentPage}
                                        />
                                        <SearchResult adverts={this.state.adverts}
                                                      currentPage={this.state.currentPage}
                                                      currentSize={this.state.currentSize}
                                        />
                                        <Pager onPageClick={this.handlePageClick}
                                               body={this.state.body}
                                               currentPage={this.state.currentPage}
                                        />
                                    </div>
                                ) : (
                                    <div align="center">
                                        <div className="spinner-border text-secondary" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main;
