import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup,  Container, Row, Col, } from 'react-bootstrap';
import { UserButton, useAuth } from "@clerk/clerk-react";
import { useRouter } from 'next/router'
import "bootstrap/dist/css/bootstrap.min.css";
import { getToDoList, addToDo, updateToDone, addDone, getToDoItem} from "@/modules/data";
import Link from 'next/link'


function TodoListPage() {
  const {isLoaded, userId, getToken, isSignedIn} = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const router = useRouter();
  
  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value);
  };

  useEffect(() => {
    async function getValues() {
        if(userId){
            try {
                const token = await getToken({ template: "codehooks" });
                const res = await getToDoList(token,userId);
                //console.log(res)
                res.sort((a, b) => new Date(a.time) - new Date(b.time));
                return res;
            } catch (error) {
                console.error('Failed to get todos', error);
                return [];
            }
        } else return [];
        
    }
    getValues().then((res) => {
        console.log(res);
        setTodos(res);
    });
}, [isLoaded])

async function add() {
  if(newTodo && userId) {
      var item = {
          text: newTodo,
          userId: userId,
          completed: false,
          category: ""
      };
      const token = await getToken({ template: "codehooks" })
      await addToDo(token,item);
      const res = await getToDoList(token,userId);
      console.log(res)
      setTodos(res);
      setNewTodo("");
      //console.log("todos.js add res: " + item);
  }
}

const substring = (text) => {
  if (text.length  > 50) {
      return text.substr(0,50) + "..."
  }
  else {
    return text
  }
};
  
const onFormSubmit = e => {
  e.preventDefault();
  // send state to server with e.g. `window.fetch`
}

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // if(!userId) {
  //   router.push('/')
  // }
  if (!isLoaded) return <>Loading...</>;
    else if (isLoaded && !isSignedIn) router.push("/");
    else {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Col>
          <h1 className="display-3 font-weight-bold" > <UserButton className="float-right">
            </UserButton> Your never-ending to-do List! </h1>
          <hr className="hr-light" />
           
          <Form onSubmit={add}>
            <Form.Group controlId="newTodo">
              <Form.Control
                type="text"
                value={newTodo}
                onChange={handleNewTodoChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="mt-3">
              Add Todo task
            </Button>
          </Form>

          <ListGroup className="mt-3">
            {todos.map((todo, index) => (
              <ListGroup.Item key={index} className={todo.completed ? "completed" : ""}>
                {substring(todo.text)}
                <Link href={`/todo/${todo._id}`}><button className="float-right ms-2">More info</button></Link>
                <Button
                  variant="success"
                  className="float-right ms-2"
                  onClick={async () => {
                    const token = await getToken({ template: "codehooks" })
                    await updateToDone(token,userId, todo._id)
                    router.push("/done")
                  }
                  }
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
}

export default TodoListPage;