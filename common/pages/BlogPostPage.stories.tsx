import * as React from "react";
import MockApp from "../../fixtures/MockApp";
import BlogPostPage from "./BlogPostPage";

export default { title: "BlogPostPage" };

export const Loaded = () => (
  <MockApp>
    <BlogPostPage
      blogPost={BLOG_POST}
      blogPostLoading={false}
    />
  </MockApp>
);

export const Loading = () => (
  <MockApp>
    <BlogPostPage
      blogPost={null}
      blogPostLoading={true}
    />
  </MockApp>
);

export const Unavailable = () => (
  <MockApp>
    <BlogPostPage
      blogPost={null}
      blogPostLoading={false}
    />
  </MockApp>
);

const BLOG_POST = {
  id: "blog-post-id",
  createdAt: new Date(),
  lastModifiedAt: new Date(),
  title: "React Content Loaderでローディングプレースホルダーを実装する",
  summary: "年末の空いた時間を利用してこのWebサイトでローディングプレースホルダーを表示するようにしたので、その紹介をしたいと思います。",
  body: `あけましておめでとうございます。年末の空いた時間を利用してこのWebサイトでローディングプレースホルダーを表示するようにしたので、その紹介をしたいと思います。

**ローディングプレースホルダー**というのは、データの取得などでユーザーに待ってもらう間、実際のコンテンツに似た形状のローディング表示をするUIのことです。

古くから使われている丸い形のローディング表示は**スピナー**と呼ばれていますが、スピナーと違って**実際のコンテンツに似ているので視線を自然にコンテンツが表示される位置に誘導でき**、また仮の表示でコンテンツの空白を埋められるので、徐々にコンテンツが読み込まれていく時に起こるガタガタ感を軽減することができます。

## React Content Loader
📦 \`react-content-loader\` はSVGにクリップパスを当てることで複数の矩形要素を横断したアニメーションでローディングプレースホルダーを実装できるライブラリです。

> **danilowoz/react-content-loader**  
> *[https://github.com/danilowoz/react-content-loader](https://github.com/danilowoz/react-content-loader)*
> 
> ちなみにVue版の **[egoist/vue-content-loader](https://github.com/egoist/vue-content-loader)** やAngular版の **[ngneat/content-loader](https://github.com/ngneat/content-loader)** などもあります。使い方は同じです。

\`<ContentLoader>\` というReactコンポーネントがexportされているので、この中に \`<rect>\` や \`<circle>\` を入れていきます。ローディング完了後に表示される実際のコンテンツからサイズやポジションを計算して \`<rect>\` を作ります。たとえばこのWebサイトのブログ記事ページは読み込み中に次のような表示になっています。端末をオフラインにして言語を切り替えようとすると試せます。

> **2020/01/06 追記**  
> 現在はService Workerによるオフライン対応が施されているので、再現にはキャッシュを全て消した上で端末をオフラインにする必要があります。

![Loading Placeholder Example](//images.ctfassets.net/2mfcuy3p355s/7oVtWb6lYFZ7S8tGE72RcG/86f15afd15b08262e21c3592eb9710ff/loading-placeholder2.png)

一般的にテキストには文字のサイズ (\`font-size\`) と行間 (\`line-height\`) があります。これらを意識して \`<rect>\` を作っていくとかなりそれっぽくなります。

とはいえ \`<rect>\` に \`line-height\` はありませんので、 \`font-size\` と加味して \`x\` と \`height\` で表示位置を設定します。考え方は次の画像のようになります。

![Calculating the Layout for Loading Placeholder](//images.ctfassets.net/2mfcuy3p355s/2JCv40XkmJBQZ0YZFUU2XN/27d51693f3d370e01ce557e9bb5e650a/loading-placeholder.png)

これをReactのJSXで表現すると次のようになります。

\`\`\`css
/* 記事の本文のCSS (実際とは異なりますが参考として) */
p {
  font-size: 16px;
  line-height: 1.75;
}
\`\`\`

\`\`\`jsx
// line-heightの1.75をpx換算すると28px
// テキストの上下に (28 - 16) / 2 = 6pxの空白があることになる
<ContentLoader>
  {/* テキストの上に空白があるので一行目は y=6px になる */}
  <rect x="0" y="6px" width="100%" height="16px" />

  {/* 2行目以降は 前の行のy + 16px + 12px */}
  <rect x="0" y="34px" width="100%" height="16px" />
  <rect x="0" y="62px" width="40%" height="16px" />
</ContentLoader>
\`\`\`

## ダークモードに対応する
塗りつぶしの色に透明度を持たせればダークモードでもそれなりの見た目になりますが、背景がピュアな黒でない時などは違和感があるかもしれません。実際このWebサイトの背景色は \`#11181f\` で、うっすら青色が強いです。こういう場合はSVGの塗りつぶしの定義となる \`<linearGradient>\` 要素内にある \`<stop>\` 要素にメディアクエリで別々の色を当てるようにするとよいです。

\`\`\`css
/* 実際にはsvg要素の代わりにclassを指定してください */
svg > defs > linearGradient > stop:nth-of-type(2n) {
  stop-color: #e0e4e9;
}

svg > defs > linearGradient > stop:nth-of-type(2n + 1) {
  stop-color: #eff2f4;
}

@media (prefers-color-scheme: dark) {
  svg > defs > linearGradient > stop:nth-of-type(2n) {
    stop-color: #1e2730;
  }

  svg > defs > linearGradient > stop:nth-of-type(2n + 1) {
    stop-color: #2d3641;
  }
}
\`\`\`

このWebサイトはStyled Componentsを利用しているので各要素の参照は \`&\` というシンボルを介しています。[ソースコードはこちらです。](https://github.com/axross/kohei.dev/blob/4b3e3308a451f6445b88571895037b5624ce220b/common/components/ContentLoader.tsx#L34-L54)

## レスポンシブにする
SVGはHTMLに埋め込めるベクター画像のようなものなのでアスペクト比を維持してしまうと、幅に応じて高さが自動的に変わってしまい不自然です。次のことに気をつけましょう。

- 塗りつぶしの定義要素 (\`<rect>\` や \`<circle>\` など) の \`width\` や \`height\` をパーセンテージで定義する
- \`viewBox\` や \`preserveAspectRatio\` をデフォルト値のまま変えない
- \`width\` と \`height\` を計算して定義しておく
  - 文字サイズ、余白などでの合計 \`height\` を算出して固定しておく ([サンプル](https://github.com/axross/kohei.dev/blob/4b3e3308a451f6445b88571895037b5624ce220b/common/pages/BlogPostPage/ArticleLoader.tsx#L40-L47)) 。
  
    そんなことよりうんこうんこー！

## 既知の問題: \`<base>\` との併用
React Content LoaderはSVG要素のクリップパス (塗りつぶしをどう切り抜くか) やグラデーションの定義に相対パスでの \`url()\` を利用しているので、 \`<base>\` 要素を \`<head>\` 内に定義している場合は黒い塗りつぶしが表示されてしまいうまく動きません。クリップパスやグラデーションの定義にURLでたどり着けないためです。

Safariでのみこの問題が発生するのでSafariでのバグのように感じてしまいますが、[SVG WGの見解によるとそれが正しい挙動なようです。](https://www.w3.org/2015/08/25-svg-minutes.html#item08) \`<ContentLoader>\` Reactコンポーネントに \`baseUrl\` というPropsがあるのでそれを利用して \`url()\` にプレフィックスを付与するか、 \`<base>\` 要素を使わないようにするなどして回避しましょう。

> Webpackを利用している場合は \`webpack.config.js\` で \`output.publicPath\` を設定するなどすれば大抵の場合は \`<base>\` 要素が必要なくなります。

## まとめ
- ローディング中のうちにユーザーの視線を誘導するためにローディングプレースホルダーを使いましょう
- 視線を正しく誘導するためにローディングプレースホルダーを実際のコンテンツに似せましょう

そんなわけで、今年もよろしくお願いします！
`,
};
