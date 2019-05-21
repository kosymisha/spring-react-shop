import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ContactItem.css';

class ContactItem extends Component {
    render() {
        let avatarLetters = {};
        if (this.props.lastName[0] !== undefined) avatarLetters = this.props.firstName[0] + this.props.lastName[0];
        else avatarLetters = this.props.firstName[0];
        return (
            <Link to={"/contacts/" + this.props.contactId}>
                <div className="row mt-2">
                    <div className="col-1">
                        {/*<img src="..." className="mr-3" alt="..." />*/}
                        <div className="text-avatar">
                            <span>{avatarLetters}</span>
                        </div>
                    </div>
                    <div className="col" >
                        <p>{this.props.firstName} {this.props.lastName}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

export default ContactItem;