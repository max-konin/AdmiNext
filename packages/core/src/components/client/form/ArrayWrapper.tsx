import { ArrayWrapperProps } from '@autoform/react';
import { Box, IconButton, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { PlusIcon } from '../../icons/PlusIcon';

export const ArrayWrapper: FC<ArrayWrapperProps> = ({
  children,
  onAddItem,
}) => {
  return (
    <Box w="full">
      <Stack gap="2">{children}</Stack>
      <IconButton onClick={onAddItem} variant="outline" mt="2">
        <PlusIcon />
      </IconButton>
    </Box>
  );
};
