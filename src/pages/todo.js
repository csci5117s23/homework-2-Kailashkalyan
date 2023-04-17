export default function todo() {
    return (
        <Container className='d-flex justify-content-center align-items-center'>
          <div>
          <h1 className="display-3 font-weight-bold">Wrong Endpoint!</h1>
          <hr className="hr-light"/>
          </div>
          <div className='ms-2'>
          <Button type='button' href="/todos">Back to the to-do list?</Button>
          </div>
        </Container>
      );
  }