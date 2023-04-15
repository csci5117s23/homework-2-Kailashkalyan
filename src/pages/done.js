import React, { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  return (
    <div className="container mt-5">
      <h1>My To-Do List</h1>

      <Form onSubmit={handleNewTodoSubmit}>
        <Form.Group controlId="newTodo">
          <Form.Label>Add a new item to your to-do list:</Form.Label>
          <Form.Control type="text" value={newTodo} onChange={handleNewTodoChange} />
        </Form.Group>
        <Button variant="primary" type="submit">Add Item</Button>
      </Form>

      <hr />

      <h2>My To-Do List:</h2>

      <ListGroup>
        {todos.map((todo, index) => (
          <ListGroup.Item key={index}>{todo}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default TodoListPage;