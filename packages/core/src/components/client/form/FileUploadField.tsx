import React from 'react';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '../../ui/file-upload';
import { AutoFormFieldProps } from '@autoform/react';
import { FilesInput } from '../../../types';

export const FileUploadField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  field,
}) => {
  const { key, ...rest } = inputProps;
  const { maxFiles, label, description } = field.fieldConfig
    ?.customData as FilesInput;
  return (
    <FileUploadRoot
      maxW="xl"
      alignItems="stretch"
      maxFiles={maxFiles}
      key={key}
      {...rest}
    >
      <FileUploadDropzone label={label} description={description} />
      <FileUploadList />
    </FileUploadRoot>
  );
};
