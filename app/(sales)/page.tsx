import Container from "@/components/ui/container/Container";
import Image from "next/image";
import superindo from "@/public/super-indo-logo-black-and-white.png";
import { Input } from "@/components/ui/input";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import banner from "@/public/main_banner_1280_x_354.webp";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { paginateProduct } from "@/service/product/paginate-product";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const { content: products } = await paginateProduct({
    page: "0",
    query: "",
    size: "100",
    sortBy: "",
    sortDirection: "DESC",
    token: session!.jwtToken,
  });

  return (
    <>
      <Container.Root className="mt-5">
        <Container.Content className="flex items-center gap-4">
          <div className="relative h-44 w-full overflow-hidden rounded-xl border-2">
            <Image
              src={banner}
              fill
              style={{
                objectFit: "fill",
              }}
              alt="lele icon"
            />
          </div>
        </Container.Content>
      </Container.Root>

      <Container.Root className="mt-5">
        <Container.Content className="grid grid-cols-2 gap-3">
          {products.map((product) => {
            return (
              <Link key={product.id} href={`/product/${product.id}/variants`}>
                <div className="relative aspect-[4/4] w-full overflow-hidden rounded-xl border-2">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_API_URL + `/${product.thumbnail}`
                    }
                    fill
                    style={{
                      objectFit: "fill",
                    }}
                    alt="lele icon"
                  />
                </div>
                <p className="mt-1 text-lg font-semibold">{product.name}</p>
              </Link>
            );
          })}
        </Container.Content>
      </Container.Root>
    </>
  );
}
