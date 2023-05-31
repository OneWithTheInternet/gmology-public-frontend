import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import Login from "../pages/Login";

// cleans rendered elements from memory after each test
afterEach(() => {
  cleanup();
});

//Snapshot test for this component
test("should match snapshot", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test("should render login page", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  const loginform = screen.getByTestId("loginForm");
  expect(loginform).toBeInTheDocument();
});

describe("should login with mock user", () => {
  test("should render email and password form fields", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailField = screen.getByTestId("emailField");
    const passwordField = screen.getByTestId("passwordField");
    expect(emailField && passwordField).toBeInTheDocument();
  });
});
