import React from 'react';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '../../ui/file-upload';
import { AutoFormFieldProps } from '@autoform/react';

export const FileUploadField: React.FC<AutoFormFieldProps> = ({
  inputProps,
}) => {
  return (
    <FileUploadRoot
      maxW="xl"
      alignItems="stretch"
      maxFiles={10}
      {...inputProps}
    >
      <FileUploadDropzone
        label="Drag and drop here to upload"
        description=".png, .jpg up to 5MB"
      />
      <FileUploadList />
    </FileUploadRoot>
  );
};
