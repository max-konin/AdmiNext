import { Box, Button, HStack, Stack } from '@chakra-ui/react';
import { Resource } from '../../../types';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../ui/breadcrumb';
import Link from 'next/link';
import { ResourceTable } from '../table';
import { PlusIcon } from '../../icons/PlusIcon';

export type ResourceListViewProps<
  TPK,
  TListFields extends string,
  TListData extends { [k in TListFields]: unknown },
> = {
  routePrefix: string;
  resource: string;
  loaderData: { data: TListData[] };
  resourceDef: Resource<TPK, TListFields, TListData, any, any, any, any, any>;
};

export const ResourceListView = <
  TPK,
  TListFields extends string,
  TListData extends { [k in TListFields]: unknown },
>({
  loaderData: { data },
  resourceDef,
  routePrefix,
  resource,
}: ResourceListViewProps<TPK, TListFields, TListData>) => {
  return (
    <Stack gap={4}>
      <HStack justifyContent="space-between">
        <BreadcrumbRoot>
          <BreadcrumbLink asChild>
            <Link href={`/${routePrefix}`}>Home</Link>
          </BreadcrumbLink>
          <BreadcrumbCurrentLink>{resourceDef.title}</BreadcrumbCurrentLink>
        </BreadcrumbRoot>
        <Box>
          <Button asChild>
            <Link href={`/${routePrefix}/${resource}/new`}>
              <PlusIcon />
              New
            </Link>
          </Button>
        </Box>
      </HStack>

      <ResourceTable
        resourceDef={resourceDef}
        data={data}
        routePrefix={routePrefix}
        resource={resource}
      />
    </Stack>
  );
};
