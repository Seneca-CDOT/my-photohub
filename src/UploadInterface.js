import { useRef, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FileUploader } from "react-drag-drop-files";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const fileTypes = ["jpg", "jpeg", "png", "bmp", "gif"];

export default function UploadInterface({ isAuthorized }) {
  const [image, setImage] = useState(null);
  const imgPreviewEl = useRef(null);

  return (
    <div className="App">
      <header className="preview">
        <img
          ref={imgPreviewEl}
          className={`img-preview ${!image && "d-none"}`}
          style={{ display: "block" }}
          alt="Selected file preview"
        />
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
              imgPreviewEl.current.src = e.target.result;
            };
            reader.readAsDataURL(file);
            imgPreviewEl.current.title = file.name;
          }}
          label={"Upload or drop a file right here"}
        />
        <OverlayTrigger
          overlay={
            <Tooltip id="tooltip-disabled">
              {!image
                ? "Select Image to Upload"
                : !isAuthorized
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
              disabled={!(isAuthorized && image)}
            >
              Upload
            </Button>
          </span>
        </OverlayTrigger>
      </header>
    </div>
  );
}
