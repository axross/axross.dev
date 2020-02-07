import * as React from "react";
import { act, create } from "react-test-renderer";
import MockApp from "../../../fixtures/MockApp";
import useLoggingPageView from "./useLoggingPageView";

describe("useLoggingPageView()", () => {
  describe("if Google Analytics SDK is loaded", () => {
    beforeEach(() => {
      globalThis.ga = jest.fn() as any;
    });

    afterEach(() => {
      ((globalThis.ga as any) as jest.Mock).mockRestore();
    });

    it("sets the location (URL) to the current Google Analytics session", async () => {
      function Component() {
        useLoggingPageView();
        
        return null;
      }
  
      await act(async () => {
        create(
          <MockApp url={new URL("https://tests.kohei.dev/?hl=en-US")}>
            <Component />
          </MockApp>
        );
      });

      expect(globalThis.ga).toHaveBeenCalledWith("set", "location", `https://tests.kohei.dev/?hl=en-US`);
    });

    it("sets the document title to the current Google Analytics session", async () => {
      function Component() {
        useLoggingPageView();
        
        return null;
      }
  
      await act(async () => {
        create(
          <MockApp>
            <Component />
          </MockApp>
        );
      });

      expect(globalThis.ga).toHaveBeenCalledWith("set", "title", expect.any(String));
    });

    it("sends a pageview", async () => {
      function Component() {
        useLoggingPageView();
        
        return null;
      }
  
      await act(async () => {
        create(
          <MockApp>
            <Component />
          </MockApp>
        );
      });

      expect(globalThis.ga).toHaveBeenCalledWith("send", "pageview");
    });
  });

  describe("if Google Analytics SDK is not loaded", () => {
    it("doesn't call globalThis.ga()", async () => {
      function Component() {
        useLoggingPageView();
        
        return null;
      }
  
      await act(async () => {
        create(
          <MockApp>
            <Component />
          </MockApp>
        );
      });
    });
  });
});
