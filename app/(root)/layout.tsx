import React, { ReactNode } from 'react';

import Navbar from '@/components/navigation/navbar';

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default RootLayout;
