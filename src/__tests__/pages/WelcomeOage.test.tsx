import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  RenderResult,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import WelcomePage from "../../pages/WelcomePage";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../sevices/firebase/AthenicationService";

// Mock the react-router-dom module
jest.mock("react-router-dom", () => require("./react-router-dom"));

// Mock the useUserAuth hook
jest.mock("../../sevices/firebase/AthenicationService", () => ({
  useUserAuth: jest.fn(() => ({
    logInWithGoogle: jest.fn(() => Promise.resolve({})),
  })),
}));

describe("WelcomePage", () => {
  it("renders WelcomePage component", () => {
    const { getByText } = render(<WelcomePage />);
    expect(getByText("Welcome to")).toBeInTheDocument();
    expect(getByText("Continue With Google")).toBeInTheDocument();
    expect(getByText("Get Started")).toBeInTheDocument();
    expect(getByText("I Already Have an Account")).toBeInTheDocument();
  });

  it('calls logInWithGoogle when "Continue With Google" button is clicked', async () => {
    const { getByText } = render(<WelcomePage />);
    fireEvent.click(getByText("Continue With Google"));
    await waitFor(() =>
      expect(useUserAuth().logInWithGoogle).toHaveBeenCalled()
    );
  });
});
