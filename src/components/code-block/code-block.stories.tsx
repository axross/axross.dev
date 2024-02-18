import { type Meta, type StoryObj } from "@storybook/react";
import { CodeBlock } from "./code-block";

const meta = {
  component: CodeBlock,
  args: {
    code: "",
    children: (
      <>
        <span className="pl-k" data-token-k="">
          {"const"}
        </span>{" "}
        <span className="pl-c1" data-token-c1="">
          {"DarkModeContext"}
        </span>{" "}
        <span className="pl-k" data-token-k="">
          {"="}
        </span>{" "}
        <span className="pl-smi" data-token-smi="">
          {"React"}
        </span>
        {"."}
        <span className="pl-en" data-token-en="">
          {"useContext"}
        </span>
        {"();\n\n"}
        <span className="pl-k" data-token-k="">
          {"function"}
        </span>{" "}
        <span className="pl-en" data-token-en="">
          {"DarkModeProvider"}
        </span>
        {"({ children }) {\n"}
        {"  "}
        <span className="pl-k" data-token-k="">
          {"const"}
        </span>
        {" ["}
        <span className="pl-c1" data-token-c1="">
          {"isDarkMode"}
        </span>
        {", "}
        <span className="pl-c1" data-token-c1="">
          {"setIsDarkMode"}
        </span>
        {"] "}
        <span className="pl-k" data-token-k="">
          {"="}
        </span>{" "}
        <span className="pl-smi" data-token-smi="">
          {"React"}
        </span>
        {"."}
        <span className="pl-en" data-token-en="">
          {"useState"}
        </span>
        {"("}
        <span className="pl-c1" data-token-c1="">
          {"false"}
        </span>
        {");\n\n"}
        {"  "}
        <span className="pl-smi" data-token-smi="">
          {"React"}
        </span>
        {"."}
        <span className="pl-en" data-token-en="">
          {"useEffect"}
        </span>
        {"(() "}
        <span className="pl-k" data-token-k="">
          {"=>"}
        </span>
        {" {\n"}
        {"    "}
        <span className="pl-c" data-token-c="">
          {'// "prefers-color-scheme: dark" に対するMediaQueryListを取得'}
        </span>
        {"\n"}
        {"    "}
        <span className="pl-k" data-token-k="">
          {"const"}
        </span>{" "}
        <span className="pl-c1" data-token-c1="">
          {"mediaQueryList"}
        </span>{" "}
        <span className="pl-k" data-token-k="">
          {"="}
        </span>{" "}
        <span className="pl-c1" data-token-c1="">
          {"window"}
        </span>
        {"."}
        <span className="pl-en" data-token-en="">
          {"matchMedia"}
        </span>
        {"("}
        <span className="pl-s" data-token-s="">
          <span className="pl-pds" data-token-pds="">
            {'"'}
          </span>
          {"(prefers-color-scheme: dark)"}
          <span className="pl-pds" data-token-pds="">
            {'"'}
          </span>
        </span>
        {");\n\n"}
        {"    "}
        <span className="pl-c" data-token-c="">
          {"// 次の行で使うイベントハンドラ"}
        </span>
        {"\n"}
        {"    "}
        <span className="pl-c" data-token-c="">
          {
            "// ダークモードがオンならe.matchesはtrueになり、オフならfalseになる"
          }
        </span>
        {"\n"}
        {"    "}
        <span className="pl-k" data-token-k="">
          {"const"}
        </span>{" "}
        <span className="pl-c1" data-token-c1="">
          {"listener"}
        </span>{" "}
        <span className="pl-k" data-token-k="">
          {"="}
        </span>{" "}
        <span className="pl-smi" data-token-smi="">
          {"e"}
        </span>{" "}
        <span className="pl-k" data-token-k="">
          {"=>"}
        </span>{" "}
        <span className="pl-en" data-token-en="">
          {"setDarkMode"}
        </span>
        {"("}
        <span className="pl-smi" data-token-smi="">
          {"e"}
        </span>
        {"."}
        <span className="pl-smi" data-token-smi="">
          {"matches"}
        </span>
        {");\n\n"}
        {"    "}
        <span className="pl-c" data-token-c="">
          {
            "// ダークモードのオン・オフが切り替わった時にchangeイベントが発火される"
          }
        </span>
        {"\n"}
        {"    "}
        <span className="pl-smi" data-token-smi="">
          {"mediaQueryList"}
        </span>
        {"."}
        <span className="pl-c1" data-token-c1="">
          {"addEventListener"}
        </span>
        {"("}
        <span className="pl-s" data-token-s="">
          <span className="pl-pds" data-token-pds="">
            {'"'}
          </span>
          {"change"}
          <span className="pl-pds" data-token-pds="">
            {'"'}
          </span>
        </span>
        {", listener);\n\n"}
        {"    "}
        <span className="pl-c" data-token-c="">
          {
            "// このコンポーネントがレンダーツリーから外れた時にはchangeイベントへの監視を解除する"
          }
        </span>
        {"\n"}
        {"    "}
        <span className="pl-k" data-token-k="">
          {"return"}
        </span>
        {" () "}
        <span className="pl-k" data-token-k="">
          {"=>"}
        </span>{" "}
        <span className="pl-smi" data-token-smi="">
          {"mediaQueryList"}
        </span>
        {"."}
        <span className="pl-c1" data-token-c1="">
          {"removeEventListener"}
        </span>
        {"("}
        <span className="pl-s" data-token-s="">
          <span className="pl-pds" data-token-pds="">
            {'"'}
          </span>
          {"change"}
          <span className="pl-pds" data-token-pds="">
            {'"'}
          </span>
        </span>
        {", listener);\n"}
        {"  });\n\n"}
        {"  "}
        <span className="pl-c" data-token-c="">
          {"// Contextを通じて子孫要素にダークモードかどうかを伝搬する"}
        </span>
        {"\n"}
        {"  "}
        <span className="pl-k" data-token-k="">
          {"return"}
        </span>
        {" (\n"}
        {"    "}
        <span className="pl-k" data-token-k="">
          {"<"}
        </span>
        <span className="pl-smi" data-token-smi="">
          {"DarkModeContext"}
        </span>
        {"."}
        <span className="pl-smi" data-token-smi="">
          {"Provider"}
        </span>
        {" value"}
        <span className="pl-k" data-token-k="">
          {"="}
        </span>
        {"{isDarkMode}"}
        <span className="pl-k" data-token-k="">
          {">"}
        </span>
        {"\n"}
        {"      {children}\n"}
        {"    "}
        <span className="pl-k" data-token-k="">
          {"</"}
        </span>
        <span className="pl-smi" data-token-smi="">
          {"DarkModeContext"}
        </span>
        {"."}
        <span className="pl-smi" data-token-smi="">
          {"Provider"}
        </span>
        <span className="pl-k" data-token-k="">
          {">"}
        </span>
        {"\n"}
        {"  );\n"}
        {"}\n\n"}
        <span className="pl-k" data-token-k="">
          {"function"}
        </span>{" "}
        <span className="pl-en" data-token-en="">
          {"SomeComponent"}
        </span>
        {"() {\n"}
        {"  "}
        <span className="pl-c" data-token-c="">
          {"// コンテキストを通じてダークモードかどうかを判別する"}
        </span>
        {"\n"}
        {"  "}
        <span className="pl-k" data-token-k="">
          {"const"}
        </span>{" "}
        <span className="pl-c1" data-token-c1="">
          {"isDarkMode"}
        </span>{" "}
        <span className="pl-k" data-token-k="">
          {"="}
        </span>{" "}
        <span className="pl-smi" data-token-smi="">
          {"React"}
        </span>
        {"."}
        <span className="pl-en" data-token-en="">
          {"useContext"}
        </span>
        {"(DarkModeContext);\n\n"}
        {"  "}
        <span className="pl-k" data-token-k="">
          {"return"}
        </span>
        {" isDarkMode "}
        <span className="pl-k" data-token-k="">
          {"?"}
        </span>{" "}
        <span className="pl-k" data-token-k="">
          {"<"}
        </span>
        {"AnotherDarkComponent "}
        <span className="pl-k" data-token-k="">
          {"/>"}
        </span>{" "}
        <span className="pl-k" data-token-k="">
          {":"}
        </span>{" "}
        <span className="pl-k" data-token-k="">
          {"<"}
        </span>
        {"AnotherLightComponent "}
        <span className="pl-k" data-token-k="">
          {"/>"}
        </span>
        {";\n"}
        {"}\n"}
      </>
    ),
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const NarrowViewport: Story = {
  args: {
    style: {},
  },
};
