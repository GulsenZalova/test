import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function AddForm({data,setMyData}) {
  const [courseName,setCourseName] =useState("")
  const [coursePrice,setCoursePrice] =useState(0)
  const [courseImage,setCourseImage] =useState("")
  const handleSubmit = (event) => {
   event.preventDefault()
   let newCourse={
     id:4,
     name:courseName,
     price:coursePrice,
     img:courseImage
   }
    setMyData([...data,newCourse])
    setCourseName("")
    setCoursePrice(0)
    setCourseImage("")
  };

  return (
    <Form  onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            required
            type="text"
            onChange={(e)=>setCourseName(e.target.value)}
            defaultValue={courseName}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Course Price</Form.Label>
          <Form.Control
            required
            type="text"
            defaultValue={coursePrice}
            onChange={(e)=>setCoursePrice(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Course Image</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              aria-describedby="inputGroupPrepend"
              required
              defaultValue={courseImage}
              onChange={(e)=>setCourseImage(e.target.value)}
            />
          </InputGroup>
        </Form.Group>
      </Row>

      <Button type="submit">Add Course</Button>
    </Form>
  );
}

export default AddForm;