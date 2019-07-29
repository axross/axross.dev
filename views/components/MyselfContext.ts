import * as React from "react";
import Person from "../../entities/Person";

const MyselfContext = React.createContext<Person>(undefined as any);

export default MyselfContext;
