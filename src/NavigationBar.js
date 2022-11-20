import { Button, Container, Navbar } from "react-bootstrap";

export default function NavigationBar({
  isAuthorized,
  repository,
  requestAuthDialog,
}) {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="Nav">
          <Navbar.Brand href="/">My Photohub 📸</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {isAuthorized
                ? `Using repository ${repository} `
                : `Not signed in `}
              &nbsp;&nbsp;
              <Button
                variant="outline-success"
                onClick={(e) => {
                  e.preventDefault();
                  requestAuthDialog();
                }}
              >
                GitHub Authentication
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
