import { useCallback, useState } from "react";
import type { FormEvent } from "react";
import { submitContactForm, type FormSource } from "@/lib/emailjs";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function useContactFormSubmit(formSource: FormSource) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>, onSuccess?: () => void) => {
      event.preventDefault();
      setStatus("loading");
      setError(null);

      const form = event.currentTarget;

      try {
        await submitContactForm(form, formSource);
        setStatus("success");
        form.reset();
        onSuccess?.();
      } catch (submissionError) {
        setStatus("error");
        setError(
          submissionError instanceof Error
            ? submissionError.message
            : "Something went wrong. Please try again or call us directly.",
        );
      }
    },
    [formSource],
  );

  return {
    handleSubmit,
    reset,
    status,
    error,
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
  };
}

export function FormSubmitFeedback({ error }: { error?: string | null }) {
  if (error) {
    return <p className="text-center text-sm text-red-600">{error}</p>;
  }

  return null;
}

export function FormSuccessMessage({
  show,
  message = "Thank you. Our team will contact you shortly.",
}: {
  show: boolean;
  message?: string;
}) {
  if (!show) return null;
  return <p className="text-center text-sm text-muted-foreground">{message}</p>;
}
