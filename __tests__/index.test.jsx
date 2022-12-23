import { render, screen } from '@testing-library/react'
import Signin from '../pages/index'
import '@testing-library/jest-dom'

describe('Check if signin page loads correctly', () => {
  
  test("Does sign-in form exist", () => {
    render(<Signin />);
   expect(screen.getByTestId('signin-form')).toBeInTheDocument();
  })

  test("Does sign-in form has email type input", () => {
    render(<Signin />);
    expect(screen.getByTestId("email-field")).toBeInTheDocument();
  })

  test("Email field is required", () => {
    render(<Signin />);
    expect(screen.getByTestId("email-field")).toBeRequired();
  })

  test("Does sign-in form has password type input", () => {
    render(<Signin />);
    expect(screen.getByTestId("password-field")).toBeInTheDocument();
  })

  test("Password field is required", () => {
    render(<Signin />);
    expect(screen.getByTestId("password-field")).toBeRequired();
  })

  test("Sign in form has remember me", () => {
    render(<Signin />);
    expect(screen.getByTestId("remember-me")).toBeInTheDocument();
  })

  test("Sign in form has 5 button total 3 langs, 2 sign-in\'s", () => {
    render(<Signin />);
    const btns= screen.getAllByRole("button");
    expect(btns.length===5).toBeTruthy();
  })


})