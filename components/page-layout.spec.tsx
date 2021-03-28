import { render } from "@testing-library/react";
import * as React from "react";
import { TestApp } from "../core/test-app";
import {
  TwoColumnPageLayout,
  TwoColumnPageLayoutAside,
  TwoColumnPageLayoutFooter,
  TwoColumnPageLayoutMain,
} from "./page-layout";

describe("<TwoColumnPageLayout>", () => {
  it("renders children with styles", () => {
    const { getByTestId } = render(
      <TestApp>
        <TwoColumnPageLayout data-testid="two-column-page-layout">
          <TwoColumnPageLayoutMain>
            <div>This is main</div>
          </TwoColumnPageLayoutMain>

          <TwoColumnPageLayoutAside>
            <div>This is aside</div>
          </TwoColumnPageLayoutAside>

          <TwoColumnPageLayoutFooter />
        </TwoColumnPageLayout>
      </TestApp>
    );

    expect(getByTestId("two-column-page-layout")).toMatchSnapshot();
  });
});
