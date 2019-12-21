import * as React from 'react';
import TextThemeContext from '../TextThemeContext';

interface Props extends React.Attributes {
  children: React.ReactNode;
}

export default function Deleted({ children }: Props) {
  return (
    <TextThemeContext.Provider value={{ strikeThrough: true }}>
      {children}
    </TextThemeContext.Provider>
  );
}
