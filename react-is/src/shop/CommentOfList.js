import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ShopOfList.css';

class CommentOfList extends Component {
    render() {
        return (
            <div className="row mt-2">
                <div className="col-10">
                    <div className="media">
                        <img width="65" src={this.props.author.photoURL} className="mr-3" />
                        <div className="media-body">
                            {
                                this.props.currentUser !== null && this.props.currentUser.role === 'ADMIN' ? (
                                    <Link to={'/profiles/' + this.props.author.id}>
                                        <b className="mt-0">{this.props.author.firstName} {this.props.author.lastName}</b>
                                    </Link>
                                ) : (
                                    <b className="mt-0">{this.props.author.firstName} {this.props.author.lastName}</b>
                                )
                            }
                            <small className='date-comment'> {this.props.date.substr(0, 10)}</small>
                            <div className='msg-comment'>{this.props.message}</div>
                        </div>
                    </div>
                </div>

                <div align="right" className="col-2">
                    { this.props.currentUser !== null && this.props.currentUser.id === this.props.author.id &&
                        this.props.currentUser.role !== 'ADMIN' ?
                        (
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={this.props.onDelete}
                            >DELETE</button>
                        ) : ( <div/> )
                    }
                    { this.props.currentUser !== null && this.props.currentUser.role === 'ADMIN' ?
                        (

                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={this.props.onDelete}
                            >DELETE</button>
                        ) : ( <div/> )
                    }
                </div>
            </div>
        )
    }
}

export default CommentOfList;