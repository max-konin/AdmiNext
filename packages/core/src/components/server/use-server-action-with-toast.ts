import { startTransition, useState } from "react";
import { toaster } from "../ui/toaster";

type MessageType = {
  title?: string,
  description?: string
}

export type useServerActionWithToastArgs<TFnInput, TFnOutput> = {
  fn: (input: TFnInput) => Promise<TFnOutput>;
  onError?: (error: unknown) => unknown;
  onSuccess?: (res: TFnOutput) => unknown;
  successMessage?: MessageType,
  errorMessage?: MessageType,
  loadingMessage?: MessageType,
};

export const useServerActionWithToast = <TFnInput, TFnOutput>({
  fn,
  onError,
  onSuccess,
  successMessage = { title: 'Done!' },
  errorMessage = { title: 'Error' },
  loadingMessage = { title: 'Loading...' },
}: useServerActionWithToastArgs<TFnInput, TFnOutput>) => {

  const [isLoading, setLoading] = useState<boolean>(false);

  const execute = async (input: TFnInput) => {
    startTransition(() => setLoading(true));

    const promiseFn = () => fn(input)
      .then(onSuccess)
      .catch(onError)
      .finally(() => startTransition(() => setLoading(false)));

    toaster.promise(promiseFn, {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    });
  };

  return [execute, isLoading] as const;
};
