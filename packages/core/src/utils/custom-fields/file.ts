import { buildZodFieldConfig } from './field-config';

export const files = () =>
  buildZodFieldConfig({
    fieldType: 'files',
    customData: {
      maxFiles: 10,
      label: 'Drag and drop here to upload',
      description: '.png, .jpg up to 5MB',
    }
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
