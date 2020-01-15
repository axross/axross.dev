import * as React from "react";
import MockApp from "../../fixtures/MockApp";
import HeadBar from "./HeadBar";

export default {
  title: "HeadBar",
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
