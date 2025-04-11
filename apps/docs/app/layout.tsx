import type { Metadata } from 'next';
import { Footer, Layout, Link, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import type { FC, ReactNode } from 'react';
import 'nextra-theme-docs/style.css';

export const metadata: Metadata = {
  description: 'Make admin panels easy.',
  keywords: ['Next.js', 'React', 'JavaScript', 'Admin Dashboard'],
  generator: 'Next.js',
  applicationName: 'AdmiNext',
  appleWebApp: {
    title: 'AdmiNext - Admin Dashboard for Next.js application',
  },
  title: {
    default: 'AdmiNext - Admin Dashboard for Next.js application',
    template: '%s | AdmiNext',
  },
};
const navbar = (
  <Navbar
    logo={
      <span style={{ fontWeight: 'bold' }} className="text-xl font-bold">
        AdmiNext
      </span>
    }
    projectLink="https://github.com/max-konin/AdmiNext"
  />
);
const footer = (
  <Footer className="flex-col items-center md:items-start">
    <p className="mt-6 text-xs">
      © {new Date().getFullYear()} The AdminNext Project.
    </p>
  </Footer>
);

const RootLayout: FC<{
  children: ReactNode;
}> = async ({ children }) => {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/max-konin/AdmiNext/tree/main/docs"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
