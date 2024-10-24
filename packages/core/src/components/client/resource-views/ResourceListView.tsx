import { Stack, Table, Text } from '@chakra-ui/react';
import { Resource } from '../../../types';
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from '../../ui/breadcrumb';
import Link from 'next/link';

export type ResourceListViewProps<
  TPK,
  TListFields extends string,
  TListData extends { [k in TListFields]: unknown },
> = {
  routePrefix: string;
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
    <Stack gap={2}>
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
              <Table.ColumnHeader key={key}>{f.label}</Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((d) => (
            <Table.Row key={String(d[identityBy]!)}>
              {fields.map(([key, f]) => (
                <Table.Cell key={key}>
                  {f.render?.(d[key as TListFields]) ?? (
                    <Text>{String(d[key as TListFields])}</Text>
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Stack>
  );
};
