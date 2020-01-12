declare module '@mdx-js/runtime' {
  import * as React from 'react';

  type ComponentType =
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'thematicBreak'
    | 'blockquote'
    | 'ul'
    | 'ol'
    | 'li'
    | 'table'
    | 'tr'
    | 'td'
    | 'pre'
    | 'code'
    | 'em'
    | 'strong'
    | 'delete'
    | 'inlineCode'
    | 'hr'
    | 'a'
    | 'img';

  export type Components = {
    [key in ComponentType]?: React.ComponentType<any>
  }

  export interface MDXProps {
    components: Components;
    scope?: Record<string, any>;
    children: React.ReactNode;
  }

  export default class MDX extends React.Component<MDXProps> {}
}
