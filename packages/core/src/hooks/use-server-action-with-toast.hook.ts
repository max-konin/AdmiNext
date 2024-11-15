import { useTransition } from 'react';
import { toaster } from '../components/ui/toaster';

type ToastMessage = {
  title?: string;
  description?: string;
};

export type useServerActionWithToastArgs<TFnInput, TFnOutput> = {
  fn: (input: TFnInput) => Promise<TFnOutput>;
  onError?: (error: unknown) => unknown;
  onSuccess?: (res: TFnOutput) => unknown;
  successMessage?: ToastMessage;
  errorMessage?: ToastMessage;
  loadingMessage?: ToastMessage;
};

export const useServerActionWithToast = <TFnInput, TFnOutput>({
  fn,
  onError,
  onSuccess,
  successMessage = { title: 'Done!' },
  errorMessage = { title: 'Error' },
  loadingMessage = { title: 'Saving...' },
}: useServerActionWithToastArgs<TFnInput, TFnOutput>) => {
  const [isPending, startTransition] = useTransition();

  const execute = (input: TFnInput) => {
    startTransition(async () => {
      const promise = fn(input).then(onSuccess).catch(onError);
      toaster.promise(promise, {
        loading: loadingMessage,
        success: successMessage,
        error: errorMessage,
      });
    })
  }

  return [execute, isPending] as const;
};
