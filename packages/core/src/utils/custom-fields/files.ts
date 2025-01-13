import { FilesInput } from '../../types';
import { buildZodFieldConfig } from './field-config';

export const files = (input: FilesInput) =>
  buildZodFieldConfig({
    fieldType: 'files',
    customData: input
  });

export const transformFiles = (fileList?: FileList | null) => {
  if (!fileList) return [];
  return Array.from(fileList).map(
    (fileData: any) =>
      new File([fileData], fileData.name, {
        type: fileData.type,
        lastModified: fileData.lastModified,
      })
  );
};
