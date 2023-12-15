import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/FirebaseContext';

const BookCard = (props) => {

    const { getImageUrl } = useFirebase();
    const [url, setUrl] = useState(null);

    useEffect(() => {
        getImageUrl(props.imageURL).then(val => setUrl(val));
    }, [props.imageUrl])
  return (
    <div>
        <Card style={{ width: '18rem', margin: "12px" }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                This book has a title {props.name} and this book sold by {props.displayName} and this book costs Rs. {props.price}
                </Card.Text>
                <Button variant="primary">View Details</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default BookCard