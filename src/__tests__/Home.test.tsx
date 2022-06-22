import React from "react";
import { render, screen, cleanup, waitFor, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Auth, getAuth } from "firebase/auth";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
  };
});

jest.mock('firebase/auth');

jest.mock('firebase/firestore');

jest.mock('firebase/storage');

afterEach(done => {
  cleanup();
  jest.resetAllMocks();
  done();
});

describe("Home Page", () => {

 const setup = () => {

  const { container } = render(
   <Router>
    <HomePage />
   </Router>
  );

  return {
    container
  };
 }

 it("renders home page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
 }); 

 it("fills out and submits contact form", async () => {
  const mockAuth = ({
    currentUser: {
      uid: "abc"
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (serverTimestamp as jest.Mock).mockReturnThis();
  (doc as jest.Mock).mockReturnThis();
  (setDoc as jest.Mock).mockResolvedValue(this);
  setup();

  const contactIcon = await screen.findByTestId("contactIcon");
  fireEvent.click(contactIcon);

  userEvent.type(screen.getByTestId("firstName"), "exFirst");
  userEvent.type(screen.getByTestId("lastName"), "exLast");
  userEvent.type(screen.getByTestId("phone"), "1234567890");
  userEvent.type(screen.getByTestId("email"), "example@example.com");
  userEvent.type(screen.getByTestId("address"), "1 Example Ave.");
  userEvent.type(screen.getByTestId("city"), "New York");
  userEvent.type(screen.getByTestId("stateProvince"), "NY");
  userEvent.type(screen.getByTestId("zipPostal"), "10001");
  userEvent.type(screen.getByTestId("country"), "USA");

  expect(screen.getByTestId("contactForm")).toBeInTheDocument();
  expect(screen.getByTestId("firstName")).toHaveValue("exFirst");
  expect(screen.getByTestId("lastName")).toHaveValue("exLast");
  expect(screen.getByTestId("phone")).toHaveValue("1234567890");
  expect(screen.getByTestId("email")).toHaveValue("example@example.com");
  expect(screen.getByTestId("address")).toHaveValue("1 Example Ave.");
  expect(screen.getByTestId("city")).toHaveValue("New York");
  expect(screen.getByTestId("stateProvince")).toHaveValue("NY");
  expect(screen.getByTestId("zipPostal")).toHaveValue("10001");
  expect(screen.getByTestId("country")).toHaveValue("USA");

  fireEvent.click(screen.getByTestId("submitCodeBtn"));

  await waitFor(() => {
    expect(setDoc).toBeCalled();
  });
 });

 it("fills out and submits date form", async () => {
  const mockAuth = ({
    currentUser: {
      uid: "abc"
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (serverTimestamp as jest.Mock).mockReturnThis();
  (doc as jest.Mock).mockReturnThis();
  (setDoc as jest.Mock).mockResolvedValue(this);

  setup();

  const dateIcon = screen.getByTestId("dateIcon");
  fireEvent.click(dateIcon);

  userEvent.type(screen.getByTestId("fromDate"), "1976-04-08");
  userEvent.type(screen.getByTestId("toDate"), "1976-04-10");
  userEvent.type(screen.getByTestId("theEvent"), "Event");
  userEvent.type(screen.getByTestId("location"), "New York");
  userEvent.type(screen.getByTestId("details"), "Nothing of note.");

  expect(screen.getByTestId("dateForm")).toBeInTheDocument();
  expect(screen.getByTestId("fromDate")).toHaveValue("1976-04-08");
  expect(screen.getByTestId("toDate")).toHaveValue("1976-04-10");
  expect(screen.getByTestId("theEvent")).toHaveValue("Event");
  expect(screen.getByTestId("location")).toHaveValue("New York");
  expect(screen.getByTestId("details")).toHaveValue("Nothing of note.");

  fireEvent.click(screen.getByTestId("submitCodeBtn"));

  await waitFor(() => {
    expect(setDoc).toBeCalled();
  });
 });

 it("fills out and submits email form", async () => {
  const mockAuth = ({
    currentUser: {
      uid: "abc"
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (serverTimestamp as jest.Mock).mockReturnThis();
  (doc as jest.Mock).mockReturnThis();
  (setDoc as jest.Mock).mockResolvedValue(this);

  setup();

  const emailIcon = screen.getByTestId("emailIcon");
  fireEvent.click(emailIcon);

  userEvent.type(screen.getByTestId("Email"), "example@example.com");
  userEvent.type(screen.getByTestId("emailSubj"), "Example Subj");
  userEvent.type(screen.getByTestId("emailMsg"), "This is an example msg.");

  expect(screen.getByTestId("emailForm")).toBeInTheDocument();
  expect(screen.getByTestId("Email")).toHaveValue("example@example.com");
  expect(screen.getByTestId("emailSubj")).toHaveValue("Example Subj");
  expect(screen.getByTestId("emailMsg")).toHaveValue("This is an example msg.");

  fireEvent.click(screen.getByTestId("submitCodeBtn"));

  await waitFor(() => {
    expect(setDoc).toBeCalled();
  });
 });

 it("uploads an img and submits img form", async () => {
  const mockAuth = ({
    currentUser: {
      uid: "abc"
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (ref as jest.Mock).mockReturnThis();
  (uploadBytes as jest.Mock).mockResolvedValue(this);
  (getDownloadURL as jest.Mock).mockResolvedValue("example.png");
  (serverTimestamp as jest.Mock).mockReturnThis();
  (doc as jest.Mock).mockReturnThis();
  (setDoc as jest.Mock).mockResolvedValue(this);

  setup();

  const imgIcon = screen.getByTestId("imgIcon");
  fireEvent.click(imgIcon);

  global.URL.createObjectURL = jest.fn();
  const fakeFile = new File(['example'], 'example.png', { type: 'image/png' });
  const inputFile = screen.getByTestId(/imgInput/i);
  
  fireEvent.change(inputFile, {
   target: { files: [fakeFile] }
  });

  expect(screen.getByTestId("imgForm")).toBeInTheDocument();
  expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
  expect(screen.queryByTestId("imgFileErr")).not.toBeInTheDocument();

  fireEvent.click(screen.getByTestId("submitCodeBtn"));

  await waitFor(() => {
    expect(uploadBytes).toBeCalled();
  });

  await waitFor(() => {
    expect(getDownloadURL).toBeCalled();
  });

  await waitFor(() => {
    expect(setDoc).toBeCalled();
  });
 });

 it("shows img file error message", () => {
  setup();

  const imgIcon = screen.getByTestId("imgIcon");
  fireEvent.click(imgIcon);

  const fakeFile = new File(['example'], 'example.xml', { type: 'image/xml' });
  const inputFile = screen.getByTestId(/imgInput/i);
  
  fireEvent.change(inputFile, {
   target: { files: [fakeFile] }
  });

  expect(screen.getByTestId("imgFileErr")).toBeInTheDocument();
  expect(screen.getByTestId("imgFileErr")).toHaveTextContent("Please choose an image file (png or jpeg)");
 });

 it("fills out and submits search form", async () => {
  const mockAuth = ({
    currentUser: {
      uid: "abc"
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (serverTimestamp as jest.Mock).mockReturnThis();
  (doc as jest.Mock).mockReturnThis();
  (setDoc as jest.Mock).mockResolvedValue(this);

  setup();

  const searchIcon = screen.getByTestId("searchIcon");
  fireEvent.click(searchIcon);

  userEvent.type(screen.getByTestId("searchMsg"), "This is an example search msg.");

  expect(screen.getByTestId("searchForm")).toBeInTheDocument();
  expect(screen.getByTestId("searchMsg")).toHaveValue("This is an example search msg.");

  fireEvent.click(screen.getByTestId("submitCodeBtn"));

  await waitFor(() => {
    expect(setDoc).toBeCalled();
  });
 });

 it("fills out and submits url form", async () => {
  const mockAuth = ({
    currentUser: {
      uid: "abc"
    }
  } as unknown) as Auth;
  (getAuth as jest.Mock).mockReturnValue(mockAuth);
  (serverTimestamp as jest.Mock).mockReturnThis();
  (doc as jest.Mock).mockReturnThis();
  (setDoc as jest.Mock).mockResolvedValue(this);

  setup();

  const urlIcon = screen.getByTestId("urlIcon");
  fireEvent.click(urlIcon);

  userEvent.type(screen.getByTestId("urlInput"), "www.google.com");

  expect(screen.getByTestId("urlForm")).toBeInTheDocument();
  expect(screen.getByTestId("urlInput")).toHaveValue("www.google.com");

  fireEvent.click(screen.getByTestId("submitCodeBtn"));

  await waitFor(() => {
    expect(setDoc).toBeCalled();
  });
 });

});