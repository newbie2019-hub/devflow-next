import { Dialog } from '@radix-ui/react-dialog';
import { LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { auth, signOut } from '@/auth';
import ROUTES from '@/constants/routes';

import NavLinks from './navbar/NavLinks';
import { Button } from '../ui/button';

const LeftSidebar = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Dialog>
      <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto p-6 pt-20 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
        <div className="flex  flex-col gap-6">
          <NavLinks userId={userId} />
        </div>

        <div className="flex flex-col gap-3">
          {userId ? (
            <form
              action={async () => {
                'use server';

                await signOut();
              }}
            >
              <Button
                type="submit"
                className="base-medium w-fit !bg-transparent px-4 py-3"
              >
                <LogOut className="size-5 text-black dark:text-white" />
                <span className="text-dark300_light900 max-lg:hidden">
                  Logout
                </span>
              </Button>
            </form>
          ) : (
            <>
              <Button
                className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
                asChild
              >
                <Link href={ROUTES.SIGN_IN}>
                  <Image
                    alt="Account"
                    src="/icons/account.svg"
                    width={20}
                    height={20}
                    className="invert-colors lg:hidden"
                  />
                  <span className="primary-text-gradient max-lg:hidden">
                    Log In
                  </span>
                </Link>
              </Button>

              <Link href={ROUTES.SIGN_UP}>
                <Button className="text-dark400_light900 small-medium btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <Image
                    alt="Account"
                    src="/icons/sign-up.svg"
                    width={20}
                    height={20}
                    className="invert-colors lg:hidden"
                  />
                  <span className="max-lg:hidden">Sign up</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>
    </Dialog>
  );
};

export default LeftSidebar;
