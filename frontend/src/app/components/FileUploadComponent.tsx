import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, XIcon } from '@heroicons/react/outline';
import Progressbar from './Utils/Progressbar';
import UploadFileSession from '../../services/FileUploadService';

interface UploadedFileHandleProps {
  file: File;
  onRemove: () => void;
  progress: number;
}

const UploadedFileHandle: React.FC<UploadedFileHandleProps> = ({file, onRemove, progress}) => {
  return (
    <div className="bg-gray-50 px-5 py-3 shadow-md rounded-md flex items-center justify-between w-full">
      <span className="leading-none font-semibold text-gray-700">{file.name}</span>

      <span className="w-1/2 flex items-center">
        <Progressbar progress={progress * 100}/>
      </span>

      <button
        className="p-3 text-indigo-600 hover:bg-gray-200 rounded-md hover:shadow-md"
        onClick={onRemove}>
        <XIcon className="h-5 w-5"/>
      </button>
    </div>
  );
};

type UploadObject = {
  file: File;
  uploadSession: UploadFileSession;
}

interface FileUploadComponentProps {
  setUploadedFileName?: (name: string) => void;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({setUploadedFileName}) => {

  const [fileObj, setFileUploadObj] = useState<UploadObject | undefined>();
  const [progress, setProgress] = useState(0);

  const removeFile = () => {
    if (fileObj) {
      setProgress(0);
      fileObj.uploadSession.cancelUpload();
      setFileUploadObj(undefined);
    }
  };

  const uploadFile = (uploadFile: File) => {
    const updateProgress = (progress: number, _: string) =>
      setProgress(progress);
    const session = new UploadFileSession(uploadFile, updateProgress);
    setFileUploadObj({file: uploadFile, uploadSession: session});
    const uploadRequest = session.getRequestPromise();
    uploadRequest?.then(value => {
      if (setUploadedFileName) {
        setUploadedFileName(value.data);
      }
    }).catch(err => console.error(err));
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadFile(acceptedFiles[0]);
    }
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div className="">
      <div className="my-3 space-y-2">
        {
          fileObj &&
          <UploadedFileHandle
            file={fileObj.file}
            progress={progress}
            onRemove={() => removeFile()}/>
        }
      </div>
      {
        !fileObj &&
        <div
          className="bg-gray-200 hover:bg-gray-300 transition duration-200 shadow-md hover:shadow-xl p-10 rounded-lg cursor-pointer"
          {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="flex text-gray-500 space-x-3 items-center p-30">
            <UploadIcon className="h-10 w-10"/>
            <span className="leading-none font-semibold">
          {
            isDragActive ?
              'Drop the files here ...' :
              'Drag \'n\' drop some files here, or click to select files'
          }
        </span>
          </div>
        </div>
      }
    </div>
  );
};

export default FileUploadComponent;