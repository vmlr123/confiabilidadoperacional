import type { ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import Dropzone from "react-dropzone";
import Papa from "papaparse";
import type { ParseResult } from "papaparse";

export default function RMSelectFile({
  setMessage,
  setMatrixData,
}: {
  setMessage: (message: string) => void;
  setMatrixData: (data: Record<string, unknown>[]) => void;
}) {
  const parseData = (fileToParse: File): void => {
    Papa.parse(fileToParse, {
      complete: function (results: ParseResult<Record<string, unknown>>) {
        setMatrixData(results.data);
      },
      header: true, // Treat the first row as headers
      skipEmptyLines: true,
    });
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Access the selected file(s) via event.target.files (a FileList object)
    // For a single file input, we take the first item

    if (event.target.files) {
      parseData(event.target.files[0]);
    } else {
      setMessage("No file selected");
    }
  };
  const handleFileDrop = (acceptedFile: File[]) => {
    if (acceptedFile.length > 0) {
      parseData(acceptedFile[0]);
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
