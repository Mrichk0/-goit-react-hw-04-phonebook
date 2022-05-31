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
