import { AutoFormFieldProps } from '@autoform/react';
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from '../../ui/file-upload';

export const FileUploadField: React.FC<AutoFormFieldProps> = () => {
  return (
    <FileUploadRoot maxW="xl" alignItems="stretch" maxFiles={10}>
      <FileUploadDropzone
        label="Drag and drop here to upload"
        description=".png, .jpg up to 5MB"
      />
      <FileUploadList />
    </FileUploadRoot>
  );
};
