import * as React from 'react';
import Text from '../Text';

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function NormalText(props: Props) {
  return <Text {...props as any} />;
}
