import { describe, expect, it, jest } from "@jest/globals";
import * as React from "react";
import { act, create } from "react-test-renderer";
import useURL, { URLContext } from "./useURL";

describe("useURL()", () => {
  it("retrieves an URL through a context", async () => {
    const fn = jest.fn();
    const url = Symbol();

    function Component() {
      fn(useURL());

      return null;
    }

    await act(async () => {
      create(
        <URLContext.Provider value={url as any}>
          <Component />
        </URLContext.Provider>
      );
    });

    expect(fn).toHaveBeenCalledWith(url);
  });
});
