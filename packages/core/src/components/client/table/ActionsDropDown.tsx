import { Box } from '@chakra-ui/react';
import { Button, MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../ui';
import { LuMoreVertical, LuPenSquare } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { useServerActionWithToast } from '../../../hooks/use-server-action-with-toast.hook';

export type ActionsDropDownProps = {
  resource: string;
  routePrefix: string;
  resourceId: string;
  deleteItem?: (id: string) => Promise<void>;
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

  const [executeDelete] = useServerActionWithToast({
    fn: async () => {
      if (deleteItem) {
        await deleteItem(resourceId);
      }
    },
    onSuccess: async () => {
      router.refresh();
    },
    successMessage: { description: 'Record deleted' },
    errorMessage: { description: 'Failed to delete record' },
    loadingMessage: { title: 'Deletion' },
  });

  const handleMenuItemSelect = async (value: string) => {
    switch (value) {
      case DefaultActions.EDIT:
        router.push(`/${routePrefix}/${resource}/${resourceId}/edit`);
        return;
      case DefaultActions.DELETE:
        executeDelete(resourceId);
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
        {deleteItem && (
          <MenuItem
            value={DefaultActions.DELETE}
            cursor="pointer"
            data-testid="delete-item"
          >
            <RiDeleteBin6Line />
            <Box flex={1}>Delete</Box>
          </MenuItem>
        )}
      </MenuContent>
    </MenuRoot>
  );
};
