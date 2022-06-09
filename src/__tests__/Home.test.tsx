import React from "react";
import { render, screen, cleanup, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import HomePage from "../Pages/HomePage";

jest.mock("../firebaseConfig", () => {
  return {
    apps: ["appTestId"]
  };
});

jest.mock('firebase/auth');

beforeAll(done => {
  done();
});

beforeEach(() => {
 jest.setTimeout(30000);
})

afterEach(done => {
  cleanup();
  jest.resetAllMocks();
  done();
});

describe("Home Page", () => {

 it("renders home page", () => {

  const { container } = render(
   <Router>
    <HomePage />
   </Router>
  );

  expect(container).toMatchSnapshot();
 }); 

 it("generates contact code", async () => {

  render(
   <Router>
    <HomePage />
   </Router>
  );

  const contactIcon = await screen.findByTestId("contactIcon");
  fireEvent.click(contactIcon);

  userEvent.type(await screen.findByTestId("firstName"), "exFirst");
  console.log((await screen.findByTestId("firstName")).textContent);
  userEvent.type(await screen.findByTestId("lastName"), "exLast");
  userEvent.type(await screen.findByTestId("phone"), "1234567890");
  userEvent.type(await screen.findByTestId("email"), "example@example.com");
  userEvent.type(await screen.findByTestId("address"), "1 Example Ave.");
  userEvent.type(await screen.findByTestId("city"), "New York");
  userEvent.type(await screen.findByTestId("stateProvince"), "NY");
  userEvent.type(await screen.findByTestId("zipPostal"), "10001");
  userEvent.type(await screen.findByTestId("country"), "USA");

  expect(screen.getByTestId("contactForm")).toBeInTheDocument();
 });

 it("shows date form", () => {

  render(
   <Router>
    <HomePage />
   </Router>
  );

  const dateIcon = screen.getByTestId("dateIcon");
  fireEvent.click(dateIcon);

  expect(screen.getByTestId("dateForm")).toBeInTheDocument();
 });

 it("shows email form", () => {

  render(
   <Router>
    <HomePage />
   </Router>
  );

  const emailIcon = screen.getByTestId("emailIcon");
  fireEvent.click(emailIcon);

  expect(screen.getByTestId("emailForm")).toBeInTheDocument();
 });

 it("shows img form", () => {

  render(
   <Router>
    <HomePage />
   </Router>
  );

  const imgIcon = screen.getByTestId("imgIcon");
  fireEvent.click(imgIcon);

  expect(screen.getByTestId("imgForm")).toBeInTheDocument();
 });

 it("shows search form", () => {

  render(
   <Router>
    <HomePage />
   </Router>
  );

  const searchIcon = screen.getByTestId("searchIcon");
  fireEvent.click(searchIcon);

  expect(screen.getByTestId("searchForm")).toBeInTheDocument();
 });

 it("shows url form", () => {

  render(
   <Router>
    <HomePage />
   </Router>
  );

  const urlIcon = screen.getByTestId("urlIcon");
  fireEvent.click(urlIcon);

  expect(screen.getByTestId("urlForm")).toBeInTheDocument();
 });

});