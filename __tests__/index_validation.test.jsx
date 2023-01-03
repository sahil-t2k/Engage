import { fireEvent, render, screen } from '@testing-library/react'
import Signin from '../pages/index'
import '@testing-library/jest-dom'
//test validation
describe('Check if signin page validates data correctly', () => {
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
    test("To detect invalid email format",()=>{
      const mail_input=screen.getByTestId("email-field");
      fireEvent.change(mail_input,{target:{value:'sahil@t2k'}});
      const password_input=screen.getByTestId("password-field");
      fireEvent.change(password_input,{target:{value:'pass@123'}});
      const btn=screen.getByTestId('submitbtn');
      fireEvent.click(btn);
      expect(screen.getByText("The email field is in invalid format.")).toBeInTheDocument();
    })
  
    test("To email and password is required",()=>{
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