import { addDecorator, configure } from '@storybook/react';
import globalStyleDecorator from './globalStyleDecorator';

addDecorator(globalStyleDecorator);

configure(require.context('../common', true, /\.stories\.tsx?$/), module);
