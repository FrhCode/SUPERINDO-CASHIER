import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import {
  AiOutlineBell,
  AiOutlineDashboard,
  AiOutlineGift,
  AiOutlineLogout,
  AiOutlineShopping,
} from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { combineUrl } from "@/lib/combineUrl";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./components/sidebar";

export default async function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error();
  }

  const links = [
    {
      text: "Dashboard",
      icon: <AiOutlineDashboard size="20" />,
      url: "/dashboard",
      separator: false,
    },
    {
      text: "",
      icon: <AiOutlineDashboard size="20" />,
      url: "",
      separator: true,
    },
    {
      text: "Categori",
      icon: <BiCategoryAlt size="20" />,
      url: "/dashboard/category",
      separator: false,
    },
    {
      text: "Product",
      icon: <BsBag size="20" />,
      url: "/dashboard/product",
      separator: false,
    },
  ];

  return (
    <div className="flex h-screen w-screen">
      <div className="hidden w-[260px] flex-shrink-0 items-center border-x shadow sm:block">
        <div className="mx-auto grid h-14 w-11/12 grid-cols-12 items-center gap-3 rounded-bl-xl rounded-br-xl bg-primary px-3 text-primary-foreground">
          <Avatar className="col-span-3">
            <AvatarImage src={combineUrl(session.user!.image!)} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="col-span-7">
            <p className="truncate text-xs font-semibold">
              {session.userDetail.name}
            </p>
            <p className="text-xs font-light">
              {session.userDetail.authorities[0].authority}
            </p>
          </div>

          <div className="col-span-2">
            <button>
              <AiOutlineLogout strokeWidth="30" />
            </button>
          </div>
        </div>

        <div className="mt-4">
          <Sidebar links={links} />
        </div>
      </div>
      <div className="relative h-full max-h-screen flex-grow overflow-y-auto">
        <div className="flex h-14 items-center justify-between bg-gradient-to-r from-primary to-[#1bb4e6] px-3 text-primary-foreground">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger className="sm:hidden">
                <GiHamburgerMenu color="white" />
              </SheetTrigger>
              <SheetContent side={"left"} className="w-[260px]">
                <SheetHeader>
                  <SheetTitle>
                    <div className="grid h-14 w-11/12 grid-cols-12 items-center gap-3 rounded-bl-xl rounded-br-xl">
                      <Avatar className="col-span-3">
                        <AvatarImage src={combineUrl(session.user!.image!)} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div className="col-span-9 text-left">
                        <p className="truncate text-xs font-semibold">
                          {session.userDetail.name}
                        </p>
                        <p className="text-xs font-light">
                          {session.userDetail.authorities[0].authority}
                        </p>
                      </div>
                    </div>
                  </SheetTitle>
                  <SheetDescription>
                    <ul>
                      {links.map(({ icon, separator, text, url }, index) => {
                        if (separator === true) {
                          return <Separator key={index} />;
                        }
                        return (
                          <li
                            className="text-gray-700"
                            role="button"
                            key={text}
                          >
                            <Link
                              href={url}
                              className="flex h-11 items-center gap-2"
                            >
                              {icon}
                              <p className="text-sm font-bold">{text}</p>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <p className="text-lg">Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-full p-2 transition hover:bg-primary/30">
              <AiOutlineGift size="25" strokeWidth="0" />
            </button>
            <button className="rounded-full p-2 transition hover:bg-primary/30">
              <AiOutlineShopping size="25" strokeWidth="20" />
            </button>
            <button className="rounded-full p-2 transition hover:bg-primary/30">
              <AiOutlineBell size="25" strokeWidth="20" />
            </button>
          </div>
        </div>

        <div className="px-3 py-6">{children}</div>
      </div>
    </div>
  );
}
