//used professor's demo code
import Link from 'next/link'
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { UserButton, useAuth } from "@clerk/clerk-react";
import { useRouter } from 'next/router'
import { getToDoItem, updateToDo, updateToDone } from '@/modules/data';
import { Alert } from 'react-bootstrap';

export default function Viewtodo( {id}) {


  const { isLoaded, userId, isSignedIn, getToken } = useAuth();

  const [newName, setNewName] = useState("");

  const [item, setItem] = useState("")
  const [desc, setDesc] = useState("")
  const router = useRouter();
  const handleNewTodoChange = (event) => {
    setDesc(event.target.value);
  };

  useEffect(() => {
    async function process() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        const newReview = await getToDoItem(token, userId, id);
        setDesc(newReview[0].text);
        setItem(newReview[0]);  
      }
    }
    process();
  }, [isLoaded, id]);

  async function update() {
    <Alert variant="success">
        This is a success alert — check it out!
      </Alert>
    const token = await getToken({ template: "codehooks" });
    updateToDo(token,userId, id, desc)
  }

  if (!isLoaded) return <>Loading...</>;
  else if (isLoaded && !isSignedIn) router.push("/");
  else {
    return (
    
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <h1 className="display-3 font-weight-bold" > <UserButton className="float-right">
            </UserButton> Edit your to-do item <Button href="/todos" variant="info" className="float-right">
              Back to To-Do List!
            </Button> </h1> 
            
          <hr className="hr-light" />
           
          <Form>
            <Form.Group controlId="newTodo">
              <Form.Control
                as="textarea"
                value={desc}
                onChange={handleNewTodoChange}
                rows={5}
                required
              />
            </Form.Group>
            <Button variant="primary" className="mt-3" onClick={update}>
              Save
            </Button>
            <Button variant="primary" className="mt-3 ms-5" onClick={async () => {
                    const token = await getToken({ template: "codehooks" })
                    await updateToDone(token,userId, item._id)
                    router.push("/done")
                  }}>
              Done
            </Button>
            
          </Form>

        </Col>
      </Row>
    </Container>

  )}
}