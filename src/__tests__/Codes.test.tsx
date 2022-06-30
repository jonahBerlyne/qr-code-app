import React from "react";
import { render, screen, cleanup, act } from "@testing-library/react";
import 'jest-canvas-mock';
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import CodesPage from "../Pages/CodesPage";
import { Auth, getAuth } from "firebase/auth";
import CodePage from "../Pages/CodePage";
import { doc, getDoc } from "firebase/firestore";

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

  it("renders the codes page", async () => {
   const mockAuth = ({
    currentUser: {
        uid: "abc",
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
   expect(await screen.findByTestId("noCodes")).toHaveTextContent("You haven't added any QR codes, yet.");
  });
});

describe("Code Page", () => {
  
  const setup = async () => {
    const mockAuth = ({
      currentUser: {
        uid: "abc",
      },
    } as unknown) as Auth;
    (getAuth as jest.Mock).mockResolvedValue(mockAuth);

    const { container } = render(
      <Router>
        <CodePage />
      </Router>
    );

    const promise = Promise.resolve();
    await act(async () => {
      await promise;
    });

    return {
      container
    };
  }

  it("renders the code page", async () => {
    (doc as jest.Mock).mockReturnThis();
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({
        type: "type",
        value: "value"
      })
    });
    const { container } = await setup();
    expect(container).toMatchSnapshot();
  });

  it("renders a contact code", async () => {
    (doc as jest.Mock).mockReturnThis();
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({
        info: {
          first: "exampleFirst",
          last: "exampleLast"
        },
        type: "contact",
        value: "contact_example"
      })
    });
    await setup();
    expect(screen.getByTestId("contactHeader")).toHaveTextContent("Contact card for exampleFirst exampleLast:");
  });

  it("renders a date code", async () => {
    (doc as jest.Mock).mockReturnThis();
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({
        info: {
          event: "example"
        },
        type: "date",
        value: "date_example"
      })
    });
    await setup();
    expect(screen.getByTestId("dateHeader")).toHaveTextContent("Code for example:");
  });

  it("renders an email code", async () => {
    (doc as jest.Mock).mockReturnThis();
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({
        info: {
          subj: "exampleSubj",
          to: "example@example.com"
        },
        type: "email",
        value: "email_example"
      })
    });
    await setup();
    expect(screen.getByTestId("emailCodeAddress")).toHaveTextContent("Email to example@example.com");
    expect(screen.getByTestId("emailCodeSubj")).toHaveTextContent("Subject:exampleSubj");
  });

  it("renders an img code", async () => {
    (doc as jest.Mock).mockReturnThis();
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({
        info: {
          name: "example"
        },
        type: "img",
        value: "img_example"
      })
    });
    await setup();
    expect(screen.getByTestId("imgHeader")).toHaveTextContent("Image of:");
    expect(screen.getByTestId("imgName")).toHaveTextContent("example");
  });

  it("renders a search code", async () => {
    (doc as jest.Mock).mockReturnThis();
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({
        type: "search",
        value: "example"
      })
    });
    await setup();
    expect(screen.getByTestId("searchHeader")).toHaveTextContent("example");
  });

  it("renders a url code", async () => {
    (doc as jest.Mock).mockReturnThis();
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({
        type: "url",
        value: "www.example.com"
      })
    });
    await setup();
    expect(screen.getByTestId("urlCodeLink")).toHaveTextContent("www.example.com");
  });
});