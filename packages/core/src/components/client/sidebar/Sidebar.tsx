import {
  Bleed,
  For,
  Stack,
  StackProps,
  StackSeparator,
  Text,
} from '@chakra-ui/react';
import { Resources, SidebarSlots } from '../../../types';
import { SidebarLink } from './SidebarLink';
import { useAdmiNextContext } from '../../../hooks';
import { ColorModeButton } from '../../ui';
import { DashboardIcon } from '../../icons/DashboardIcon';

const DEFAULT_GROUP_NAME = 'default';

export type SidebarProps = StackProps & SidebarSlots;

export const Sidebar = ({ slots, ...props }: SidebarProps) => {
  const { routePrefix, resourcesDefinition, customPages } =
    useAdmiNextContext();
  const groupedResources = groupResource(resourcesDefinition);
  const buildHref = (key: string) => `/${routePrefix}/${key}`;
  return (
    <Stack
      flex="1"
      p={{ base: '4', md: '6' }}
      bg="bg.panel"
      borderRightWidth="1px"
      justifyContent="space-between"
      maxW="xs"
      minH="100vh"
      {...props}
    >
      <Stack gap="6" paddingTop="5px">
        <Bleed inline="4">
          <SidebarLink key="dashboard" href={`/${routePrefix}`}>
            <DashboardIcon />
            Dashboard
          </SidebarLink>
        </Bleed>
        {customPages && customPages.length > 0 && (
          <Stack gap="2">
            <Text fontWeight="medium" textStyle="sm">
              Pages
            </Text>
            <Stack gap="1">
              <For each={customPages}>
                {(page, index) => (
                  <Bleed key={index} inline="4">
                    <SidebarLink
                      key={index}
                      href={`/${routePrefix}/${page.route}`}
                    >
                      {page.title}
                    </SidebarLink>
                  </Bleed>
                )}
              </For>
            </Stack>
          </Stack>
        )}
        <Stack gap="6">
          <For each={groupedResources}>
            {([group, resources], index) => (
              <Stack key={index} gap="2">
                <Text fontWeight="medium" textStyle="sm">
                  {group == DEFAULT_GROUP_NAME ? '' : group}
                </Text>
                <Stack gap="1">
                  <For each={resources}>
                    {({ key, menuLabel, title }) => (
                      <Bleed key={key} inline="4">
                        <SidebarLink href={buildHref(key)}>
                          {menuLabel ?? title}
                        </SidebarLink>
                      </Bleed>
                    )}
                  </For>
                </Stack>
              </Stack>
            )}
          </For>
        </Stack>
      </Stack>
      <Stack gap="4" separator={<StackSeparator />}>
        {slots?.user?.()}
        <ColorModeButton />
      </Stack>
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
