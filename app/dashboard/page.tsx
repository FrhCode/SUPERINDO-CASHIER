import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "./components/overview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import noData from "@/public/no-data-deposit.svg";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NullSessionException from "@/exception/NullSessionException";
import { getTotalProduct } from "@/service/overview/get-total-product";
import { getTotalTransactionAmmount } from "@/service/overview/get-total-transaction-ammount";
import { getTotalTransactionCount } from "@/service/overview/get-total-transaction-count";
import { getTotalVariant } from "@/service/overview/get-total-variant";
import { getLatestTransaction } from "@/service/overview/get-latest-transaction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import generateInitials from "@/lib/generate-initial-name";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new NullSessionException();
  }

  const { message: totalProduct } = await getTotalProduct({
    token: session.jwtToken,
  });

  const { message: totalTransactionAmmount } = await getTotalTransactionAmmount(
    { token: session.jwtToken },
  );
  const { message: totalTransactionCount } = await getTotalTransactionCount({
    token: session.jwtToken,
  });
  const { message: totalVariant } = await getTotalVariant({
    token: session.jwtToken,
  });

  const { content: latestTransactions } = await getLatestTransaction({
    token: session.jwtToken,
  });

  return (
    <Tabs defaultValue="ringkasan" className="space-y-4">
      <TabsList>
        <TabsTrigger
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          value="ringkasan"
        >
          Ringkasan
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          value="analytics"
        >
          Analisis
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          value="reports"
          disabled
        >
          Laporan
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          value="notifications"
          disabled
        >
          Notifikasi
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ringkasan" className="space-y-4">
        <div className="space-y-4">
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
                <div className="text-2xl font-bold">
                  IDR {totalTransactionAmmount.toLocaleString()}
                </div>
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
                <div className="text-2xl font-bold">
                  {totalTransactionCount.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produk</CardTitle>
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
                <div className="text-2xl font-bold">
                  {totalProduct.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Variant</CardTitle>
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
                <div className="text-2xl font-bold">
                  {totalVariant.toLocaleString()}
                </div>
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
                <div className="space-y-8">
                  {latestTransactions.map((trasaction) => {
                    return (
                      <div className="flex items-center" key={trasaction.id}>
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/avatars/01.png" alt="Avatar" />
                          <AvatarFallback>
                            {generateInitials(trasaction.created_user)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {trasaction.created_user}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            example@gmail.com
                          </p>
                        </div>
                        <div className="ml-auto font-medium">
                          IDR {trasaction.totalAmount.toLocaleString()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4">
        <div className="pt-20">
          <div className="relative h-80 w-full">
            <Image
              src={noData}
              fill
              style={{ objectFit: "contain" }}
              alt="lele icon"
            />
          </div>
          <p className="text-center">Sedang dalam tahap pengembangan</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
