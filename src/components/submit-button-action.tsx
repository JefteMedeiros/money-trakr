"use client";

import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/glass/button";

interface Props {
  id: string;
  text?: string;
}

export function SubmitButtonAction({ text = "Enviar", id }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="destructive"
      form={id}
      className="w-full"
      disabled={pending}
      aria-disabled={pending}
      type="submit"
    >
      {text}
      {pending && <Loader className="animate-spin w-4 h-4" />}
    </Button>
  );
}
