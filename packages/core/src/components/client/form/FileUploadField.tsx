import React from 'react';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '../../ui/file-upload';
import { AutoFormFieldProps } from '@autoform/react';
import { FilesFieldConfig } from '../../../types';
import { Controller } from 'react-hook-form';
import { convertFileToSerializableObject } from '../../../utils';

export const FileUploadField: React.FC<AutoFormFieldProps> = ({
  inputProps,
  field,
  control,
}) => {
  const { key, name, ...rest } = inputProps;
  const { maxFiles, label, description, accept } = field.fieldConfig
    ?.customData as FilesFieldConfig;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FileUploadRoot
          maxW="xl"
          alignItems="stretch"
          maxFiles={maxFiles}
          key={key}
          accept={accept}
          onFileChange={({ acceptedFiles }) => {
            field.onChange(acceptedFiles.map(convertFileToSerializableObject));
          }}
          {...rest}
        >
          <FileUploadDropzone label={label} description={description} />
          <FileUploadList clearable />
        </FileUploadRoot>
      )}
    />
  );
};
