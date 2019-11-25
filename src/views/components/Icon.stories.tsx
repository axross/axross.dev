import * as React from "react";
import Icon, { IconName } from "./Icon";
import { ForegroundColor } from "../constant/color";

export default { title: "Icon" };

export const catalog = () => (
  <table>
    <colgroup>
      <col width="24px"></col>
      <col width="120px"></col>
    </colgroup>
    {Array.from(icons.entries()).map(([nameString, name]) => {
      console.log(nameString, name);

      return (
        <tr>
          <td>
            <Icon name={name} fill={ForegroundColor.primary} />
          </td>
          <td>{nameString}</td>
        </tr>
      );
    })}
  </table>
);

const icons = new Map([
  ["IconName.facebook", IconName.facebook],
  ["IconName.github", IconName.github],
  ["IconName.instagram", IconName.instagram],
  ["IconName.linkedIn", IconName.linkedIn]
]);
