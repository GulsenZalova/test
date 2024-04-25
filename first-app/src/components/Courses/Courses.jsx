import React from 'react'
import Course from '../Course/Course'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Courses({data,setMyData}) {
  return (
    <Container className='mt-5'>
       <Row>
           {
                data && data.map((element,idx)=>(
                    <Col key={idx}><Course data={data} setMyData={setMyData} element={element}/></Col>
                ))
           }           
       </Row>
    </Container>
  )
}

export default Courses
