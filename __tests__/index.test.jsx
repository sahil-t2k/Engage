import { fireEvent, render, screen } from '@testing-library/react'
import Signin from '../pages/index'
import '@testing-library/jest-dom'

//test loading
describe('Check if signin page loads correctly', () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
    render(<Signin />);
  });
  
  test("Does sign-in form exist", () => {
  expect(screen.getByTestId('signin-form')).toBeInTheDocument();
  })

  test("Does sign-in form has email type input", () => {
  expect(screen.getByTestId("email-field")).toBeInTheDocument();
  })

  test("Email field is required", () => {
  expect(screen.getByTestId("email-field")).toBeRequired();
  })

  test("Does sign-in form has password type input", () => {
  expect(screen.getByTestId("password-field")).toBeInTheDocument();
  })

  test("Password field is required", () => {
  expect(screen.getByTestId("password-field")).toBeRequired();
  })

  test("Sign in form has remember me", () => {
  expect(screen.getByTestId("remember-me")).toBeInTheDocument();
  })

  test("Sign in form has 5 button total 3 langs, 2 sign-in\'s", () => {
    const btns= screen.getAllByRole("button");
    expect(btns.length===5).toBeTruthy();
  })
})
