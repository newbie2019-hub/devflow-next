import React, { ReactNode } from 'react';

import LeftSidebar from '@/components/navigation/LeftSidebar';
import Navbar from '@/components/navigation/navbar';
import RightSidebar from '@/components/navigation/RightSidebar';

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="background-light850_dark100 relative">
      <Navbar />

      <div className="flex">
        <LeftSidebar />

        <section className="flex h-full min-h-[calc(100dvh-90px)] flex-1 flex-col overflow-y-auto px-6 pb-6 pt-20 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>

        <RightSidebar />
      </div>
    </main>
  );
};

export default RootLayout;
