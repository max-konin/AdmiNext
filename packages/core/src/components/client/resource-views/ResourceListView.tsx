import { Box, Button, Stack, Table, Text } from '@chakra-ui/react';
import { Resource } from '../../../types';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../ui/breadcrumb';
import Link from 'next/link';
import { LuPlus } from 'react-icons/lu';

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
  const fields = Object.entries(resourceDef.pages.list.fields) as [
    TListFields,
    {
      label: string;
      render?: (value: TListData[TListFields]) => JSX.Element;
    },
  ][];
  const identityBy = resourceDef.identityBy as TListFields;
  return (
    <Stack gap={4}>
      <BreadcrumbRoot>
        <BreadcrumbLink asChild>
          <Link href={`/${routePrefix}`}>Home</Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>{resourceDef.title}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {fields.map(([key, f]) => (
              <Table.ColumnHeader key={key} data-testid="resource-table-header">
                {f.label}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((d) => (
            <Table.Row
              key={String(d[identityBy]!)}
              data-testid="resource-table-row"
            >
              {fields.map(([key, f]) => (
                <Table.Cell
                  key={key}
                  data-testid={`resource-table-cell__${key}`}
                >
                  {f.render?.(d[key as TListFields]) ?? (
                    <Text>{String(d[key as TListFields])}</Text>
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Box>
        <Button asChild>
          <Link href={`/${routePrefix}/${resource}/new`}>
            <LuPlus />
            New
          </Link>
        </Button>
      </Box>
    </Stack>
  );
};
