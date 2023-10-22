import LoginForm from "./components/LoginForm";
import superindoIcon from "@/public/Logo_Super_Indo.png";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Container from "@/components/ui/container/Container";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <>
      <Container.Root>
        <Container.Content className="mt-20 flex justify-center">
          <div className="space-y-10">
            <div className="flex flex-col items-center space-y-5">
              <div className="relative h-16 w-16">
                <Image
                  src={superindoIcon}
                  fill
                  style={{ objectFit: "cover" }}
                  alt="lele icon"
                />
              </div>
              <p className="text-center text-4xl font-semibold">
                Login ke E-POST Superindo
              </p>
            </div>
            <LoginForm />
          </div>
        </Container.Content>
      </Container.Root>
    </>
  );
}
