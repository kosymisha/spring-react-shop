import React, { Component } from 'react';
import ContactItem from '../Contact/ContactItem';
import { getContacts } from "../../util/APIUtils";
import { Link } from 'react-router-dom';

class ContactList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        };
        this.loadContactsByCurrentUser = this.loadContactsByCurrentUser.bind(this);
    }

    loadContactsByCurrentUser() {

        getContacts()
            .then(response => {
                this.setState({
                    contacts: response
                });
            }).catch(error => {
            this.setState({
                contacts: []
            });
        });
    }

    componentDidMount() {
        this.loadContactsByCurrentUser();
    }

    render() {
        const data = this.state.contacts;
        const listData = data.map((d) =>
            <ContactItem
                contactId={d.id}
                key={d.id}
                firstName={d.firstName}
                lastName={d.lastName}
            />);
        return (
            <div className="container mb-2">
                <Link to={"/contacts/create"} className={"btn btn-secondary mt-2"}>Create new contact</Link>
                { listData }
            </div>
        )
    }
}

export default ContactList;