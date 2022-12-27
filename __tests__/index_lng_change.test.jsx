import { fireEvent, render, screen } from '@testing-library/react'
import Signin from '../pages/index'
import '@testing-library/jest-dom'
//language change validation
describe('Check languages changes correctly', () => {
    beforeEach(() => {
        render(<Signin />);
      });

      //test lang changes to fr
      test("To detect fr language",()=>{
       const fr_btn=screen.getByTestId("fr-btn");
        const en_btn=screen.getByTestId("en-btn");
        const ar_btn=screen.getByTestId("ar-btn");
        fireEvent.click(fr_btn);
       expect(fr_btn.className.includes("font-bold")).toBeTruthy();
       expect(en_btn.className.includes("font-bold")).toBeFalsy();
       expect(ar_btn.className.includes("font-bold")).toBeFalsy();
      })
    
    //test lang changes to ar
    test("To detect ar language",()=>{
        //render(<Signin />);
        const fr_btn=screen.getByTestId("fr-btn");
        const en_btn=screen.getByTestId("en-btn");
        const ar_btn=screen.getByTestId("ar-btn");
        fireEvent.click(ar_btn);
       expect(ar_btn.className.includes("font-bold")).toBeTruthy();
       expect(fr_btn.className.includes("font-bold")).toBeFalsy();
       expect(en_btn.className.includes("font-bold")).toBeFalsy();
      })
    
    //test lang changes to en
    test("To detect en language",()=>{
        //render(<Signin />);
        const fr_btn=screen.getByTestId("fr-btn");
        const en_btn=screen.getByTestId("en-btn");
        const ar_btn=screen.getByTestId("ar-btn");
        fireEvent.click(en_btn);
       expect(en_btn.className.includes("font-bold")).toBeTruthy();
       expect(fr_btn.className.includes("font-bold")).toBeFalsy();
       expect(ar_btn.className.includes("font-bold")).toBeFalsy();
      })
    })