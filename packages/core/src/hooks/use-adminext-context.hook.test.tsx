import { renderHook } from '@testing-library/react';
import { useAdmiNextContext } from './use-adminext-context.hook';
import { AdminExtensionContext } from '../contexts';
import { describe, it, expect } from 'vitest';
import { ReactNode } from 'react';
import { AdmiNextContextType } from '../types';

const mockContextValue: AdmiNextContextType = {
  routePrefix: '/admin',
  resourcesDefinition: {},
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <AdminExtensionContext.Provider value={mockContextValue}>
    {children}
  </AdminExtensionContext.Provider>
);

describe('useAdmiNextContext', () => {
  it('should throw an error if used outside of AdmiNextContextProvider', () => {
    try {
      renderHook(() => useAdmiNextContext());
    } catch (e) {
      expect(e).toEqual(
        new Error(
          'useAdmiNextContext must be used within a AdmiNextContextProvider'
        )
      );
    }
  });

  it('should return context value if used within AdmiNextContextProvider', () => {
    const { result } = renderHook(() => useAdmiNextContext(), { wrapper });
    expect(result.current).toEqual(mockContextValue);
  });
});
