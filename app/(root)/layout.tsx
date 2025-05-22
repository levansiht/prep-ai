import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getCurrentUser,
  isAuthenticated,
  signOut,
} from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  const user = await getCurrentUser();

  return (
    <div className="root-layout">
      <nav
        className={
          "flex justify-between items-center p-4 rounded-2xl bg-dark-200/50 backdrop-blur-sm mb-8"
        }
      >
        <div className="flex items-center gap-6">
          <Link href="/" className={"flex items-center gap-2"}>
            <Image
              src={"/user-avatar.png"}
              alt={"logo"}
              width={38}
              height={32}
            />
            <h2 className={"text-primary-100"}>DevPrep</h2>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-light-100 hover:text-primary-200 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/interview"
              className="text-light-100 hover:text-primary-200 transition-colors"
            >
              Interviews
            </Link>
            <Link
              href="/about"
              className="text-light-100 hover:text-primary-200 transition-colors"
            >
              About
            </Link>
            <Link
              href="/profile"
              className="text-light-100 hover:text-primary-200 transition-colors"
            >
              Profile
            </Link>
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-light-100"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/" className="w-full">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/interview" className="w-full">
                  Interviews
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/about" className="w-full">
                  About
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User Menu */}
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src={"/user-avatar.png"}
                alt={"user"}
                width={40}
                height={40}
                className={
                  "rounded-full object-cover size-[40px] cursor-pointer"
                }
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="w-full">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
