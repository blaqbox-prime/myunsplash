import {render, screen, fireEvent} from "@testing-library/react"
import Header from "../Components/Header"

beforeEach(() => {
    render(<Header/>);
})

test("render header branding",() => {
    const element = screen.getByTestId("header-logo");
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute("src","my_unsplash_logo.svg");
    expect(element).toHaveAttribute("alt",'logo'); 
})


test("render search bar", () => {
    const element = screen.getByTestId("searchbar");
    const searchbox = screen.getByTestId("searchbox");
    // const searchIcon = screen.getByTestId("searchIcon")
    expect(element).toBeInTheDocument();
    expect(element).toContainElement(searchbox);
    // expect(element).toContainElement(searchIcon);
})

test("searchbox renders placeholder", () => {
    const searchbox = screen.getByTestId("searchbox");
    expect(searchbox).toHaveAttribute("placeholder","Search by name");
})

test("searchbox is empty when nothing is entered", () => {
    const searchbox = screen.getByTestId("searchbox");
    expect(searchbox).toHaveValue("");
})

test("render add photo button",() => {
    const btnAddPhoto = screen.getByTestId("btn-addPhoto");
    expect(btnAddPhoto).toBeInTheDocument();
    expect(btnAddPhoto).toHaveTextContent("Add a photo");
})

test("searchbox value updates when typing", () => {
    const searchbox = screen.getByTestId("searchbox");
    fireEvent.change(searchbox,{target: {value: "blue ocean"}});
    expect(searchbox.value).toBe("blue ocean");

})