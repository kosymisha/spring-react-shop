import {isValidPrice} from "../validation/Validation";
import { Link } from 'react-router-dom';
import React, { Component } from "react";

class SearchResult extends Component {

    render() {

        let startIndex = (this.props.currentPage - 1) * this.props.currentSize;
        let endIndex = this.props.currentPage * this.props.currentSize > this.props.adverts.length ?
            this.props.adverts.length : this.props.currentPage * this.props.currentSize;
        let adverts = [];
        for (let i = startIndex; i < endIndex; i++) {
            adverts.push(
                <div key={i} className="card my-3">
                    <div className="row">
                        <div className="col">
                            <img height="170" src={this.props.adverts[i].photoURL}/>
                        </div>
                        <div className="col">
                            <Link to={'/adverts/' + this.props.adverts[i].id}>{this.props.adverts[i].title}</Link> <br/>
                            <b>{this.props.adverts[i].intPartPrice}.{this.props.adverts[i].fractPartPrice}</b>
                            <sup>{this.props.adverts[i].currency}</sup>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className='row'>
                <div className='col'>
                    <div className="card-columns">
                        { adverts }
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResult;