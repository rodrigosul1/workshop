"use client";

import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField as FormFieldComponent,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { InputMask, type MaskType } from "./input-mask";

interface Props<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  maskType?: MaskType;
}

export function InputFormField<T extends FieldValues>({
  control,
  name,
  label,
  maskType,
  ...props
}: Props<T>) {
  return (
    <FormFieldComponent
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {maskType ? (
              <InputMask maskType={maskType} {...field} {...props} />
            ) : (
              <Input {...field} {...props} />
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
