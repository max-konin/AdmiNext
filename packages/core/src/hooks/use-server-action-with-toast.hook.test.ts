import { renderHook, act } from '@testing-library/react';
import {
  useServerActionWithToast,
  useServerActionWithToastArgs,
} from './use-server-action-with-toast.hook';
import { toaster } from '../components/ui/toaster';
import { vi, describe, beforeEach, it, expect } from 'vitest';

vi.mock('../components/ui/toaster', () => ({
  toaster: {
    promise: vi.fn(),
  },
}));

describe('useServerActionWithToast', () => {
  const mockFn = vi.fn().mockResolvedValue('result');
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  const defaultArgs: useServerActionWithToastArgs<any, any> = {
    fn: mockFn,
    onSuccess: mockOnSuccess,
    onError: mockOnError,
    successMessage: { title: 'Success!' },
    errorMessage: { title: 'Error!' },
    loadingMessage: { title: 'Saving...' },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call the provided function and handle success', async () => {
    mockFn.mockResolvedValueOnce('result');
    const { result } = renderHook(() => useServerActionWithToast(defaultArgs));

    await act(async () => {
      await result.current[0]('input');
    });

    expect(mockFn).toHaveBeenCalledWith('input');
    expect(mockOnSuccess).toHaveBeenCalledWith('result');
    expect(toaster.promise).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const error = new Error('Test error');
    mockFn.mockRejectedValueOnce(error);
    const { result } = renderHook(() => useServerActionWithToast(defaultArgs));

    await act(async () => {
      result.current[0]('input');
    });

    expect(mockFn).toHaveBeenCalledWith('input');
    expect(mockOnError).toHaveBeenCalledWith(error);
    expect(toaster.promise).toHaveBeenCalled();
  });

  it('should use default messages if none are provided', async () => {
    const { result } = renderHook(() =>
      useServerActionWithToast({
        fn: mockFn,
        onSuccess: mockOnSuccess,
        onError: mockOnError,
      })
    );

    await act(async () => {
      result.current[0]('input');
    });

    expect(toaster.promise).toHaveBeenCalledWith(expect.any(Promise), {
      loading: { title: 'Saving...' },
      success: { title: 'Done!' },
      error: { title: 'Error' },
    });
  });

  it('should return isPending state', async () => {
    const { result } = renderHook(() => useServerActionWithToast(defaultArgs));

    expect(result.current[1]).toBe(false);

    await act(async () => {
      result.current[0]('input');
    });

    expect(result.current[1]).toBe(false);
  });
});
