import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Container from "@/components/ui/container/Container";
import Image from "next/image";
import {
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { Input } from "@/components/ui/input";
import superindo from "@/public/super-indo-logo-black-and-white.png";
import Link from "next/link";
import { getCart } from "@/service/cart/get-cart";
import CheckoutComponent from "./components/checkout-component";
import { Button } from "@/components/ui/button";
import NullSessionException from "@/exception/NullSessionException";
import LogOut from "@/components/ui/log-out";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new NullSessionException();
  }

  const isAdministrator = session.userDetail.authorities.find(
    (data) => data.authority == "administrator",
  );

  const { content: carts } = await getCart({ token: session.jwtToken });

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <Container.Root className="py-4 md:py-5">
          <Container.Content className="flex items-end gap-4 md:items-stretch md:gap-9">
            <Link href={"/"}>
              <div className="relative h-8 w-8 md:h-20 md:w-20">
                <Image
                  src={superindo}
                  fill
                  style={{
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
                  }}
                  alt="lele icon"
                />
              </div>
            </Link>
            <div className="flex-grow space-y-3 md:w-8/12 md:flex-grow-0">
              <div className="relative w-full">
                <AiOutlineSearch
                  size={25}
                  className="absolute left-2 top-2/4 -translate-y-2/4"
                  color="var(--slate-50)"
                />
                <Input
                  className="h-8 max-w-[525px] border-none bg-blue-300/30 pl-11 text-white placeholder:text-white focus-visible:outline-none focus-visible:ring-0 md:h-12 md:rounded-full"
                  placeholder="Cari barang disini"
                />
              </div>
              <ul className="text-blue100 hidden flex-wrap gap-5 text-sm md:flex">
                <li className="cursor-pointer hover:text-white hover:underline">
                  Produk Terbaru
                </li>
                <li className="cursor-pointer hover:text-white hover:underline">
                  SALE
                </li>
                <li className="cursor-pointer hover:text-white hover:underline">
                  Equipment
                </li>
                <li className="cursor-pointer hover:text-white hover:underline">
                  Mountaineering
                </li>
                <li className="cursor-pointer hover:text-white hover:underline">
                  Riding
                </li>
                <li className="cursor-pointer hover:text-white hover:underline">
                  1989
                </li>
                <li className="cursor-pointer hover:text-white hover:underline">
                  Tactial
                </li>
                <li className="cursor-pointer hover:text-white hover:underline">
                  Flash Sale
                </li>
                <li className="cursor-pointer hover:text-white hover:underline">
                  Size Chart
                </li>
              </ul>
            </div>

            <div className="ml-auto flex flex-col items-end justify-between">
              <div className="flex gap-3">
                {/* <CheckoutComponent carts={carts} /> */}
                {isAdministrator ? (
                  <Link href={"/dashboard"}>
                    <AiOutlineUser size={24} />
                  </Link>
                ) : (
                  <LogOut>
                    <AiOutlineLogout size={24} className="cursor-pointer" />
                  </LogOut>
                )}

                <CheckoutComponent carts={carts} />
              </div>
              <div className="hidden gap-3 md:flex">
                <Button className="h-6 rounded-full bg-blue-300/30 px-2">
                  Coupon
                </Button>
                <Button className="h-6 rounded-full bg-blue-300/30 px-2">
                  Store
                </Button>
              </div>
            </div>
          </Container.Content>
        </Container.Root>
      </div>
      {children}

      {/* <div className="mt-3 bg-primary text-primary-foreground">
        <Container.Root className="py-2">
          <Container.Content className="flex items-center justify-center gap-4 md:gap-9">
            <span>Copyright © 2023 farhan@dev, Inc. All rights reserved.</span>
          </Container.Content>
        </Container.Root>
      </div> */}
    </>
  );
}
