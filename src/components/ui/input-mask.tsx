import { cn } from "@/lib/utils";
import MaskedInput, { type MaskedInputProps } from "react-text-mask";

const phoneMask = [
  "(",
  /[1-9]/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
const cpfMask = [
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  ".",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

export type MaskType = "phone" | "cpf";

interface Props extends Omit<MaskedInputProps, "mask"> {
  maskType: MaskType;
}

const masks: Record<MaskType, (string | RegExp)[]> = {
  phone: phoneMask,
  cpf: cpfMask,
};

export function InputMask({ className, maskType, ...props }: Props) {
  return (
    <MaskedInput
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
      mask={masks[maskType]}
    />
  );
}
