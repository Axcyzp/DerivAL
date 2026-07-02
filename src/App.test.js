import { render, screen } from "@testing-library/react";
import HomePage from "./pages/HomePage";

jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}), { virtual: true });

test("renders the DerivAL home page", () => {
  render(<HomePage />);

  expect(screen.getByAltText(/DerivAL/i)).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /Everything You Need for A Level Maths/i,
    }),
  ).toBeInTheDocument();
});
