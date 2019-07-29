import * as React from "react";
import SelfUrlContext from "../components/SelfUrlContext";

function useSelfUrl(): URL {
  return new URL(React.useContext(SelfUrlContext).href);
}

export default useSelfUrl;
