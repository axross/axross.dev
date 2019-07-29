import * as React from "react";
import Person from "../../entities/Person";
import MyselfContext from "../components/MyselfContext";

function useMyself(): Person {
  return React.useContext(MyselfContext);
}

export default useMyself;
