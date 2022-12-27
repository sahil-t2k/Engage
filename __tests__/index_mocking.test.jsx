import { fireEvent, getByTestId, render, screen } from '@testing-library/react'
import Signin from '../pages/index'
import '@testing-library/jest-dom'
import axios from 'axios';
//language change validation
describe('Check languages changes correctly', () => {
    let rendered;
    beforeEach(() => {
        rendered = render(<Signin />);
      });
test("login",async ()=>{
    const fun=jest.fn();
    const mail_input=screen.getByTestId("email-field");
    fireEvent.change(mail_input,{target:{value:'client@engage.com'}});
    const password_input=screen.getByTestId("password-field");
    fireEvent.change(password_input,{target:{value:'Engage@123'}});
    const btn=screen.getByTestId('submitbtn');
     fireEvent.click(btn,fun());
     expect(fun).toBeCalledTimes(1);
})
    })