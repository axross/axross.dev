import { type ComponentPropsWithoutRef, type JSX } from "react";
import { CodeBlock as UniversalCodeBlock } from "~/components/code-block/code-block";
import { syntaxHighlight } from "./syntax-highlight";

async function CodeBlock({
  code,
  lang,
  ...props
}: Omit<ComponentPropsWithoutRef<typeof UniversalCodeBlock>, "children"> & {
  code: string;
  lang?: string;
}): Promise<JSX.Element> {
  const children = await syntaxHighlight({ code, lang });

  return (
    <UniversalCodeBlock code={code} {...props}>
      {children}
    </UniversalCodeBlock>
  );
}

export { CodeBlock };
