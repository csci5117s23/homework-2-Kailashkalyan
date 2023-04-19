import Link from 'next/link'
import { Badge, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserButton, useAuth } from "@clerk/clerk-react";
import { useRouter } from 'next/router'


export default function _404() {
  const {isLoaded, userId, getToken, isSignedIn} = useAuth();
  const router = useRouter();

  if (!isLoaded) return <>Loading...</>;
  else if (isLoaded && !isSignedIn) router.push("/");
  else {
    return (
        <Container className='d-flex justify-content-center align-items-center'>
          <div>
          <h1 className="display-3 font-weight-bold">Site not found</h1>
          <hr className="hr-light"/>
          </div>
          <div className='ms-2'>
          <Button type='button' href="/todos">Back to the to-do list?</Button>
          </div>
        </Container>
      );
    }
  }

