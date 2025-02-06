import { signin } from "@/api/auth/signin";
import { useMutation } from "@tanstack/react-query";

interface Props {
  onSuccess?: () => void;
}

export function useSignIn({ onSuccess }: Props) {
  return useMutation({
    mutationFn: signin,
    onSuccess,
  });
}
