import { useState, useEffect, useRef } from 'react';

import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import styles from './phoneBook.module.css';

const PhoneBook = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      const data = localStorage.getItem('contacts');
      const contacts = JSON.parse(data);
      if (data?.length) {
        setContacts(contacts);
      }
      firstRender.current = false;
    }
  }, []);

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = data => {
    const dublicate = contacts.find(contact => contact.name === data.name);
    if (dublicate) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(prevState => {
      const { name, number } = data;
      const newContact = {
        name,
        number,
        id: nanoid(),
      };
      return [...prevState, newContact];
    });
  };
  const deleteContact = id => {
    setContacts(prevState => contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const filterText = filter.toLowerCase();
  const filterContacts = contacts.filter(({ name }) => {
    const result = name.toLowerCase().includes(filterText);
    return result;
  });

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} changeFilter={changeFilter} />
      <ContactList contacts={filterContacts} deleteContact={deleteContact} />
    </div>
  );
};

export default PhoneBook;

// class PhoneBook extends Component {

// state = {
//     contacts: [
//         {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
//         {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
//         {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
//         {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
//     ],
//     filter: '',
// }
//     addContact = (data) => {
//         const { contacts } = this.state;
//             const dublicate = contacts.find(contact => contact.name === data.name);
//             if (dublicate) {
//                 alert(`${data.name} is already in contacts`);
//                 return
//             }
//         this.setState(prevState => {
//             const { contacts } = prevState;
//             const { name, number } = data;
//             const newContact = {
//                 name,
//                 number,
//                 id: nanoid()
//             }
//             return {
//                 contacts: [...contacts, newContact]
//             }
//         })
//     }

//     deleteContact = (id) => {
//         this.setState(prevState => {
//             const { contacts } = prevState;
//             return {
//                 contacts:  contacts.filter(contact => contact.id !== id)
//             }
//         })
//     }

//     changeFilter = ({ target }) => {
//         this.setState({
//             filter: target.value
//         })
//     }

//     getFilteredContacts() {
//         const { filter, contacts } = this.state;
//         if (!filter) {
//             return contacts
//         }
//         const filterText = filter.toLowerCase();
//         const filterContacts = contacts.filter(({ name }) => {
//             const result = name.toLowerCase().includes(filterText);
//             return result
//         })
//         return filterContacts;
//     }

//     componentDidMount () {
//         const contacts = localStorage.getItem('contacts')
//         const parsedContacts = JSON.parse(contacts)
//         if (parsedContacts) {
//             this.setState({ contacts: parsedContacts })
//         }
//     }

//     componentDidUpdate(prevProps, prevState) {
//         if (this.state.contacts !== prevState.contacts) {
//             localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//             }
//     }
//     render() {
//         const {  filter } = this.state;
//         const { addContact, deleteContact, changeFilter } = this;

//         const contacts = this.getFilteredContacts();
//         return (
//             <div className={styles.container}>
//                 <h1>Phonebook</h1>
//                 <ContactForm onSubmit={addContact} />
//                 <h2>Contacts</h2>
//                 <Filter filter={filter} changeFilter={changeFilter} />
//                 <ContactList contacts={contacts} deleteContact={deleteContact} />
//             </div>
//         )
//     }
// }
