import React, { useRef, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileUploader } from 'react-drag-drop-files';
import { Alert, Button, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Octokit } from '@octokit/rest';
import getUser from './worker/functions/get-user';
import createRepo from './worker/functions/create-repo';
import {
  getCurrentCommit,
  createBlobForFile,
  createNewTree,
  getPathNamesFromFile,
  createNewCommit,
  setBranchToCommit,
} from './worker/functions/commit-files';
import { createOptimizedImages } from './image-optimizer';
import loadingGif from './resource/loading-gear.gif';

const fileTypes = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

function UploadInterface({ isAuthorized, token, repository }) {
  const [images, setImages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [loading, setLoading] = useState(false);
  const imgPreviewEl = useRef(null);

  async function uploadBtnClicked() {
    setUserMessage('MyPhotoHub is validating user token...');
    setLoading(true);
    setErrorOccurred(false);

    const octokit = new Octokit({ auth: token });
    let username, repoCreated;
    try {
      username = await getUser(octokit);
    } catch (err) {
      console.error('Invalid PAT token');
      setUserMessage('Sorry, could not find a user with the token');
      setErrorOccurred(true);
      setLoading(false);
      return;
    }

    setUserMessage('User validated! MyPhotoHub is creating a GitHub repository...');
    repoCreated = await createRepo(octokit, username, repository);

    if (repoCreated) {
      setUserMessage('GitHub repository has been created! Creating optimized images...');

      const convertedFiles = await createOptimizedImages(images);
      if (!convertedFiles) {
        setUserMessage('Something went wrong while converting images...');
        setLoading(false);
        return;
      }
      const pathNames = getPathNamesFromFile(convertedFiles);

      setUserMessage('Images optimized! Preparing image files for a new commit...');
      try {
        const listOfBlob = await createBlobForFile(octokit, username, repository, convertedFiles);

        const currentCommit = await getCurrentCommit(octokit, username, repository, 'main');

        const newTree = await createNewTree(
          octokit,
          username,
          repository,
          listOfBlob,
          pathNames,
          currentCommit.treeSha
        );

        setUserMessage('Now creating a commit to repo...');
        const commitMessage = 'Add my photos to repo';
        const newCommit = await createNewCommit(
          octokit,
          username,
          repository,
          commitMessage,
          newTree.sha,
          currentCommit.commitSha
        );

        await setBranchToCommit(octokit, username, repository, 'main', newCommit.sha);

        setUserMessage(
          `Process complete. You can check out https://github.com/${username}/${repository}`
        );
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErrorOccurred(true);
        setUserMessage(`Something went wrong while creating a commit`);
        console.error('Error occurred while creating a commit', err);
      }
    } else {
      console.error('Error occurred while creating a repo');
      setUserMessage('Sorry, something went wrong while creating a repository');
      setErrorOccurred(true);
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <header className="preview">
        {!userMessage ? null : loading ? (
          <Alert variant="info" style={{ width: '85%', textAlign: 'left' }}>
            <Image src={loadingGif} height="48" width="48" />
            {userMessage}
          </Alert>
        ) : !errorOccurred ? (
          <Alert variant="success" style={{ width: '85%', textAlign: 'left' }}>
            {userMessage}
          </Alert>
        ) : (
          <Alert variant="warning" style={{ width: '85%', textAlign: 'left' }}>
            {userMessage}
          </Alert>
        )}
        <img
          ref={imgPreviewEl}
          className={`img-preview ${!images && 'd-none'}`}
          style={{ display: 'block' }}
          alt="Selected file preview"
        />
        <p>Drag and Drop or Click to Upload Images</p>
        <FileUploader
          name="file"
          accept={fileTypes}
          types={fileTypes}
          multiple={true}
          classes="Drop-zone"
          handleChange={(files) => {
            setImages(files);
            const reader = new FileReader();
            reader.onload = (e) => {
              imgPreviewEl.current.src = e.target.result;
            };
            reader.readAsDataURL(files[0]);
            imgPreviewEl.current.title = files[0].name;
          }}
          label={'Upload or drop a file right here'}
        />
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled">
              {!images
                ? 'Select Image to Upload'
                : !isAuthorized
                ? 'Add Token and Repository'
                : 'Click to Upload'}
            </Tooltip>
          }
          placement="bottom"
        >
          <span className="d-inline-block">
            <Button
              variant="success"
              className="mt-3"
              disabled={!(isAuthorized && images)}
              onClick={uploadBtnClicked}
            >
              Upload
            </Button>
          </span>
        </OverlayTrigger>
      </header>
    </div>
  );
}

UploadInterface.propTypes = {
  isAuthorized: PropTypes.bool,
  token: PropTypes.string,
  repository: PropTypes.string,
};

export default UploadInterface;
