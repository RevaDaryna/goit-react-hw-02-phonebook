import React from 'react';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactList } from './ContactList/ContactList';
import { Title } from './Title/Title';
import { Filter } from './Filter/Filter';
import { NotificationMessage } from 'components/NotificationMessage/NotificationMessage';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  handleOnSubmit = e => {
    this.setState(prevState => ({
      contacts: [e, ...prevState.contacts],
    }));
  };

  filteredContacts = e => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    return (
      <>
        <Title title="Phonebook" />
        <AddContactForm onSubmit={this.handleOnSubmit} contacts={this.state.contacts} />
        <Title title="Contacts" />
        {this.state.contacts.length !== 0 ? (
          <>
            <Filter
              value={this.state.filter}
              onChange={this.changeFilter}
              contacts={this.state.contacts}
            />
            <ContactList
              contacts={this.filteredContacts()}
              onDelete={this.deleteContact}
            />
          </>
        ) : (
          <NotificationMessage />
        )}
        
      </>
    )
  }
}

export { App };
