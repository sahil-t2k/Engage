import { fireEvent, render, screen } from '@testing-library/react'
import Signin from '../pages/index'
import '@testing-library/jest-dom'
//test loading
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
//test validation
describe('Check if signin page validates data correctly', () => {
  test("To detect invalid email format",()=>{
    render(<Signin />);
    const mail_input=screen.getByTestId("email-field");
    fireEvent.change(mail_input,{target:{value:'sahil@t2k'}});
    const password_input=screen.getByTestId("password-field");
    fireEvent.change(password_input,{target:{value:'pass@123'}});
    const btn=screen.getByTestId('submitbtn');
    fireEvent.click(btn);
    expect(screen.getByText("The email field is in invalid format.")).toBeInTheDocument();
  })

  test("To email and password is required",()=>{
    render(<Signin />);
    const mail_input=screen.getByTestId("email-field");
    fireEvent.change(mail_input,{target:{value:''}});
    const password_input=screen.getByTestId("password-field");
    fireEvent.change(password_input,{target:{value:''}});
    const btn=screen.getByTestId('submitbtn');
    fireEvent.click(btn);
    expect(screen.getByText("The email field is required.")).toBeInTheDocument();
    expect(screen.getByText("The password field is required")).toBeInTheDocument();
  })
})