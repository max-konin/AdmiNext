import { FC } from 'react';
import { ArrayElementWrapperProps } from '@autoform/react';
import { Box, HStack, IconButton } from '@chakra-ui/react';
import { LuTrash } from 'react-icons/lu';

export const ArrayElementWrapper: FC<ArrayElementWrapperProps> = ({
  children,
  onRemove,
}) => {
  return (
    <Box
      p="2"
      borderWidth="1px"
      borderColor="border.disabled"
      color="fg.disabled"
    >
      <HStack gap="4">
        {children}
        <IconButton onClick={onRemove} size="sm" variant="ghost">
          <LuTrash />
        </IconButton>
      </HStack>
    </Box>
  );
};
