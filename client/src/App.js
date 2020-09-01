import React, { useEffect, useState } from 'react';
import {
  getAll,
  getById,
  deleteById,
  update,
  create,
} from './services/contact';

function App() {
  const [book, setBook] = useState([]);
  const [name, setName] = useState();
  const [number, setNumber] = useState();

  const fetch = async () => {
    const { data } = await getAll();
    setBook(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleDelete = (e) => {
    deleteById(e.target.id);
    fetch();
  };

  const handleSubmit = async () => {
    await create({
      name,
      number,
    });
    fetch();
  };

  return (
    <div className='App'>
      <h1>Phone Book</h1>
      <ul>
        {book.map((contact) => (
          <li key={contact.id}>
            {contact.name} {contact.number}{' '}
            <button id={contact.id} onClick={handleDelete}>
              delete
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='name'
        />
        <input
          onChange={(e) => setNumber(e.target.value)}
          type='text'
          placeholder='number'
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default App;
