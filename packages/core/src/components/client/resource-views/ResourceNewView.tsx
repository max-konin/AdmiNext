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
import { useRouter } from 'next/navigation';
import { useServerActionWithToast } from '../../server/use-server-action-with-toast';
import { delay } from './lib';

export type ResourceNewViewProps = {
  routePrefix: string;
  loaderData: { data: any };
  resourceDef: Resource<any, any, any, any, any, any, any, any>;
  resource: string;
};

export const ResourceNewView = ({
  routePrefix,
  resourceDef,
  resource,
}: ResourceNewViewProps) => {
  const pageDefinition = resourceDef.pages.new!;
  const router = useRouter();

  const { execute } = useServerActionWithToast({
    fn: async (data) => {
      await pageDefinition.actions.submit({ data });
    },
    onSuccess: async () => {
      await delay(2000);
      router.push(`/${routePrefix}/${resource}`);
    },
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
        <BreadcrumbCurrentLink>new</BreadcrumbCurrentLink>
      </BreadcrumbRoot>
      <Heading>New Record</Heading>
      <Card.Root>
        <Card.Body>
          <AutoForm
            withSubmit
            schema={new ZodProvider(pageDefinition.schema)}
            onSubmit={execute}
            defaultValues={{}}
          />
        </Card.Body>
      </Card.Root>
    </Stack>
  );
};
