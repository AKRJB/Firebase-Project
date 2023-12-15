import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/FirebaseContext';

const Listing = () => {
    const {createListing} = useFirebase();
    const [name, setName] = useState("");
    const [isbn, setIsbn] = useState("");
    const [price, setPrice] = useState("");
    const [cover, setCover] = useState("");

    const handleSubmit = async(e) => {
      e.preventDefault();
      await createListing(name, isbn, price, cover)
    }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Book Name</Form.Label>
            <Form.Control type="text"
            placeholder="Enter book name"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ISBN</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Enter ISBN Number"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Enter book price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cover Pic</Form.Label>
            <Form.Control 
            type="file" 
            onChange={(e) => setCover(e.target.files[0])}
            />
        </Form.Group>
        <Button variant="primary" type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default Listing
