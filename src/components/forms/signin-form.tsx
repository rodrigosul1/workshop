"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputFormField } from "../ui/form-field";
import { Form } from "../ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSignIn } from "@/hooks/auth/use-sigin";
import { useRouter } from "next/navigation";

const signinFormSchema = z.object({
  username: z.string().min(1, { message: "Nome de usuário é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatório" }),
});

type SigninFormValues = z.infer<typeof signinFormSchema>;

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: signin, isPending } = useSignIn({
    onSuccess: () => {
      router.push("/");
    },
  });

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function handleSignIn(data: SigninFormValues) {
    signin(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Workshop</CardTitle>
        <CardDescription>
          Entre com seu nome de usuário e senha abaixo para acessar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignIn)}>
            <div className="flex flex-col gap-6">
              <InputFormField
                control={form.control}
                name="username"
                label="Usuário"
              />

              <div className="relative">
                <InputFormField
                  control={form.control}
                  name="password"
                  label="Senha"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  className="absolute right-2 bottom-0 h-9 w-9 flex items-center justify-center text-muted-foreground hover:text-foreground duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                Entrar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
