import { fireEvent, render, screen } from '@testing-library/react'
import BasicDetails from '../pages/property/basicdetails'
import '@testing-library/jest-dom'

// Checking Basic Details page loading
describe('Check if basicdetails page loads correctly', () => {
    beforeEach(() => {
        // jest.mock('next/config',  () => ({
        //     publicRuntimeConfig:'12.1.4'
        //   }))

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
        render(<BasicDetails />);
    });

    // Property Name Field
    test('Does Basic Details page has property name input field', () => {
        const propertyName = screen.getByTestId("test_property_name")
        expect(propertyName).toBeInTheDocument();
    })

    test("Property Name field is required", () => {
        expect(screen.getByTestId("test_property_name")).toBeRequired();
    })

    // Property Category Field
    test('Does Basic Details page has property category input field', () => {
        expect(screen.getByTestId("test_property_category")).toBeInTheDocument();
    })

    test("Property Category field is required", () => {
        expect(screen.getByTestId("test_property_category")).toBeRequired();
    })

    // Property Brand Field
    test('Does Basic Details page has property brand input field', () => {
        expect(screen.getByTestId("test_property_brand")).toBeInTheDocument();
    })

    // Established Date Field
    test('Does Basic Details page has established date input field', () => {
        expect(screen.getByTestId("test_established_year")).toBeInTheDocument();
    })

    test("Established Date field is required", () => {
        expect(screen.getByTestId("test_established_year")).toBeRequired();
    })

    //Star rating Field
    test('Does Basic Details page has star rating input field', () => {
        expect(screen.getByTestId("test_star_rating")).toBeInTheDocument();
    })
    test("Established Date field is required", () => {
        expect(screen.getByTestId("test_star_rating")).toBeRequired();
    })

    // Description Title Field
    test('Does Basic Details page has description title input field', () => {
        expect(screen.getByTestId("test_description_title")).toBeInTheDocument();
    })
    test("Description Title field is required", () => {
        expect(screen.getByTestId("test_description_title")).toBeRequired();
    })

    // Description Body Field
    test('Does Basic Details page has description body input field', () => {
        expect(screen.getByTestId("test_description_body")).toBeInTheDocument();
    })
    test("Description Body field is required", () => {
        expect(screen.getByTestId("test_description_body")).toBeRequired();
    })

    // Description Date Field
    test('Does Basic Details page has description date input field', () => {
        expect(screen.getByTestId("test_description_date")).toBeInTheDocument();
    })
    test("Description Date field is required", () => {
        expect(screen.getByTestId("test_description_date")).toBeRequired();
    })
    
    // Button Disabled Update test
    test('Does Basic Details page has update button.', () => {
        expect(screen.getByTestId("test_button")).toBeInTheDocument();
    })

     // Button Spinner Update test
     test('Does Basic Details page has spinner update button.', () => {
        expect(screen.getByTestId("test_button_spinner")).toBeInTheDocument();
    })
     // Button Spinner Update test
    test('Does Basic Details page has button disabled button', () => {
        expect(screen.getByTestId("test_button_disabled")).toBeInTheDocument();
    })

})


