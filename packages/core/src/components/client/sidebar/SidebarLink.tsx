import Link from 'next/link';
import { Button, ButtonProps } from '../../ui';

type Props = ButtonProps & {
  href?: string;
};

export const SidebarLink = (props: Props) => {
  const { children, href, ...buttonProps } = props;
  return (
    <Button
      variant="ghost"
      width="full"
      justifyContent="start"
      gap="3"
      color="fg.muted"
      _hover={{
        bg: 'colorPalette.subtle',
        color: 'colorPalette.fg',
      }}
      _currentPage={{
        color: 'colorPalette.fg',
      }}
      asChild
      {...buttonProps}
    >
      {href ? <Link href={href}>{children}</Link> : <>{children}</>}
    </Button>
  );
};
