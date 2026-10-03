/**
 * Patch for environments where window.fetch has only a getter,
 * preventing 'Cannot set property fetch of #<Window> which has only a getter'
 * when scripts attempt to wrap or polyfill fetch.
 */
(function() {
  try {
    if (typeof window === 'undefined') return;

    let _fetch = window.fetch;
    const descriptor: PropertyDescriptor = {
      get() {
        return _fetch;
      },
      set(val: typeof fetch) {
        _fetch = val;
      },
      configurable: true,
      enumerable: true,
    };

    try {
      Object.defineProperty(window, 'fetch', descriptor);
    } catch (_) {
      // Ignore if non-configurable
    }

    try {
      if (typeof Window !== 'undefined' && Window.prototype) {
        Object.defineProperty(Window.prototype, 'fetch', descriptor);
      }
    } catch (_) {
      // Ignore
    }

    try {
      if (typeof globalThis !== 'undefined' && (globalThis as unknown) !== window) {
        Object.defineProperty(globalThis, 'fetch', descriptor);
      }
    } catch (_) {
      // Ignore
    }

    window.addEventListener('error', (e) => {
      if (e?.message && e.message.includes('fetch of #<Window> which has only a getter')) {
        e.preventDefault();
      }
    });
  } catch (_) {
    // Ignore
  }
})();

export {};
