import * as React from "react";
import Icon from "./Icon";
import IconColor from "./IconColor";
import IconName from "./IconName";

export default { title: "Components/Icon" };

export const catalog = () => (
  <table>
    <colgroup>
      <col width="24px"></col>
      <col width="120px"></col>
    </colgroup>
    {Array.from(icons.entries()).map(([nameString, name]) => {
      return (
        <tr>
          <td>
            <Icon name={name} fill={IconColor.primaryForeground} />
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
