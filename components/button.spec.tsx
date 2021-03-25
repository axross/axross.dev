import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { Mic } from "react-feather";
import { Button, ButtonSize, ButtonVariant } from "./button";

describe("<Button>", () => {
  it("matches the snapshot", () => {
    for (const variant of [ButtonVariant.default, ButtonVariant.inverted]) {
      for (const size of [
        ButtonSize.sm,
        ButtonSize.md,
        ButtonSize.lg,
        ButtonSize.xl,
      ]) {
        for (const hasIcon of [true, false]) {
          for (const hasChildren of [true, false]) {
            const { container } = render(
              <Button
                variant={variant}
                size={size}
                icon={hasIcon ? <Mic /> : undefined}
                data-testid="button"
              >
                {hasChildren ? "Lorem Ipsum" : undefined}
              </Button>
            );

            expect(container).toMatchSnapshot(
              `variant: ${variant}, size: ${size}, icon: ${hasIcon}, children: ${hasChildren}`
            );
          }
        }
      }
    }
  });

  it("calls props.onClick() when it's clicked", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <Button onClick={onClick} data-testid="button" />
    );

    fireEvent.click(getByTestId("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
