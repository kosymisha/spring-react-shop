import React, {Component} from 'react';
import { createAdvertComment, getAdvertComments, deleteComment } from "../util/CommentsRequests";
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import './Advert.css'

class Comments extends Component {

    constructor (props) {
        super(props);
        this.state = {
            message: '',
            comments: [],
            isLoad: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadComments = this.loadComments.bind(this);
    }

    componentDidMount() {
        this.loadComments();
    }

    loadComments () {
        getAdvertComments(this.props.advertId)
            .then(response => {
                console.log(response.data);
                this.setState({
                    comments: response.data,
                    isLoad: true
                });
            })
            .catch(errors => {
                this.setState({
                    errors: errors
                });
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

    handleSubmit (event) {
        event.preventDefault();
        let comment = {
            message: this.state.message
        };
        createAdvertComment(this.props.advertId, comment).then(response => {
            console.log(response);
            this.setState(state => {
                state.comments.unshift(response.data);
                return {};
            });
        });
    }

    async handleDeleteComment (i) {
        console.log(i);
        await deleteComment(i);
        await this.loadComments()
    };

    render() {
        let comments = this.state.comments;
        let commentsList = comments.map((comment) =>
            <CommentOfList
                key={comment.id}
                id={comment.id}
                message={comment.message}
                date={comment.date}
                author={comment.author}
                onDelete={() => this.handleDeleteComment(comment.id)}
                currentUser={this.props.currentUser}
            />
        );
        return (
            <div className="row mt-5">
                <div className="col">
                    <div id="comm"><h5>Comments</h5>
                        {
                            this.props.authenticated ? (
                                <div className="input-group input-group-sm mb-3">
                                    <input type="text" id="comBox" maxLength="200" name="message"
                                           className="form-control" placeholder="Input your comment"
                                           aria-label="Recipient's username" aria-describedby="button-addon2"
                                           value={this.state.message}
                                           onChange={this.handleInputChange}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary"
                                                type="button" id="button-addon2"
                                                onClick={this.handleSubmit}
                                        >Send</button>
                                    </div>
                                </div>
                            ) : ( <div/> )
                        }
                        {
                            this.state.isLoad ? (
                                commentsList
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
            </div>
        );
    }
}

export default Comments;

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