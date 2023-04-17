import React, { useState, useEffect } from 'react';
import { Button, Form, ListGroup,  Container, Row, Col, } from 'react-bootstrap';
import { UserButton, useAuth } from "@clerk/clerk-react";
import { useRouter } from 'next/router'
import "bootstrap/dist/css/bootstrap.min.css";
import { getToDoList, addDone, updateToDo, getDone} from "@/modules/data";
import Link from 'next/link'

function DonePage() {
  const {isLoaded, userId, getToken, isSignedIn} = useAuth();
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const router = useRouter();
  

  useEffect(() => {
    async function getValues() {
        if(userId){
            try {
                const token = await getToken({ template: "codehooks" });
                const res = await getDone(token,userId);
                console.log(res)
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


const substring = (text) => {
  if (text.length  > 100) {
      return text.substr(0,100) + "..."
  }
  else {
    return text
  }
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
           
          <ListGroup className="mt-3">
            {todos.map((todo, index) => (
              <ListGroup.Item key={index}>
                {substring(todo.text)}
                <Link href={`/todo/${todo._id}`}><button className="float-right ms-2">More info</button></Link>
                <Button
                  variant="success"
                  className="float-right ms-2"
                  onClick={() => add(index)}
                >Done!
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className='ms-2'>
          <Button type='button' href="/todos">Back to the to-do list?</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
            }
}

export default DonePage;