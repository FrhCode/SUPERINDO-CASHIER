import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { combineUrl } from "@/lib/combineUrl";
import {
  AiOutlineLogout,
  AiOutlineShopping,
  AiOutlineGift,
  AiOutlineBell,
  AiOutlineDashboard,
} from "react-icons/ai";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBag, BsBagX } from "react-icons/bs";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error();
  }

  const links = [
    {
      text: "Dashboard",
      icon: <AiOutlineDashboard size="20" />,
      url: "/",
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
      url: "/",
      separator: false,
    },
    {
      text: "Product",
      icon: <BsBag size="20" />,
      url: "/",
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
          <ul>
            {links.map(({ icon, separator, text, url }, index) => {
              if (separator === true) {
                return <Separator key={index} />;
              }
              return (
                <li className="px-3 text-gray-500" role="button" key={text}>
                  <Link href={url} className="flex h-11 items-center gap-2">
                    {icon}
                    <p className="text-sm font-semibold">{text}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
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
        <div className="space-y-4 px-3 py-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Pendapatan
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">IDR 45,231.89</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transaksi</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2350</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Now
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 xl:grid-cols-7">
            <Card className="col-span-1 xl:col-span-4">
              <CardHeader>
                <CardTitle className="text-sm">Ringkasan</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-1 xl:col-span-3">
              <CardHeader>
                <CardTitle className="text-sm">Transaksi Terbaru</CardTitle>
                <CardDescription>
                  Bulan ini telah terjadi 150 transaksi.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
