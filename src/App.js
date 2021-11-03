/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MainLayout from './features/chat/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Container>
      <Row>
        <div className="App">
          <MainLayout />
        </div>
      </Row>
    </Container>

  );
}

export default App;
