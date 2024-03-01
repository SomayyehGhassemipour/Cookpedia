import { render } from "@testing-library/react";
import App from "../../App";
import {
  UserAuthContextProvider,
  useUserAuth,
} from "../../sevices/firebase/AthenicationService";

describe("Authenication tests", () => {
  const userAuth = useUserAuth();

  beforeEach(async () => {
    await userAuth.signUp();
  });

  test("Log in should throw error with wrong credential", async () => {
    render(
      <UserAuthContextProvider>
        <App />
      </UserAuthContextProvider>
    );
    let error = "";
    try {
      await userAuth.logIn("yasamin@gmail.com", "1234");
    } catch (err: any) {
      error = err.toString();
    }
    expect(error).not.toBeNull();
  });
});

export {};
