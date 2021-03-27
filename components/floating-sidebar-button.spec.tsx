import { act, fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { TestApp, TestAppElement } from "../core/test-app";
import { FloatingSidebarButton } from "./floating-sidebar-button";

describe("<FloatingSidebarButton>", () => {
  it("renders a button in the document body", () => {
    const { getByTestId } = render(
      <TestApp>
        <FloatingSidebarButton
          content={<div data-testid="content" />}
          data-testid="floating-sidebar-button"
        />
      </TestApp>
    );

    expect(getByTestId("floating-sidebar-button")).toBeInTheDocument();
  });

  it("renders a floating sidebar in the document but it's hidden", () => {
    const { getByTestId } = render(
      <TestApp>
        <FloatingSidebarButton content={<div data-testid="content" />} />
      </TestApp>
    );

    expect(getByTestId("floating-sidebar")).toBeInTheDocument();
    expect(getByTestId("floating-sidebar")).not.toBeVisible();
  });

  it("shows the floating sidebar when the button is clicked", () => {
    const { getByTestId } = render(
      <TestApp>
        <FloatingSidebarButton
          content={<div data-testid="content" />}
          data-testid="floating-sidebar-button"
        />
      </TestApp>
    );

    act(() => {
      fireEvent.click(getByTestId("floating-sidebar-button"));
    });

    expect(getByTestId("floating-sidebar")).toBeVisible();
  });

  it("hides the floating sidebar when the button is clicked while the sidebar is shown", () => {
    const { getByTestId } = render(
      <TestApp>
        <FloatingSidebarButton
          content={<div data-testid="content" />}
          data-testid="floating-sidebar-button"
        />
      </TestApp>
    );

    act(() => {
      fireEvent.click(getByTestId("floating-sidebar-button"));
    });
    act(() => {
      fireEvent.click(getByTestId("floating-sidebar-button"));
    });

    expect(getByTestId("floating-sidebar")).not.toBeVisible();
  });

  describe("props.closeOnHashChange = true", () => {
    it("hides the floating sidebar when a route change caused", () => {
      let testAppElement!: TestAppElement;
      const { getByTestId } = render(
        <TestApp
          ref={(el) => {
            testAppElement = el!;
          }}
        >
          <FloatingSidebarButton
            content={<div data-testid="content" />}
            data-testid="floating-sidebar-button"
          />
        </TestApp>
      );

      act(() => {
        fireEvent.click(getByTestId("floating-sidebar-button"));
      });

      act(() => {
        testAppElement.emulateRouteChangeComplete();
      });

      expect(getByTestId("floating-sidebar")).not.toBeVisible();
    });
  });

  describe("props.closeOnHashChange = false", () => {
    it("keeps the floating sidebar shown even when a route change caused", () => {
      let testAppElement!: TestAppElement;
      const { getByTestId } = render(
        <TestApp
          ref={(el) => {
            testAppElement = el!;
          }}
        >
          <FloatingSidebarButton
            content={<div data-testid="content" />}
            closeOnRouteChange={false}
            data-testid="floating-sidebar-button"
          />
        </TestApp>
      );

      act(() => {
        fireEvent.click(getByTestId("floating-sidebar-button"));
      });

      act(() => {
        testAppElement.emulateRouteChangeComplete();
      });

      expect(getByTestId("floating-sidebar")).toBeVisible();
    });
  });
});
