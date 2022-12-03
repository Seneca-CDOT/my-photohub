import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AuthDialog({ show, setShow, setToken, setRepository }) {
  const tokenEl = useRef(null);
  const repoEl = useRef(null);

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Authenticate with GitHub</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>GitHub Token</Form.Label>
            <Form.Control type="password" ref={tokenEl} autoFocus />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Repository Name</Form.Label>
            <Form.Control type="text" ref={repoEl} />
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
            let token = tokenEl.current;
            let repo = repoEl.current;

            const validRepo = /^[a-zA-Z0-9_.-]+$/i;

            if (token.value === '') {
              token.focus();
              return;
            } else if (repo.value === '' || !repo.value.match(validRepo)) {
              repo.focus();
              return;
            }
            setToken(token.value);
            setRepository(repo.value);
            setShow(false);
          }}
        >
          Use Credentials
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AuthDialog.propTypes = {
  show: PropTypes.bool,
  setToken: PropTypes.func,
  setRepository: PropTypes.func,
  setShow: PropTypes.func,
};

export default AuthDialog;
