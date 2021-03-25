import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { TestApp } from "../core/test-app";
import { LocaleSwitcher } from "./locale-switcher";

describe("<LocaleSwitcher>", () => {
  it("renders switcher buttons for each supported locale", () => {
    const { container } = render(
      <TestApp>
        <LocaleSwitcher />
      </TestApp>
    );

    expect(container).toMatchSnapshot();
  });

  it("changes history state with the locale that the clicked button has", () => {
    const onPush = jest.fn();
    const { getAllByTestId } = render(
      <TestApp router={{ push: onPush }}>
        <LocaleSwitcher />
      </TestApp>
    );

    const buttons = getAllByTestId("link");

    fireEvent.click(buttons[1]!);

    expect(onPush).toHaveBeenCalledTimes(1);
    expect(onPush).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining(`hl=${buttons[1]!.title}`),
      expect.stringContaining(`hl=${buttons[1]!.title}`),
      expect.anything()
    );
  });
});
