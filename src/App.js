import React from 'react';
import { MainLayout } from './features/chat/Chat';
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Container>
      <Row>
         <div className="App">
        <MainLayout />
    </div></Row>
      
    </Container>
    
  );
}

export default App;
