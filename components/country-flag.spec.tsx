import { render } from "@testing-library/react";
import * as React from "react";
import { UnitedStatesFlag, JapanFlag } from "./country-flag";

describe("<UnitedStatesFlag>", () => {
  it("matches the snapshot", () => {
    const { container } = render(<UnitedStatesFlag />);

    expect(container).toMatchSnapshot();
  });
});

describe("<JapanFlag>", () => {
  it("matches the snapshot", () => {
    const { container } = render(<JapanFlag />);

    expect(container).toMatchSnapshot();
  });
});
