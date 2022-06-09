import React from "react";
import { render, screen, cleanup, waitFor, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import CodesPage from "../Pages/CodesPage";
import { Auth, getAuth } from "firebase/auth";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
  };
});

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn()
  };
});

jest.mock('firebase/firestore');

beforeAll(done => {
  done();
});

afterEach(done => {
  cleanup();
  jest.resetAllMocks();
  done();
});

describe("Codes Page", () => {

  it("renders codes page", async () => {
   const mockAuth = ({
    currentUser: {
        uid: jest.fn().mockReturnValue("abc"),
    }
   } as unknown) as Auth;
   (getAuth as jest.Mock).mockReturnValue(mockAuth);

    const { container } = render(
      <Router>
        <CodesPage />
      </Router>
    );

    expect(container).toMatchSnapshot();
    expect(await screen.findByTestId("noCodes")).toBeInTheDocument();
    expect(await screen.findByTestId("noCodes")).toHaveTextContent("Sorry, but you don't have any QR codes saved.");
  });
});