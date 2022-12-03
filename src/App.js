import React from 'react';
import NavigationBar from './NavigationBar';
import AuthDialog from './AuthDialog';
import UploadInterface from './UploadInterface';

function App() {
  const [token, setToken] = React.useState(null);
  const [repository, setRepository] = React.useState(null);
  const [show, setShow] = React.useState(true);
  const isAuthorized = Boolean(token && repository);

  return (
    <>
      <NavigationBar
        isAuthorized={isAuthorized}
        repository={repository}
        requestAuthDialog={() => {
          setShow(true);
        }}
      />

      <AuthDialog show={show} setShow={setShow} setToken={setToken} setRepository={setRepository} />

      <UploadInterface isAuthorized={isAuthorized} token={token} repository={repository} />
    </>
  );
}

export default App;
