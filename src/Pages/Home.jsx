import React, {useEffect, useState} from 'react'
import { useFirebase } from '../context/FirebaseContext'
import BookCard from '../components/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const Home = () => {
    const [books, setBooks] = useState([]);
    const { fetchBookslist } = useFirebase();

    useEffect(() => {
        fetchBookslist().then((books) => setBooks(books.docs));
    }, []);

  return (
    <div className='container mt-5'>
        <CardGroup>
            {books.map((book) => <BookCard key={book.id} {...book.data()}/>)}
        </CardGroup>
    </div>
  )
}

export default Home