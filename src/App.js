import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Container, Form, Modal, Navbar } from "react-bootstrap";

function App() {
  const [token, setToken] = React.useState(null);
  const [repository, setRepository] = React.useState(null);
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="Nav">
          <Navbar.Brand href="/">My Photohub 📸</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {repository ? `Using repository ${repository}` : `Not signed in `}
              <Button
                variant="outline-success"
                onClick={(e) => {
                  e.preventDefault();
                  setShow(true);
                }}
              >
                GitHub Login
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="App">
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>GitHub Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>GitHub Token</Form.Label>
                <Form.Control type="text" id="token" autoFocus />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Repository (username/repository_name)</Form.Label>
                <Form.Control type="text" id="repo" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShow(false);
              }}
            >
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => {
                if (document.getElementById("token").value === "") {
                  document.getElementById("token").focus();
                  return;
                }
                if (document.getElementById("repo").value === "") {
                  document.getElementById("repo").focus();
                  return;
                }
                setToken(document.getElementById("token").value);
                setRepository(document.getElementById("repo").value);
                setShow(false);
              }}
            >
              Use Credentials
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default App;
