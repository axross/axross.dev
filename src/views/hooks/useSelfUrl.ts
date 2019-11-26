import * as React from "react";
import SelfUrlContext from "../components/SelfUrlContext";

export default function useSelfUrl(): URL {
  return new URL(React.useContext(SelfUrlContext).href);
}
