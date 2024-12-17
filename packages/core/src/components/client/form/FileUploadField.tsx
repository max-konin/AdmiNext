import React, { useState } from 'react';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '../../ui/file-upload';
import { AutoFormFieldProps } from '@autoform/react';

export const FileUploadField: React.FC<AutoFormFieldProps> = (props) => {
  const [files, setFiles] = useState<File[]>([]);

  console.log(props);

  const handleDrop = (event: React.DragEvent<HTMLLIElement>) => {
    const acceptedFiles = Array.from(event.dataTransfer.files);
    console.log('accepted files', acceptedFiles);
    setFiles(acceptedFiles);
    // props.inputProps.onChange({ target: { name: 'file', type: 'file' } });
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
    });
  };

  return (
    <FileUploadRoot
      maxW="xl"
      alignItems="stretch"
      maxFiles={10}
      inputProps={props.inputProps}
    >
      <FileUploadDropzone
        label="Drag and drop here to upload"
        description=".png, .jpg up to 5MB"
        onDrop={handleDrop}
      />
      <FileUploadList files={files} />
    </FileUploadRoot>
  );
};
