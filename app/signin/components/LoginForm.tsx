"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import formSchema from "./schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl || "/",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Alamat email
                <Popover>
                  <PopoverTrigger>info akun</PopoverTrigger>
                  <PopoverContent className=" flex gap-3">
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      onClick={() => {
                        form.setValue("email", "zydan@gmail.com");
                        form.setValue("password", "indonesia123B");
                      }}
                    >
                      akun customer
                    </Button>
                    <Button
                      size={"sm"}
                      onClick={() => {
                        form.setValue("email", "farhan7534031b@gmail.com");
                        form.setValue("password", "indonesia123B");
                      }}
                    >
                      akun admin
                    </Button>
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <FormControl>
                <Input placeholder="youremail@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Submit</Button>
      </form>
    </Form>
  );
}
