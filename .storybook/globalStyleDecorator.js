import { makeDecorator } from '@storybook/addons';
import GlobalStyle from '../src/views/components/GlobalStyle';

export default makeDecorator({
  name: 'withGlobalStyle',
  parameterName: 'globalStyle',
  wrapper: (storyFn, context, { parameters }) => {
    // Do something with `parameters`, which are set via { something: ... }

    // Note you may alter the story output if you like, although generally that's
    // not advised

    return (
      <>
        <GlobalStyle />

        {storyFn(context)}
      </>
    );
  }
})