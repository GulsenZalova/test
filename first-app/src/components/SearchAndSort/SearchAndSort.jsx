import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function SearchAndSort({data,setMyData, copy, setCopy}) {
  const [search,setSearch]=useState("")
  const [original,setOriginal]=useState(data)
  // const myDatas=[...data]
  const handleSearch=(e)=>{
    // setSearch(e.target.value)
    console.log(search)
   
        let filteredData=copy.filter(x=>x.name.trim().toLowerCase().includes(e.target.value.trim().toLowerCase()))
        setMyData([...filteredData])
     
  }
  return (
    <Form >
       <Container>
       <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Control
            required
            placeholder='search...'
            type="text"
            onChange={(e)=>handleSearch(e)}
            defaultValue={search}
          />
          <Button type="button">Sort Course</Button>
        </Form.Group>
      </Row>
       </Container>
    </Form>
  );
}

export default SearchAndSort;