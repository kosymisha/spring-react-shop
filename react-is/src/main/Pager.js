import React, { Component } from 'react';
import './Pager.css';

class Pager extends Component {
    render () {
        let listPages = [];
        for (let i = 0; i < this.props.body.length; i++) {
            if (this.props.body[i] === this.props.currentPage) {
                listPages.push(
                    <li key={i} className="page-item active">
                        <a className="page-link" href="#" tabIndex="-1">{this.props.body[i]}</a>
                    </li>
                );
            } else if (this.props.body[i] === -1) {
                listPages.push(
                    <li key={i} className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1">...</a>
                    </li>
                );
            } else {
                listPages.push(
                    <li key={i} className="page-item">
                        <a className="page-link"
                           onClick={this.props.onPageClick}
                           value={this.props.body[i]}
                           tabIndex="-1">{this.props.body[i]}</a>
                    </li>
                );
            }
        }
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <ul className="pagination pagination-sm justify-content-center">


                            <li className="page-item disabled">
                                <a className="page-link" href="" >Page</a>
                            </li>

                            { listPages }


                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pager;

/*

    <div className="col">
                        <ul className="pagination pagination-sm">
                            <li className="page-item disabled">
                                <a className="page-link" href="" >Size</a>
                            </li>

                            <li className="page-item active">
                                <a className="page-link" href="#" tabIndex="-1">c</a>
                            </li>

                            <li className="page-item">
                                <a className="page-link" tabIndex="-1">c</a>
                            </li>

                        </ul>
                    </div>

 */
