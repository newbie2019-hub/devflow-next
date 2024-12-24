'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SheetClose } from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const path = usePathname();

  return (
    <>
      {sidebarLinks.map((link) => {
        return (
          <SheetClose
            asChild
            key={link.route}
          >
            <Link
              href={link.route}
              className={cn(
                path === link.route
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900',
                'flex gap-x-4 p-4 bg-transparent items-center'
              )}
              prefetch
            >
              <Image
                src={link.imgURL}
                width={20}
                height={20}
                alt={link.label}
              />
              {link.label}
            </Link>
          </SheetClose>
        );
      })}
    </>
  );
};

export default NavLinks;
