import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Course({element,data,setMyData}) {
    const handleDelete=()=>{
        let filteredData=data.filter(x=>x.id!==element.id)
        setMyData(filteredData)
    }
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={element.img} />
    <Card.Body>
      <Card.Title>{element.name}</Card.Title>
      <Card.Text>
        ${element.price}
      </Card.Text>
      <Button variant="danger" onClick={()=>handleDelete()}>Delete</Button>
    </Card.Body>
  </Card>
  )
}

export default Course
