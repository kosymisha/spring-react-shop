import React, { Component } from 'react';
import {getCategories, getCategoriesByKeyword} from "../util/CategoriesRequests";

class Categories extends Component {

    constructor (props) {
        super (props);
        this.state = {
            categories: [],
            isLoad: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.loadCategories = this.loadCategories.bind(this);
    }

    handleInputChange (event) {
        this.setState({
            isLoad: false
        });
        getCategoriesByKeyword(event.target.value)
            .then(response => {
                this.setState({
                    categories: response.data,
                    isLoad: true
                });
            });
    }

    loadCategories () {
        getCategories()
            .then(response => {
                this.setState({
                    categories: response.data,
                    isLoad: true
                });
            });
    }

    componentDidMount() {
        this.loadCategories();
    }

    render() {
        const data = this.state.categories;
        const listData = data.map((category) => {
            if (category.id > 0) {
                return <div
                    style={this.props.valueActiveId !== category.id.toString() ? {background: 'white'} : {background: 'gray'}}
                    id={category.id}
                    onClick={this.props.onChooseCategory}
                    key={category.id}
                    className='mb-2'
                >{category.categoryName}
                </div>
            }
        }

        );
        return (
            <div id='cat'>
                <div className="input-group mb-3">
                    <input type="text" className="form-control form-control-sm"
                           placeholder="Category"
                           name='categoryName'
                           aria-describedby="basic-addon2"
                           onChange={this.handleInputChange}
                    />
                </div>
                {
                    this.state.isLoad ? (
                        <div className='overflow-auto' id='cat'>
                            <div className="btn-group-vertical btn-group-toggle btn-group-sm"
                                 data-toggle="buttons"
                                 role="group" aria-label="...">
                                <div
                                    style={this.props.valueActiveId !== '-1' ? {background: 'white'} : {background: 'gray'}}
                                    id='-1'
                                    onClick={ this.props.onChooseCategory }
                                    className='mb-2'
                                >None
                                </div>
                                { listData }
                            </div>
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
        )
    }
}

export default Categories;