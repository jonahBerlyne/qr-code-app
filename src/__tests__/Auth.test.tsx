import React from "react";
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import LoginPage from "../Pages/LoginPage";
import SignUpPage from "../Pages/SignUpPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
  };
});

jest.mock('firebase/auth');

jest.mock('firebase/firestore');

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
  (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(this);

  render(
   <Router>
    <LoginPage />
   </Router>
  );

  const emailInput = screen.getByTestId("Email");
  const passwordInput = screen.getByTestId("Password");

  userEvent.type(emailInput, "example@example.com");
  userEvent.type(passwordInput, "example");

  fireEvent.click(screen.getByTestId("loginBtn"));

  await waitFor(() => {
    expect(signInWithEmailAndPassword).toBeCalled();
  });
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
  const mockCredential = ({
   user: {
    uid: "abc"
   }
  } as unknown) as UserCredential;
  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockCredential);
  (doc as jest.Mock).mockReturnThis();
  (setDoc as jest.Mock).mockResolvedValue(this);

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

  fireEvent.click(screen.getByTestId("registerBtn"));

  await waitFor(() => {
    expect(createUserWithEmailAndPassword).toBeCalled();
  });

  await waitFor(() => {
    expect(setDoc).toBeCalled();
  });
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