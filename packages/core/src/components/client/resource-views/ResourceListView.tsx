import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ClientResourceDefinition } from '../../../utils';

export type ResourceListViewProps<
  TFields extends string,
  TData extends { [k in TFields]: unknown },
> = {
  data: TData[];
  resourceDef: ClientResourceDefinition;
};

export const ResourceListView = <
  TFields extends string,
  TData extends { [k in TFields]: unknown },
>({
  data,
  resourceDef,
}: ResourceListViewProps<TFields, TData>) => {
  const fields = Object.entries(resourceDef.pages.list.fields);
  const identityBy = resourceDef.identityBy as TFields;
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            {fields.map(([key, f]) => (
              <Td key={key}>{f.label}</Td>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((d) => (
            <Tr key={String(d[identityBy]!)}>
              {fields.map(([key, f]) => (
                <Td key={key}>
                  {f.render?.(d[key as TFields]) ?? (
                    <Text>{String(d[key as TFields])}</Text>
                  )}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
