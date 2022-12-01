import React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import NavigationBar from './NavigationBar';
import AuthDialog from './AuthDialog';
import UploadInterface from './UploadInterface';
import ProjectForm from './ProjectForm';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  minWidth: '50%',
}));

function App() {
  const [token, setToken] = React.useState(null);
  const [repository, setRepository] = React.useState(null);
  const [show, setShow] = React.useState(true);
  const isAuthorized = token && repository;

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
      <Stack direction={'row'}>
        <Item>
          <UploadInterface isAuthorized={isAuthorized} />
        </Item>
        <Item>
          <ProjectForm />
        </Item>
      </Stack>
    </>
  );
}

export default App;
