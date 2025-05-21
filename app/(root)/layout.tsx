import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCurrentUser, isAuthenticated, signOut } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    redirect("/sign-in");
  }

  const user = await getCurrentUser();

  return (<div className="root-layout">
    <nav className={"flex justify-between items-center p-4 "}>
      <Link href="/" className={"flex items-center gap-2"}>
        <Image src={"/user-avatar.png"} alt={"logo"} width={38} height={32}/>
        <h2 className={"text-primary-100"}>DevPrep</h2>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image src={"/user-avatar.png"} alt={"user"} width={40} height={40}
                 className={"rounded-full object-cover size-[40px] cursor-pointer"}/>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem><a href="/profile">Profile</a></DropdownMenuItem>
          <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
    {children}
  </div>);
};

export default RootLayout;
