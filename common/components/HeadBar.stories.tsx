import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";
import HeadBar from "./HeadBar";

export default {
  title: "HeadBar",
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MemoryRouter>
      <LocaleContext.Provider value={{
        currentLocale: "ja-JP",
        availableLocales: ["ja-JP"],
        isLoading: false,
      }}>
        {children}
      </LocaleContext.Provider>
    </MemoryRouter>
  );
}

export const Normal = () => (
  <Wrapper>
    <HeadBar />
  </Wrapper>
);

export const NoLogo = () => (
  <Wrapper>
    <HeadBar noLogo />
  </Wrapper>
);
