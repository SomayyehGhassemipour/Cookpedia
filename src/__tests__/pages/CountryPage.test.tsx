import { CountryPage } from "../../pages/signUp/CountryPage";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { MemoryRouter } from "react-router-dom";

describe("CountryPage", () => {
  test("Filters country list based on search input", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryPage />
        </MemoryRouter>
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Search Country");
    fireEvent.change(searchInput, { target: { value: "United" } });

    const listItems = screen.getAllByRole("list-item");

    listItems.forEach((item) => {
      expect(item.textContent).toContain("United");
    });

    expect(screen.queryByText("Canada")).toBeNull();
  });

  test("Update search input value with selected country", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryPage />
        </MemoryRouter>
      </Provider>
    );

    const selectedCountry = screen.getByText("Iran");
    fireEvent.click(selectedCountry);

    const searchInput = screen.getByPlaceholderText("Search Country");

    expect(searchInput).toHaveValue("Iran");
  });
  test("Update contry field in redux state", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CountryPage />
        </MemoryRouter>
      </Provider>
    );

    const selectedCountry = screen.getByText("Iran");
    fireEvent.click(selectedCountry);

    const countinueButton = screen.getByText("Continue");
    fireEvent.click(countinueButton);

    const countryRedux = store.getState().currentUser.country;
    expect(countryRedux).toEqual("Iran");
  });
});

export {};
