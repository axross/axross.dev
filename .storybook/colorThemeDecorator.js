import { makeDecorator } from '@storybook/addons';
import * as React from 'react';
import ColorThemeContext from '../src/views/components/ColorThemeContext';
import { DARK, LIGHT } from '../src/views/constant/color';

export default makeDecorator({
  name: 'withColorTheme',
  parameterName: 'colorTheme',
  wrapper: (storyFn, context, { parameters }) => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    React.useEffect(() => {
      if (typeof window === "undefined") return () => {};

      const colorScehemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = e => setIsDarkMode(e.matches);
  
      colorScehemeMediaQuery.addEventListener("change", listener);
  
      setIsDarkMode(colorScehemeMediaQuery.matches);

      return () => colorScehemeMediaQuery.removeEventListener("change", listener);
    });

    return (
      <ColorThemeContext.Provider value={isDarkMode ? DARK : LIGHT}>
        {storyFn(context)}
      </ColorThemeContext.Provider>
    );
  }
})