import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders Header Component', () => {
  render(<App />);
  const linkElement = screen.getByTestId("app");
  expect(linkElement).toBeInTheDocument();
});

// test('renders Add photo Modal', () => {
//   render(<App />);
//   // const linkElement = screen.getByTestId("app");
//   const btnAddPhoto = screen.getByTestId("btn-addPhoto")
  
//   fireEvent.click(btnAddPhoto);

//   const modalElement = screen.getByTestId("add-photo-modal");

//   expect(modalElement).toBeInTheDocument();
//   expect(modalElement).toBeVisible();
// });
