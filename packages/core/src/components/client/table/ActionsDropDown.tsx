import { Box } from '@chakra-ui/react';
import { Button, MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../../ui';
import { LuMoreVertical, LuPenSquare } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

export type ActionsDropDownProps = {
  resource: string;
  routePrefix: string;
  resourceId: string;
};

const DefaultActions = {
  EDIT: 'edit',
} as const;

export const ActionsDropDown = ({
  resource,
  routePrefix,
  resourceId,
}: ActionsDropDownProps) => {
  const router = useRouter();

  const handleMenuItemSelect = (value: string) => {
    switch (value) {
      case DefaultActions.EDIT:
        router.push(`/${routePrefix}/${resource}/${resourceId}/edit`);
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
      </MenuContent>
    </MenuRoot>
  );
};
