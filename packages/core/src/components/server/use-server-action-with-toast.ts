import { toaster } from "../ui/toaster";

type MessageType = {
  title: string,
  description: string
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
  successMessage = { title: 'Successfully uploaded!', description: 'Looks great' },
  errorMessage = { title: 'Upload failed', description: 'Something went wrong' },
  loadingMessage = { title: 'Loading...', description: 'Please wait' },
}: useServerActionWithToastArgs<TFnInput, TFnOutput>) => {
  const execute = async (input: TFnInput) => {
    const promiseFn = new Promise<TFnOutput>(async (resolve, reject) => {
      try {
        const result = await fn(input);
        if (onSuccess) onSuccess(result);
        resolve(result);
      } catch (error) {
        if (onError) onError(error);
        reject(error);
      }
    });

    toaster.promise(promiseFn, {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    });
  };
  return { execute };
};
