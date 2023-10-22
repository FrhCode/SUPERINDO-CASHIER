import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Container from "@/components/ui/container/Container";
import Image from "next/image";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import superindo from "@/public/super-indo-logo-black-and-white.png";
import Link from "next/link";
import { getCart } from "@/service/cart/get-cart";
import CheckoutComponent from "./components/checkout-component";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error();
  }

  const { content: carts } = await getCart({ token: session.jwtToken });

  return (
    <>
      <div className="bg-primary text-primary-foreground">
        <Container.Root className="">
          <Container.Content className="flex h-14 items-center gap-4">
            <Link href={"/"}>
              <div className="relative h-8 w-8">
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
            <div className="relative flex-grow">
              <AiOutlineSearch
                size={25}
                className="absolute left-2 top-2/4 -translate-y-2/4"
                color="var(--slate-400)"
              />
              <Input className="h-8 pl-9" placeholder="Cari barang disini" />
            </div>
            <CheckoutComponent carts={carts} />
          </Container.Content>
        </Container.Root>
      </div>
      {children}
    </>
  );
}
