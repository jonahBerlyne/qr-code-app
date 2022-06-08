import React from "react";
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
  };
});

jest.mock('firebase/auth');

afterEach(done => {
  cleanup();
  jest.resetAllMocks();
  done();
});

describe("Login Page", () => {

 it("renders login page", () => {
  const { container } = render(
   <Router>
    <LoginPage />
   </Router>
  );
  expect(container).toMatchSnapshot();
 });

 it("changes login values", () => {
  render(
   <Router>
    <LoginPage />
   </Router>
  );

  const emailInput = screen.getByTestId("Email");
  const passwordInput = screen.getByTestId("Password");

  userEvent.type(emailInput, "example@example.com");
  userEvent.type(passwordInput, "example");

  expect(emailInput).toHaveValue("example@example.com");
  expect(passwordInput).toHaveValue("example");
 });

 it("should login user", async () => {
  const mockAuth = ({
   signInWithEmailAndPassword: jest.fn(),
  } as unknown) as Auth;
  (getAuth as jest.MockedFunction<typeof getAuth>).mockReturnValue(mockAuth);

  const email = "example@example.com";
  const password = "example";

  const Login = () => {
    return (
      <div>
        <button data-testid="loginBtn" onClick={() => loginUser()}></button>
      </div>
    );
  }

  const loginUser = async () => await signInWithEmailAndPassword(getAuth(), email, password);

  render(<Login />);

  const loginBtn = screen.getByTestId("loginBtn");
  fireEvent.click(loginBtn);

  expect(getAuth).toBeCalledTimes(1);
 });

 it('navigates to register page', async () => {
  render(
   <Router>
    <LoginPage />
    <SignUpPage />
   </Router>
  );

  userEvent.click(screen.getByTestId('register-link'));

  await waitFor(() => {
   expect(screen.getByTestId('login-link')).toBeInTheDocument();
  });
 });

});

describe("Register Page", () => {

 it("renders register page", () => {
  const { container } = render(
   <Router>
    <SignUpPage />
   </Router>
  );
  expect(container).toMatchSnapshot();
 });

 it("changes register values", () => {
  render(
   <Router>
    <SignUpPage />
   </Router>
  );

  const emailInput = screen.getByTestId("Email");
  const passwordInput = screen.getByTestId("Password");
  const confirmPasswordInput = screen.getByTestId("confirmPassword");

  userEvent.type(emailInput, "example@example.com");
  userEvent.type(passwordInput, "example");
  userEvent.type(confirmPasswordInput, "example");

  expect(emailInput).toHaveValue("example@example.com");
  expect(passwordInput).toHaveValue("example");
  expect(confirmPasswordInput).toHaveValue("example");
 });

 it("should register user", async () => {
  const mockAuth = ({
   createUserWithEmailAndPassword: jest.fn(),
  } as unknown) as Auth;
  (getAuth as jest.MockedFunction<typeof getAuth>).mockReturnValue(mockAuth);

  const email = "example@example.com";
  const password = "example";

  const Register = () => {
    return (
      <div>
        <button data-testid="registerBtn" onClick={() => registerUser()}></button>
      </div>
    );
  }

  const registerUser = async () => await createUserWithEmailAndPassword(getAuth(), email, password);

  render(<Register />);

  const registerBtn = screen.getByTestId("registerBtn");
  fireEvent.click(registerBtn);

  expect(getAuth).toBeCalledTimes(1);
 });

 it('navigates to login page', async () => {
  render(
   <Router>
    <SignUpPage />
    <LoginPage />
   </Router>
  );

  userEvent.click(screen.getByTestId('login-link'));

  await waitFor(() => {
   expect(screen.getByTestId('register-link')).toBeInTheDocument();
  });
 });

});