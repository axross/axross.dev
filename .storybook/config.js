import { addDecorator, configure } from '@storybook/react';
import colorThemeDecorator from './colorThemeDecorator';
import globalStyleDecorator from './globalStyleDecorator';
import screenSizeDecorator from './screenSizeDecorator';

addDecorator(globalStyleDecorator);
addDecorator(colorThemeDecorator);
addDecorator(screenSizeDecorator);

configure(require.context('../src', true, /\.stories\.tsx?$/), module);
