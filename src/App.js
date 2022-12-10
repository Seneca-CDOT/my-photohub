import React, { useState } from 'react';
import { Stack, Paper, styled } from '@mui/material';

import NavigationBar from './NavigationBar';
import AuthDialog from './AuthDialog';
import UploadInterface from './UploadInterface';
import ProjectForm from './ProjectForm';
import { githubUpload } from './github-upload';
import toast, { Toaster } from 'react-hot-toast';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  minWidth: '50%',
}));

function App() {
  const [token, setToken] = useState(null);
  const [repository, setRepository] = useState(null);
  const [show, setShow] = useState(true);
  const isAuthorized = token && repository && true;

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
          <UploadInterface
            isAuthorized={isAuthorized}
            uploadFile={(file) => {
              let loadId = toast.loading('Uploading Image...');
              githubUpload(token, repository, file)
                .then(() => {
                  toast.dismiss(loadId);
                  toast.success('Image uploaded successfully!');
                })
                .catch((e) => {
                  toast.dismiss(loadId);
                  toast.error('Image upload failed!');
                  console.error(e);
                });
            }}
          />
        </Item>
        <Item>
          <ProjectForm />
        </Item>
      </Stack>
      <Toaster position="bottom-left" />
    </>
  );
}

export default App;
