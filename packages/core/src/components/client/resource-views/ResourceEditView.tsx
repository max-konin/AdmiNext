import {
  BreadcrumbCurrentLink,
  Card,
  Heading,
  Link,
  Stack,
} from '@chakra-ui/react';
import { Resource } from '../../../types';
import { AutoForm } from '../form';
import { BreadcrumbLink, BreadcrumbRoot } from '../../ui';
import { ZodProvider } from '@autoform/zod';

export type ResourceEditViewProps = {
  routePrefix: string;
  loaderData: { data: any };
  resourceDef: Resource<any, any, any, any, any, any, any, any>;
  resource: string;
};

export const ResourceEditView = ({
  routePrefix,
  resourceDef,
  resource,
  loaderData: { data },
}: ResourceEditViewProps) => {
  const pageDefinition = resourceDef.pages.edit!;
  const id = data[resourceDef.identityBy];

  return (
    <Stack gap={4}>
      <BreadcrumbRoot>
        <BreadcrumbLink asChild>
          <Link href={`/${routePrefix}`}>Home</Link>
        </BreadcrumbLink>
        <BreadcrumbLink asChild>
          <Link href={`/${routePrefix}/${resource}`}>{resourceDef.title}</Link>
        </BreadcrumbLink>
        <BreadcrumbCurrentLink>{id}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Heading>Edit {resourceDef.toString?.(data) ?? `#${id}`}</Heading>
      <Card.Root>
        <Card.Body>
          <AutoForm
            withSubmit
            schema={new ZodProvider(pageDefinition.schema)}
            onSubmit={(data) =>
              pageDefinition.actions.submit({
                id,
                data,
              })
            }
            defaultValues={data}
          />
        </Card.Body>
      </Card.Root>
    </Stack>
  );
};
