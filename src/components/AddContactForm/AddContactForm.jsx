import React from 'react';
import css from './AddContactForm.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class AddContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = evt => {
    this.setState({ [evt.currentTarget.name]: evt.target.value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    let contactExists = false;

    this.props.contacts.forEach(contact => {
      if (contact.name === name) {
        contactExists = true;
      }
    });

    if (contactExists) {
      alert(`${name} is already in contacts`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.props.onSubmit(newContact);
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <label>
          Name
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label>
          Number
          <input
            type="tel"
            onChange={this.handleChange}
            value={this.state.number}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button type="submit" className={css.formbtn}>
          Add contact
        </button>
      </form>
    );
  }
}

AddContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired
};

export { AddContactForm };
