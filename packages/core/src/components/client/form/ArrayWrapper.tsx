import { ArrayWrapperProps } from '@autoform/react';
import { Box, IconButton, Stack } from '@chakra-ui/react';
import { FC } from 'react';
import { LuPlus } from 'react-icons/lu';

export const ArrayWrapper: FC<ArrayWrapperProps> = ({
  children,
  onAddItem,
}) => {
  return (
    <Box w="full">
      <Stack gap="2">{children}</Stack>
      <IconButton onClick={onAddItem} variant="outline" mt="2">
        <LuPlus />
      </IconButton>
    </Box>
  );
};
