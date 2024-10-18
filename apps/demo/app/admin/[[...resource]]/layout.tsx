import { Providers } from './providers';

export default function AdminLayoyt({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Providers>{children}</Providers>;
}
