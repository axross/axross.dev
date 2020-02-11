import * as React from "react";
import { act, create } from "react-test-renderer";
import MockApp from "../../../fixtures/MockApp";
import Head from "./Head";

describe("<Head>", () => {
  describe("when currentLocale=\"en-US\"", () => {
    it("pushes tags into <head> and they matches with the previous snapshots", async () => {
      const onHeadChange = jest.fn().mockName("onHeadChange");
  
      await act(async () => {
        create(
          <MockApp onHeadChange={onHeadChange} currentLocale="en-US">
            <Head />
          </MockApp>
        );
      });
  
      expect(onHeadChange.mock.calls[0][0]).toMatchSnapshot();
    });
  });

  describe("when currentLocale=\"ja-JP\"", () => {
    it("pushes tags into <head> and they matches with the previous snapshots", async () => {
      const onHeadChange = jest.fn().mockName("onHeadChange");
  
      await act(async () => {
        create(
          <MockApp onHeadChange={onHeadChange} currentLocale="ja-JP">
            <Head />
          </MockApp>
        );
      });
  
      expect(onHeadChange.mock.calls[0][0]).toMatchSnapshot();
    });
  });
});
