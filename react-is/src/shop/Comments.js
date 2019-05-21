import React, {Component} from 'react';
import { createShopComment, getShopComments, deleteComment } from "../util/CommentsRequests";
import { Link } from 'react-router-dom';
import Alert from 'react-s-alert';
import CommentOfList from "./CommentOfList";

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
        getShopComments(this.props.shopId)
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
        createShopComment(this.props.shopId, comment).then(response => {
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

export default Comments