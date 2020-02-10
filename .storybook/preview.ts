import { addDecorator } from '@storybook/react';
import nextHeadDecorator from './nextHeadDecorator';
import globalStyleDecorator from './globalStyleDecorator';

addDecorator(nextHeadDecorator);
addDecorator(globalStyleDecorator);
