import {render, screen, fireEvent} from "@testing-library/react"
import Gallery from "../Components/Gallery";

beforeEach(() => {
    render(<Gallery/>);
})

test("should render gallery component", () => {
    const element = screen.getByTestId('gallery');
    expect(element).toBeInTheDocument();
})

// test("Should render responsive masonry grid", () => {
//     const element = screen.getByTestId('gallery');
//     const responsiveMasonry = screen.getByTestId("responsive-masonry");
//     const masonryGrid = screen.getByTestId("masonry-grid");
//     expect(element).toContainElement(responsiveMasonry);
//     expect(responsiveMasonry).toContainElement(masonryGrid);
// })

// test("Should display images in grid",() => {
//     const masonryGrid = screen.getByTestId("masonry-grid");
//     const photoContainer = screen.getAllByTestId('photo-container');
//     expect(masonryGrid).toContainElement(photo-container[0]);
// })