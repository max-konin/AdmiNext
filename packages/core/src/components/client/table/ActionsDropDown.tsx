import { Box } from '@chakra-ui/react';
import { Button, MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../ui';
import { LuMoreVertical, LuPenSquare } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

export type ActionsDropDownProps = {
  resource: string;
  routePrefix: string;
  resourceId: string;
  deleteItem: (id: string) => Promise<void>;
};

const DefaultActions = {
  EDIT: 'edit',
  DELETE: 'delete',
} as const;

export const ActionsDropDown = ({
  resource,
  routePrefix,
  resourceId,
  deleteItem,
}: ActionsDropDownProps) => {
  const router = useRouter();

  const handleMenuItemSelect = async (value: string) => {
    switch (value) {
      case DefaultActions.EDIT:
        router.push(`/${routePrefix}/${resource}/${resourceId}/edit`);
        return;
      case DefaultActions.DELETE:
        await deleteItem(resourceId);
        router.refresh();
        return;
      default:
        throw new Error(`Unknown action: ${value}`);
    }
  };
  return (
    <MenuRoot onSelect={(details) => handleMenuItemSelect(details.value)}>
      <MenuTrigger asChild>
        <Button variant="ghost">
          <LuMoreVertical />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value={DefaultActions.EDIT} cursor="pointer">
          <LuPenSquare />
          <Box flex={1}>Edit</Box>
        </MenuItem>
        <MenuItem value={DefaultActions.DELETE} cursor="pointer">
          <RiDeleteBin6Line />
          <Box flex={1}>Delete</Box>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
