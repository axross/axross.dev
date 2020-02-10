import * as React from "react";
import MockApp from "../../fixtures/MockApp";
import HeadBar from "./HeadBar";

export default {
  title: "Components/HeadBar",
  component: HeadBar,
  parameters: { waitForFontLoading: true },
};

export const Normal = () => (
  <MockApp>
    <HeadBar />
  </MockApp>
);

export const NoLogo = () => (
  <MockApp>
    <HeadBar noLogo />
  </MockApp>
);
