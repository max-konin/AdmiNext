import { FileUploadRootProps } from '../../components/ui/file-upload';
import { FilesFieldConfig } from '../../types';
import { buildZodFieldConfig } from './field-config';

export const files = (input: FilesFieldConfig) =>
  buildZodFieldConfig({
    fieldType: 'files',
    customData: input,
  });

export const convertFileToSerializableObject = (file: File) => {
  const url = URL.createObjectURL(file);

  return {
    name: file.name,
    type: file.type,
    lastModified: file.lastModified,
    url,
  };
};

export type FileData = Awaited<
  ReturnType<typeof convertFileToSerializableObject>
>;
