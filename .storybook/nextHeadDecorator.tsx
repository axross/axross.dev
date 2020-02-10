import { makeDecorator } from '@storybook/addons';
import { HeadManagerContext } from "next/dist/next-server/lib/head-manager-context";
import HeadManager from "next/dist/client/head-manager";
import * as React from "react";

export default makeDecorator({
  name: 'withNextHead',
  parameterName: 'nextHead',
  wrapper: (storyFn, context) => {
    const headManager = React.useMemo(() => new HeadManager(), []);

    return (
      <HeadManagerContext.Provider value={headManager.updateHead}>
        {storyFn(context)}
      </HeadManagerContext.Provider>
    );
  },
});
