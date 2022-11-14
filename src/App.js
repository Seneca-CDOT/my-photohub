import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FileUploader } from "react-drag-drop-files";
import {
  Button,
  Container,
  Form,
  Modal,
  Navbar,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const fileTypes = ["jpg", "jpeg", "png", "bmp", "gif"];
function App() {
  const [token, setToken] = React.useState(null);
  const [repository, setRepository] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [image, setImage] = React.useState(null);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="Nav">
          <Navbar.Brand href="/">My Photohub 📸</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {repository
                ? `Using repository ${repository} `
                : `Not signed in `}
              &nbsp;&nbsp;
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
        <header className="preview">
          <img src={logo} className="App-logo" id="img-preview" alt="logo" />
          <p>Drag and Drop or Click to Upload Images</p>
          <FileUploader
            name="file"
            accept={fileTypes}
            types={fileTypes}
            multiple={false}
            classes="Drop-zone"
            handleChange={(file) => {
              setImage(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                document.getElementById("img-preview").src = e.target.result;
              };
              reader.readAsDataURL(file);
              document.getElementById("img-preview").style.display = "block";
              document.getElementById("img-preview").title = file.name;
            }}
            label={"Upload or drop a file right here"}
          />
          <OverlayTrigger
            overlay={
              <Tooltip id="tooltip-disabled">
                {!image
                  ? "Select Image to Upload"
                  : !(token && repository)
                  ? "Add Token and Repository"
                  : "Click to Upload"}
              </Tooltip>
            }
            placement="bottom"
          >
            <span className="d-inline-block">
              <Button
                variant="success"
                className="mt-3"
                disabled={!(token && image && repository)}
              >
                Upload
              </Button>
            </span>
          </OverlayTrigger>
        </header>
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
