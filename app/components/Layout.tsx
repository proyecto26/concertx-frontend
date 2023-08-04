import type { PropsWithChildren } from 'react';
import React from 'react';

import Header from './ui/header/Header';
import Footer from './ui/footer/Footer';

type LayoutProps = PropsWithChildren<{
  title?: string;
}>;

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <section className="min-h-screen flex flex-col">
      <Header title={title} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </section>
  );
};

export default Layout;