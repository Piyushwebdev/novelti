import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import { Container } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
       <Container>
        <Routes>
          <Route path="/" exact element={<UserList/>} />
          <Route path="/create" element={<CreateUser/>} />
          <Route path="/edit/:id" element={<EditUser/>} />
        </Routes>
        </Container>
    </BrowserRouter>
  );
}

export default App;
