import * as React from "react";
import Person from "../../entities/Person";
import MyselfContext from "../components/MyselfContext";

export default function useMyself(): Person {
  return React.useContext(MyselfContext);
}
