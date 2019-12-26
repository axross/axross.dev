import { makeDecorator } from '@storybook/addons';
import * as React from 'react';
import ScreenSizeContext from '../src/views/components/ScreenSizeContext';

export default makeDecorator({
  name: 'withScreenSize',
  parameterName: 'screenSize',
  wrapper: (storyFn, context, { parameters }) => {
    const [screenSize, setScreenSize] = React.useState(0);

    React.useEffect(() => {
      if (typeof window === "undefined") return () => {};

      const observer = new ResizeObserver(entries => {
        for (const { contentBoxSize } of entries) {
          console.log(contentBoxSize.inlineSize);

          setScreenSize(contentBoxSize.inlineSize >= 960 ? 1 : 0);
        }
      });

      observer.observe(document.body);
  
      setScreenSize(window.innerWidth >= 960 ? 1 : 0);

      return () => observer.unobserve(document.body);
    });

    return (
      <ScreenSizeContext.Provider value={screenSize}>
        {storyFn(context)}
      </ScreenSizeContext.Provider>
    );
  }
})