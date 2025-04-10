import { Box } from '@chakra-ui/react';
import { Button, MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../ui';
import { useRouter } from 'next/navigation';
import { useServerActionWithToast } from '../../../hooks/use-server-action-with-toast.hook';
import { EllipsisVerticalIcon } from '../../icons/EllipsisVerticalIcon';
import { SquarePenIcon } from '../../icons/SquarePenIcon';
import { Trash2Icon } from '../../icons/Trash2Icon';

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
        <Button variant="ghost" data-testid="actions-menu">
          <EllipsisVerticalIcon />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value={DefaultActions.EDIT} cursor="pointer">
          <SquarePenIcon />
          <Box flex={1}>Edit</Box>
        </MenuItem>
        {deleteItem && (
          <MenuItem
            value={DefaultActions.DELETE}
            cursor="pointer"
            data-testid="delete-item"
          >
            <Trash2Icon />
            <Box flex={1}>Delete</Box>
          </MenuItem>
        )}
      </MenuContent>
    </MenuRoot>
  );
};
