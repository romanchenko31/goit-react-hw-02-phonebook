import { Component } from 'react';
import Form from './Form/Form.jsx';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter.jsx';
import ContactList from './ContactList/ContactList.jsx';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Her Kne', number: '443-89-12' },
    ],
    filter: '',
  };

  addTodo = (name, number) => {
    const todo = {
      id: nanoid(),
      name,
      number,
    };

    const repeatNames = this.state.contacts.find(value => {
      if (value.name === todo.name) {
        return value;
      }
      return !value;
    });

    if (repeatNames) {
      alert(`${todo.name} уже есть телефонной книге`);
      this.setState(prevState => ({
        contacts: prevState.contacts,
      }));
    } else {
      this.setState(prevState => ({
        contacts: [todo, ...prevState.contacts],
      }));
    }
  };
  onRemove = e => {
    this.setState({
      contacts: this.state.contacts.filter(
        value => value.name !== e.currentTarget.name
      ),
    });
  };

  onChangeFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  render() {
    const filterTodo = this.state.contacts.filter(value =>
      value.name.toUpperCase().includes(this.state.filter.toUpperCase())
    );

    return (
      <>
        <h2 style={{ textAlign: 'center' }}>Phonebook</h2>
        <Form onSubmit={this.addTodo} />
        <h2 style={{ textAlign: 'center' }}>Contacts</h2>
        <p style={{ margin: 0, textAlign: 'center' }}>Search contact</p>
        <Filter onChange={this.onChangeFilter} value={this.state.filter} />
        <ContactList onRemove={this.onRemove} filterTodo={filterTodo} />
      </>
    );
  }
}

export default App;
