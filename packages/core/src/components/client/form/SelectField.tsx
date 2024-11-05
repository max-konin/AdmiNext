import React from 'react';
import { AutoFormFieldProps } from '@autoform/react';
import { SelectItem, SelectRoot, SelectTrigger } from '../../ui';
import { createListCollection, SelectContent } from '@chakra-ui/react';

export const SelectField: React.FC<AutoFormFieldProps> = ({ field }) => {
  const collection = createListCollection({
    items: (field.options || []).map(([key, label]) => ({ label, value: key })),
  });
  return (
    <SelectRoot collection={collection}>
      <SelectTrigger>Select</SelectTrigger>
      <SelectContent>
        {collection.items.map(({ label, value }) => (
          <SelectItem key={value} item={label}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
