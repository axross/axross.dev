// eslint-disable-next-line import/namespace, import/no-deprecated
import { common, createStarryNight } from "@wooorm/starry-night";
// eslint-disable-next-line import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member
import dartGrammar from "@wooorm/starry-night/source.dart";
// eslint-disable-next-line import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member
import shellGrammar from "@wooorm/starry-night/source.shell";
// eslint-disable-next-line import/no-unresolved
import { type Properties as HastProperties, type Root as HastRoot } from "hast";
import { type JSX } from "react";
// eslint-disable-next-line import/no-namespace
import * as jsxRuntime from "react/jsx-runtime";
/* eslint-disable import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member */
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { visit } from "unist-util-visit";
/* eslint-enable import/namespace, import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member */

/**
 * a rehype plugin that generates the list of heading nodes.
 */
function rehypePrettylightsAttribute(): (tree: HastRoot) => void {
  return (tree) => {
    visit(tree, "element", (node) => {
      const nextProperties: HastProperties = {
        ...node.properties,
        className: [],
      };

      for (const className of node.properties.className as string[]) {
        if (className.startsWith("pl-")) {
          // eslint-disable-next-line @typescript-eslint/no-magic-numbers
          nextProperties[`data-token-${className.slice(3)}`] = "";
        }

        (nextProperties.className as string[]).push(className);
      }

      node.properties = nextProperties;
    });
  };
}

// @ts-expect-error: the react types are missing.
// eslint-disable-next-line @typescript-eslint/naming-convention
const { Fragment, jsx, jsxs } = jsxRuntime;

const grammars = [...common, dartGrammar];

async function syntaxHighlight({
  code,
  lang,
}: {
  code: string;
  lang?: string;
}): Promise<JSX.Element> {
  const starryNight = await createStarryNight(grammars);

  const scope = starryNight.flagToScope(lang ?? "sh");
  const tree = starryNight.highlight(code, scope ?? shellGrammar.scopeName);

  const transformed = unified()
    .use(rehypePrettylightsAttribute)
    .runSync(tree) as HastRoot;

  return unified()
    .use(rehypeReact, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/naming-convention
      Fragment,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      jsx,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      jsxs,
    })
    .stringify(transformed);
}

export { syntaxHighlight };
