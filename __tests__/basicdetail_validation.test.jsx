import { fireEvent, render, screen } from '@testing-library/react'
import validatebasicDetails from '../components/validation/basicdetails'
import BasicDetails from '../pages/property/basicdetails'
import '@testing-library/jest-dom'

describe('Check if basic details page validates data correctly', () => {
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
    render(<BasicDetails/>);
    
  
  });
  // Property Name Required
  test("To property name is required", () => {
    const property_name = screen.getByTestId("test_property_name");
    fireEvent.change(property_name, { target: { value: undefined } });
    const property_category = screen.getByTestId("test_property_category");
    fireEvent.change(property_category, { target: { value: 'hotel' } });
    const property_brand = screen.getByTestId("test_property_brand");
    fireEvent.change(property_brand, { target: { value: 'taj' } });
    const established_year = screen.getByTestId("test_established_year");
    fireEvent.change(established_year, { target: { value: '2020-01-05' } });
    const star_rating = screen.getByTestId("test_star_rating");
    fireEvent.change(star_rating, { target: { value: "5" } });
    const description_title = screen.getByTestId("test_description_title");
    fireEvent.change(description_title, { target: { value: "About Taj" } });
    const description_body = screen.getByTestId("test_description_body");
    fireEvent.change(description_body, { target: { value: "About Taj" } });
    const description_date = screen.getByTestId("test_description_date");
    fireEvent.change(description_date, { target: { value: "2023-01-06" } });
    const btn = screen.getByTestId('test_button');
    fireEvent.click(btn);
   //w validatebasicDetails(allHotelDetails)
   render(<BasicDetails/>)
    //const label=screen.getByTitle('APP: The property name is required')
     expect(screen.getByText('APP: The property name is required')).toBeInTheDocument();
     
  })

  // Property Category Required
  // test("To property category is required", () => {
  //   const property_name = screen.getByTestId("test_property_name");
  //   fireEvent.change(property_name, { target: { value: 'Taj' } });
  //   const property_category = screen.getByTestId("test_property_category");
  //   fireEvent.change(property_category, { target: { value: '' } });
  //   const property_brand = screen.getByTestId("test_property_brand");
  //   fireEvent.change(property_brand, { target: { value: 'taj' } });
  //   const established_year = screen.getByTestId("test_established_year");
  //   fireEvent.change(established_year, { target: { value: '2020-01-05' } });
  //   const star_rating = screen.getByTestId("test_star_rating");
  //   fireEvent.change(star_rating, { target: { value: "5" } });
  //   const description_title = screen.getByTestId("test_description_title");
  //   fireEvent.change(description_title, { target: { value: "About Taj" } });
  //   const description_body = screen.getByTestId("test_description_body");
  //   fireEvent.change(description_body, { target: { value: "About Taj" } });
  //   const description_date = screen.getByTestId("test_description_date");
  //   fireEvent.change(description_date, { target: { value: "2023-01-06" } });
  //   const btn = screen.getByTestId('test_button');
  //   fireEvent.click(btn);
  //   expect(screen.getByText("The property category is required.")).toBeInTheDocument();
  // })

  // Property Established Year Required
  // test("To property established year is required", () => {
  //   const property_name = screen.getByTestId("test_property_name");
  //   fireEvent.change(property_name, { target: { value: 'Taj' } });
  //   const property_category = screen.getByTestId("test_property_category");
  //   fireEvent.change(property_category, { target: { value: 'hotel' } });
  //   const property_brand = screen.getByTestId("test_property_brand");
  //   fireEvent.change(property_brand, { target: { value: 'taj' } });
  //   const established_year = screen.getByTestId("test_established_year");
  //   fireEvent.change(established_year, { target: { value: '' } });
  //   const star_rating = screen.getByTestId("test_star_rating");
  //   fireEvent.change(star_rating, { target: { value: "5" } });
  //   const description_title = screen.getByTestId("test_description_title");
  //   fireEvent.change(description_title, { target: { value: "About Taj" } });
  //   const description_body = screen.getByTestId("test_description_body");
  //   fireEvent.change(description_body, { target: { value: "About Taj" } });
  //   const description_date = screen.getByTestId("test_description_date");
  //   fireEvent.change(description_date, { target: { value: "2023-01-06" } });
  //   const btn = screen.getByTestId('test_button');
  //   fireEvent.click(btn);
  //   expect(screen.getByText("The property established year is required.")).toBeInTheDocument();
  // })

   // Property Star Rating Required
  //  test("To property star rating is required", () => {
  //   const property_name = screen.getByTestId("test_property_name");
  //   fireEvent.change(property_name, { target: { value: 'Taj' } });
  //   const property_category = screen.getByTestId("test_property_category");
  //   fireEvent.change(property_category, { target: { value: 'hotel' } });
  //   const property_brand = screen.getByTestId("test_property_brand");
  //   fireEvent.change(property_brand, { target: { value: 'taj' } });
  //   const established_year = screen.getByTestId("test_established_year");
  //   fireEvent.change(established_year, { target: { value: '2020-05-01' } });
  //   const star_rating = screen.getByTestId("test_star_rating");
  //   fireEvent.change(star_rating, { target: { value: "" } });
  //   const description_title = screen.getByTestId("test_description_title");
  //   fireEvent.change(description_title, { target: { value: "About Taj" } });
  //   const description_body = screen.getByTestId("test_description_body");
  //   fireEvent.change(description_body, { target: { value: "About Taj" } });
  //   const description_date = screen.getByTestId("test_description_date");
  //   fireEvent.change(description_date, { target: { value: "2023-01-06" } });
  //   const btn = screen.getByTestId('test_button');
  //   fireEvent.click(btn);
  //   expect(screen.getByText("The property star rating is required.")).toBeInTheDocument();
  // })

  // Property Description Title Required
  // test("To property description title is required", () => {
  //   const property_name = screen.getByTestId("test_property_name");
  //   fireEvent.change(property_name, { target: { value: 'Taj' } });
  //   const property_category = screen.getByTestId("test_property_category");
  //   fireEvent.change(property_category, { target: { value: 'hotel' } });
  //   const property_brand = screen.getByTestId("test_property_brand");
  //   fireEvent.change(property_brand, { target: { value: 'taj' } });
  //   const established_year = screen.getByTestId("test_established_year");
  //   fireEvent.change(established_year, { target: { value: '2020-05-01' } });
  //   const star_rating = screen.getByTestId("test_star_rating");
  //   fireEvent.change(star_rating, { target: { value: "5" } });
  //   const description_title = screen.getByTestId("test_description_title");
  //   fireEvent.change(description_title, { target: { value: "" } });
  //   const description_body = screen.getByTestId("test_description_body");
  //   fireEvent.change(description_body, { target: { value: "About Taj" } });
  //   const description_date = screen.getByTestId("test_description_date");
  //   fireEvent.change(description_date, { target: { value: "2023-01-06" } });
  //   const btn = screen.getByTestId('test_button');
  //   fireEvent.click(btn);
  //   expect(screen.getByText("The property description title is required.")).toBeInTheDocument();
  // })

   // Property Description Body Required
  //  test("To property description description is required", () => {
  //   const property_name = screen.getByTestId("test_property_name");
  //   fireEvent.change(property_name, { target: { value: 'Taj' } });
  //   const property_category = screen.getByTestId("test_property_category");
  //   fireEvent.change(property_category, { target: { value: 'hotel' } });
  //   const property_brand = screen.getByTestId("test_property_brand");
  //   fireEvent.change(property_brand, { target: { value: 'taj' } });
  //   const established_year = screen.getByTestId("test_established_year");
  //   fireEvent.change(established_year, { target: { value: '2020-05-01' } });
  //   const star_rating = screen.getByTestId("test_star_rating");
  //   fireEvent.change(star_rating, { target: { value: "5" } });
  //   const description_title = screen.getByTestId("test_description_title");
  //   fireEvent.change(description_title, { target: { value: "About Taj" } });
  //   const description_body = screen.getByTestId("test_description_body");
  //   fireEvent.change(description_body, { target: { value: "" } });
  //   const description_date = screen.getByTestId("test_description_date");
  //   fireEvent.change(description_date, { target: { value: "2023-01-06" } });
  //   const btn = screen.getByTestId('test_button');
  //   fireEvent.click(btn);
  //   expect(screen.getByText("The property description body is required.")).toBeInTheDocument();
  // })

  // Property Description Date Required
  // test("To property description description is required", () => {
  //   const property_name = screen.getByTestId("test_property_name");
  //   fireEvent.change(property_name, { target: { value: 'Taj' } });
  //   const property_category = screen.getByTestId("test_property_category");
  //   fireEvent.change(property_category, { target: { value: 'hotel' } });
  //   const property_brand = screen.getByTestId("test_property_brand");
  //   fireEvent.change(property_brand, { target: { value: 'taj' } });
  //   const established_year = screen.getByTestId("test_established_year");
  //   fireEvent.change(established_year, { target: { value: '2020-05-01' } });
  //   const star_rating = screen.getByTestId("test_star_rating");
  //   fireEvent.change(star_rating, { target: { value: "5" } });
  //   const description_title = screen.getByTestId("test_description_title");
  //   fireEvent.change(description_title, { target: { value: "About Taj" } });
  //   const description_body = screen.getByTestId("test_description_body");
  //   fireEvent.change(description_body, { target: { value: "The Taj is 5 star hotel with a great look surrounded by dal view." } });
  //   const description_date = screen.getByTestId("test_description_date");
  //   fireEvent.change(description_date, { target: { value: "" } });
  //   const btn = screen.getByTestId('test_button');
  //   fireEvent.click(btn);
  //   expect(screen.getByText("The property description date is required.")).toBeInTheDocument();
  // })


})