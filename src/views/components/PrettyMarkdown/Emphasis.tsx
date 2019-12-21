import * as React from 'react';
import TextThemeContext from '../TextThemeContext';

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function Emphasis({ children }: Props) {
  return (
    <TextThemeContext.Provider value={{ italic: true }}>
      {children}
    </TextThemeContext.Provider>
  );
}
