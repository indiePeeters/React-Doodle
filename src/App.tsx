import React from 'react';
import './App.css';
import CreateDailyUpdatePage from "./Components/CreateDailyUpdatePage";

//React-bootstrap
import Navbar  from 'react-bootstrap/Navbar';
import NavbarBrand  from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';

const App: React.FC = () => {

  var files;
  function OnFileUploaded(uploadedFiles : Array<File>){
    files = uploadedFiles;
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <NavbarBrand href="#home">Indie's message hub</NavbarBrand>
      </Navbar>
      <Container>
        <CreateDailyUpdatePage />
      </Container>
    </div>
  );
}

export default App;
