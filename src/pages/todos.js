import React, { useState } from 'react';
import { Button, Form, ListGroup,  Container, Row, Col, } from 'react-bootstrap';
import { UserButton, useAuth } from "@clerk/clerk-react";
import { useRouter } from 'next/router'
import "bootstrap/dist/css/bootstrap.min.css";

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const router = useRouter();
  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };
  
  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = true;
    setTodos(newTodos);
  };

  const {isLoaded, userId} = useAuth();
  if(!isLoaded) return <>Loading...</>
  if(!userId) router.push('/');

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <h1 className="display-3 font-weight-bold" > <UserButton className="float-right">
            </UserButton> Your never-ending to-do List! </h1>
          <hr className="hr-light" />
           
          <Form onSubmit={handleNewTodoSubmit}>
            <Form.Group controlId="newTodo">
              <Form.Control
                type="text"
                value={newTodo}
                onChange={handleNewTodoChange}
                required
              />
            </Form.Group>
            <Button variant="primary" className="mt-3" type="submit">
              Add Todo task
            </Button>
          </Form>

          <ListGroup className="mt-3">
            {todos.map((todo, index) => (
              <ListGroup.Item key={index} className={todo.completed ? "completed" : ""}>
                {todo}
                <Button
                  variant="success"
                  className="float-right ms-2"
                  onClick={() => handleDelete(index)}
                >Done!
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoListPage;