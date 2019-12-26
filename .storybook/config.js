import { addDecorator, configure } from '@storybook/react';
import colorThemeDecorator from './colorThemeDecorator';
import globalStyleDecorator from './globalStyleDecorator';

addDecorator(globalStyleDecorator);
addDecorator(colorThemeDecorator);

configure(require.context('../src', true, /\.stories\.tsx?$/), module);
