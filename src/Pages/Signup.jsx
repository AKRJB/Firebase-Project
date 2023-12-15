import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate()
    const { signUp, isLoggedIn } = useFirebase();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      if(isLoggedIn){
          navigate("/")
      }
  }, [isLoggedIn, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result  = await signUp(email, password);
        console.log('Successful', result);
    }


  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email"
         placeholder="Enter email"
         value={email}
         onChange={(e) => setEmail(e.target.value)} 
         />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
         type="password" 
         placeholder="Password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button 
      variant="primary" 
      type="submit"
      >
      Create Account
      </Button>
     </Form>
    </div>
  )
}

export default Signup
