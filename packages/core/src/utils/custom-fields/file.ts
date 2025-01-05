import { buildZodFieldConfig } from './field-config';

export const files = () =>
  buildZodFieldConfig({
    fieldType: 'files',
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
