"use server";

import { z } from "zod";
import * as argon2 from "argon2";
import { createSession } from "./session";

const signinSchema = z.object({
  username: z.string().min(1, { message: "Nome de usuário é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatório" }),
});

type SigninSchema = z.infer<typeof signinSchema>;

const users = [
  {
    id: "1",
    username: "admin",
    password:
      "$argon2id$v=19$m=65536,t=3,p=4$sSCIUgHmMNWva6prAxszIg$gktafde8cnYa1k1q7YAK9wZrjKzVF21WdpAATHoUyvI",
  },
];

export async function signin(data: SigninSchema) {
  const { username, password } = signinSchema.parse(data);

  const user = users.find((user) => user.username === username);

  if (!user) {
    throw new Error("Usuário ou senha inválidos");
  }

  const isPasswordValid = await argon2.verify(user.password, password);

  if (!isPasswordValid) {
    throw new Error("Usuário ou senha inválidos");
  }

  await createSession({ userId: user.id });

  return {
    token: "token",
  };
}
