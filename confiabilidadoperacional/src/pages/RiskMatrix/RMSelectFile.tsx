import type { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import Dropzone from "react-dropzone";

export default function RMSelectFile({
  setFile,
  setMessage,
}: {
  setFile: (file: File) => void;
  setMessage: (message: string) => void;
}) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Access the selected file(s) via event.target.files (a FileList object)
    // For a single file input, we take the first item
    if (event.target.files) {
      setFile(event.target.files[0]);
    } else {
      setMessage("No file selected");
    }
  };
  const handleFileDrop = (acceptedFile: File[]) => {
    if (acceptedFile.length > 0) {
      setFile(acceptedFile[0]);
    } else {
      setMessage("No file selected");
    }
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control type="file" onChange={handleFileChange} />
          <Dropzone onDrop={(acceptedFile) => handleFileDrop(acceptedFile)}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Form.Label>Select CSV type file:</Form.Label>
              </div>
            )}
          </Dropzone>
        </Form.Group>
      </Form>
    </>
  );
}
