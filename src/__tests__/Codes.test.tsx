import React from "react";
import { render, screen, cleanup, waitFor, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import 'jest-canvas-mock';
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import CodesPage from "../Pages/CodesPage";
import { Auth, getAuth } from "firebase/auth";
import QR from "../Components/QR";

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

describe("QR Codes", () => {

  let codes: any[] = [];
  let payload: any = {};

  const setup = () => {

    const Codes = () => {
      return (
        <div>
          {codes.map(code => {
            return (
              <div key={code.id}>
                <QR 
                  codeCollection={code.collection}
                  codeType={code.type}
                  color={code.color}
                  id={code.id}
                  showDeleteBtn={true}
                  timestamp="06/07/08"
                  value={code.value}
                  event={code?.event}
                  first={code?.first}
                  last={code?.last}
                  name={code?.name}
                  subj={code?.subj}
                  text={code?.text}
                  to={code?.to}
                  url={code?.url}
                />
              </div>
            );
          })}
        </div>
      );
    }

    render(<Codes />);
  }

  it("renders a contact code", () => {
    payload = {
      collection: "contact codes",
      type: "contact",
      color: "rosybrown",
      id: "contact",
      value: "MECARD:N:exLast,exFirst;ADR:1 Example Ave.,New York,NY,10001,USA;TEL:1234567890;EMAIL:example@example.com;;",
      first: "exFirst",
      last: "exLast"
    };
    codes.push(payload);
    setup();

    expect(screen.getByTestId("contactCodeHeader")).toHaveTextContent("Contact card for exFirst exLast:");
    expect(screen.getByTestId("deleteBtn")).toHaveTextContent("Delete QR Code");
  });

  it("renders a date code", () => {
    codes = [];
    payload = {
      collection: "date codes",
      type: "date",
      color: "red",
      id: "date",
      value: "https://calendar.google.com/calendar/u/0/r/eventedit?dates=20101006/20111006&text=Example&location=New+York&details=Nothing+important",
      event: "Example"
    };
    codes.push(payload);
    setup();

    expect(screen.getByTestId("dateCodeHeader")).toHaveTextContent("Code for Example:");
    expect(screen.getByTestId("deleteBtn")).toHaveTextContent("Delete QR Code");
  });

  it("renders an email code", () => {
    codes = [];
    payload = {
      collection: "email codes",
      type: "email",
      color: "goldenrod",
      id: "email",
      value: "mailto:example@example.com?subject=exampleSubj&body=This is an example msg.",
      subj: "exampleSubj",
      to: "example@example.com"
    };
    codes.push(payload);
    setup();

    expect(screen.getByTestId("emailCodeAddress")).toHaveTextContent("Email to example@example.com");
    expect(screen.getByTestId("emailCodeSubj")).toHaveTextContent("exampleSubj");
    expect(screen.getByTestId("deleteBtn")).toHaveTextContent("Delete QR Code");
  });

  it("renders an img code", () => {
    codes = [];
    payload = {
      collection: "img codes",
      type: "img",
      color: "darkslategray",
      id: "img",
      value: "example.png",
      name: "Example"
    };
    codes.push(payload);
    setup();

    expect(screen.getByTestId("imgCodeHeader")).toHaveTextContent("Example");
    expect(screen.getByTestId("deleteBtn")).toHaveTextContent("Delete QR Code");
  });

  it("renders a search code", () => {
    codes = [];
    payload = {
      collection: "search codes",
      type: "search",
      color: "black",
      id: "search",
      value: "example.png",
      text: "Example"
    };
    codes.push(payload);
    setup();

    expect(screen.getByTestId("searchCodeHeader")).toHaveTextContent("Example");
    expect(screen.getByTestId("deleteBtn")).toHaveTextContent("Delete QR Code");
  });  

  it("renders a url code", () => {
    codes = [];
    payload = {
      collection: "url codes",
      type: "url",
      color: "blue",
      id: "url",
      value: "https://www.google.com/",
      url: "https://www.google.com/"
    };
    codes.push(payload);
    setup();

    expect(screen.getByTestId("urlCodeLink")).toHaveTextContent("https://www.google.com/");
    expect(screen.getByTestId("deleteBtn")).toHaveTextContent("Delete QR Code");
  }); 
});