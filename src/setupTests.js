import "@testing-library/jest-dom";

// jsdom does not implement matchMedia, but the app uses it for responsive
// layout decisions. This keeps component tests close to browser behavior.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
