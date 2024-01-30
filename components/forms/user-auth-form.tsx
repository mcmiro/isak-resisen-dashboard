"use client";
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string(),
  password: z.string().min(4, { message: "Enter a password" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = {
    username: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    const loginData = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });

    if (loginData?.ok) {
      router.push("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Authentifizierung nicht erfolgreich",
        description:
          "Oops! Es gab ein Problem mit Ihren Anmeldedaten. Bitte überprüfen Sie Benutzername und Passwort und versuchen Sie es erneut. Prost auf eine erfolgreiche Anmeldung beim nächsten Versuch!",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-2 w-full">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your username..."
                    {...field}
                  />
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
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="ml-auto w-full" type="submit">
            Continue With Email
          </Button>
        </form>
      </Form>
    </>
  );
}
