import {
  BreadcrumbCurrentLink,
  Button,
  Card,
  Heading,
  Link,
  Stack,
} from '@chakra-ui/react';
import { Resource } from '../../../types';
import { AutoForm } from '../form';
import { BreadcrumbLink, BreadcrumbRoot } from '../../ui';
import { ZodProvider } from '@autoform/zod';
import { getSchema } from '../../../utils';
import { useRouter } from 'next/navigation';
import { useServerActionWithToast } from '../../../hooks/use-server-action-with-toast.hook';

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
  loaderData,
}: ResourceEditViewProps) => {
  const pageDefinition = resourceDef.pages.edit!;
  const id = loaderData.data[resourceDef.identityBy];
  const router = useRouter();

  const resourceTitle = resourceDef.toName
    ? resourceDef.toName(loaderData.data)
    : `#${id}`;

  const [execute] = useServerActionWithToast({
    fn: async (data) => {
      await pageDefinition.actions.submit({ data, id });
    },
    onSuccess: async () => {
      router.push(`/${routePrefix}/${resource}`);
    },
    successMessage: { title: 'Done!', description: 'Record updated' },
    errorMessage: { title: 'Error', description: 'Failed to update record' },
  });

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
      <Heading>Edit {resourceTitle}</Heading>
      <Card.Root>
        <Card.Body>
          <AutoForm
            withSubmit
            schema={
              new ZodProvider(getSchema(pageDefinition.schema, loaderData))
            }
            onSubmit={execute}
            defaultValues={loaderData.data}
          />
        </Card.Body>
      </Card.Root>
    </Stack>
  );
};
