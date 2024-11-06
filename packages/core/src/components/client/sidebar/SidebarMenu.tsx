import { Stack } from '@chakra-ui/react';
import { NavGroup } from './NavGroup';
import { NavItem } from './NavItem';
import { Resources } from '../../../types';

const DEFAULT_GROUP_NAME = 'default';

export type SidebarMenuProps = {
  routePrefix: string;
  resourcesDefinition: Resources;
};

export const SidebarMenu = ({
  resourcesDefinition,
  routePrefix,
}: SidebarMenuProps) => {
  const groupedResources = groupResource(resourcesDefinition);

  const buildHref = (key: string) => `/${routePrefix}/${key}`;

  return (
    <Stack gap="2">
      {groupedResources.map(([group, resources]) => (
        <NavGroup key={group} label={group == DEFAULT_GROUP_NAME ? '' : group}>
          {resources.map(({ key, menuLabel, title }) => (
            <NavItem
              key={key}
              label={menuLabel ?? title}
              href={buildHref(key)}
            />
          ))}
        </NavGroup>
      ))}
    </Stack>
  );
};

const groupResource = (resources: Resources) => {
  return Object.entries(
    Object.entries(resources).reduce(
      (acc, [key, resource]) => {
        const group = resource.group || DEFAULT_GROUP_NAME;
        if (!acc[group]) acc[group] = [];
        acc[group].push({ key, ...resource });
        return acc;
      },
      {} as Record<string, (Resources[string] & { key: string })[]>
    )
  ).sort(([groupA], [groupB]) =>
    groupA == DEFAULT_GROUP_NAME
      ? -1
      : groupB == DEFAULT_GROUP_NAME
        ? 1
        : groupA.localeCompare(groupB)
  );
};
