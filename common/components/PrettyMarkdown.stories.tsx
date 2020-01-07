import { withKnobs, text } from "@storybook/addon-knobs";
import * as React from "react";
import PrettyMarkdown from "./PrettyMarkdown";

export default {
  title: "PrettyMarkdown",
  decorators: [withKnobs]
};

export const articleA = () => (
  <div style={{ padding: 48 }}>
    <PrettyMarkdown>{ARTICLE_A.trim()}</PrettyMarkdown>
  </div>
);

export const articleB = () => (
  <div style={{ padding: 48 }}>
    <PrettyMarkdown>{ARTICLE_B.trim()}</PrettyMarkdown>
  </div>
);

export const articleC = () => (
  <div style={{ padding: 48 }}>
    <PrettyMarkdown>{ARTICLE_C.trim()}</PrettyMarkdown>
  </div>
);

export const playground = () => (
  <PrettyMarkdown children={text("children", "")} />
);

const ARTICLE_A = `
I launched iOS/Android apps made of [Flutter](https://flutter.dev/) to app stores for the first time. *It's a tool to calculate win rates for each hands or hand ranges up to 10 players.* ~~Not just a Flutter app.~~

![Aqua](https://videos.ctfassets.net/2mfcuy3p355s/2WCN3uamkggk0Z9Nc9XMwr/04e281d037c5e32e6dc241cea1f96501/aqua_video__2___2_.mp4)

## Download

[![Get it on Google Play](https://images.ctfassets.net/2mfcuy3p355s/6SDbf9kI8c62otwgfhLQHs/aa194b97f5ebe1d7def23e0226bd943f/get-it-on-google-play.png)](https://play.google.com/store/apps/details?id=app.axross.aqua&hl=ja) [![Download on the App Store](https://images.ctfassets.net/2mfcuy3p355s/3Na9uTH1gjRLi6XsT53iTA/b53165822f5bf546eb297432a112b81c/download-on-the-app-store.png)](https://apps.apple.com/jp/app/odds-calculator-for-poker/id1485519383)

This app is open source. [You can refer the code from here.](https://github.com/axross/aqua) **It would be really grateful if you leave a review at the app stores or star in the GitHub repository.**

## Implementation
Calculation process is just Monte Carlo method, which is trying randomly certain times and get average of that. In the real poker game, players guess what kind of cards the opponents have. This application is for such situation, so it's really impossible to calculate all possibilities because the time complexity will be O(n^m) at least.

Even the calculation in Monte Carlo method takes a lot of computation resource. You cannot do it in UI thread. So what I do is spawn a thread for calculation that communicates with UI thread. Flutter (if anything, Dart) has [Isolate](https://api.dartlang.org/stable/2.6.0/dart-isolate/dart-isolate-library.html), which is an abstract API for multi threading/processing. This app uses that.

## Did it hard to launch Flutter app?
No. But I recommend you to have experience of both of iOS and Android development. Coding part is well-wrapped by Flutter, therefore, you don't need any knowledge about Java, Swift, Xcode, Android and something like that. But in order to submit the app to the app stores, you will need to know about signing the app with a certification, minifying the app, building the app for each architecture of devices.

### Multithreading
Isolate is really easy to use. As long as you want to do some simple multithreading, you will suffer from nothing. Isolate has some restriction in good way, so that it is on safe and simple API, also stands as guideline like as Golang's Goroutine.

### Animation
Flutter supports sequence animations and tween animations.

![Flutter Tween Animation Example](https://videos.ctfassets.net/2mfcuy3p355s/4jPAo53HynNcYyE32mgJhV/1f83b17f483853f2bb903cd61ec05043/RPReplay_Final1574145129__2___1_.mp4) ![Flutter Tween Animation Example](https://videos.ctfassets.net/2mfcuy3p355s/5bER0UCiqkHJH1JyOx7f38/903960c488a9f719f6ab3063b51adfe4/RPReplay_Final1574145112__2___1_.mp4)

I didn't implement so complicated animation, but I feel animation in Flutter is much easier and more familiar than DOM's. Because Flutter's rendering is high performance and any property of UI is able to be used in animation.

### Dark mode
Flutter has [MediaQuery](https://api.flutter.dev/flutter/widgets/MediaQuery-class.html) API, which enables to obtain device information and OS settings such as:

- Display metrics and orientation
- Whether bold fonts are preferred (iOS)
- Whether 24-hour time format is used

Flutter has [InheritedWidget](https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html) that is same propagation model with [React's context](https://reactjs.org/docs/context.html). MediaQuery is on that. So you really easily can apply dark mode depending on users' OS setting to UI.

![Aqua Light Theme](https://images.ctfassets.net/2mfcuy3p355s/4wUlHSe9lu5HIhSp2l4Nu7/dcf69db200084b28f4b1b029d38e1691/light-theme__2___2_.png) ![Aqua Dark Theme](https://images.ctfassets.net/2mfcuy3p355s/42s0jUhzGUqahmL9VKjfIs/d6a2363592888fd606c293342eacb4a1/dark-theme__2___1_.png)

## What Flutter isn't good for?
### Using ads
Flutter doesn't use platform's original UI framework at all. Instead of that, Flutter mounts a canvas to entire the screen and renders UI with its own rendering system. Therefore, sometimes Flutter's rendering performance exceeds native's one. However, as for ads, it's not really good with Flutter because usually they serves a SDK that is implemented on native UI framework.

### Using camera
Camera is also in the same situation. If you want to make camera apps such as Instagram or Snapchat, it's also quite hard. Because Flutter doesn't support camera by itself. In order to use camera, you'll call native API and it will rendered on native UI framework.
`;

const ARTICLE_B = `
ある企業の面接を受けた時にContent Security Policyについて質問されて、あまりきちんと答えられなかったので調査しつつ、このウェブサイトで試験的に利用してみることにしました。調査している中で色々わかったので共有します。

Content Security Policyは画像、動画、JavaScript、CSSなどのアセットの読み込みや、\`<iframe>\` やWeb Workerの読み込み、XHRやFetchによるリソースの読み込みをポリシーの宣言によって制限できるものです。

インラインのCSSやJavaScriptの実行も制限でき、ユーザーが書き込んだコンテンツに混入してしまった \`<script>\` や \`<button onclick="">\` によるXSSも防止できます。

## ディレクティブ
Content Security Policyはディレクティブと呼ばれるキーバリュー形式のセットによって設定します。ディレクティブを設定する方法は2種類あります。

- HTTPレスポンスヘッダで設定する
    - \`Content-Security-Policy: <directive>; <directive>\`
- \`<meta>\` 要素で設定する
    - \`<meta http-equiv="Content-Security-Policy" content="<directive>; <directive>">\`

### ディレクティブの種類 (抜粋)
- \`default-src\` : 以下の設定のフォールバック先となるもの。たとえばFetchは \`connect-src\` を参照した後、対応するものがなければ \`default-src\` を参照する
- \`connect-src\` : XHRやFetchによる読み込み
- \`script-src\` : JavaScriptの読み込み
    - \`<script src="...">\` による読み込みだけでなく、 \`<script> ... </script>\` や \`<button onclick="alert(1)">\` のようなインラインスクリプトの実行を抑制する設定もある

    qweqweqe
- \`style-src\` : CSSの読み込み
    - \`script-src\` と同じように \`<link href="..." rel="stylesheet" type="text/css">\` による読み込みだけでなく \`<style>...</style>\` や \`<button style="...">\` のようなインラインスタイルもカバーする
- \`img-src\` : \`<img>\` とFaviconの読み込み
- \`media-src\` : \`<video>\` と \`<audio>\` による読み込み
- \`prefetch-src\` : \`<link rel="prefetch">\` や \`<link rel="prerender">\` による読み込み
- \`frame-src\` : \`<iframe>\` による読み込み

## \`Content-Security-Policy-Report-Only\`
\`Content-Security-Policy\` をHTTPリクエストヘッダまたは \`<meta>\` 要素で設定すると、ポリシーに抵触したリソースの読み込みや実行がすべてブロックされます。ポリシーの宣言が間違っていると、最低限必要なCSSやJavaScriptが実行されず、ウェブサイトそのものが利用できないということになりかねません。

例えばGoogle Analyticsを利用しているウェブサイトではGoogle Analyticsが行う通信を許可する必要があります。Google Analyticsは \`<img>\` 要素によるGETリクエストで通信するので、通信先のオリジンを \`img-src\` に追加しなければなりません。これを忘れると、Google Analyticsに一切データが集まらなくなってしまいます。

\`Content-Security-Policy\` の代わりに \`Content-Security-Policy-Report-Only\` を利用すると、ポリシーに抵触した際にブロックせず、代わりに報告するのみになります。\`Content-Security-Policy-Report-Only\` にはまったく同じ内容を設定できるので、HTTPリクエストヘッダで設定している場合はヘッダ名を置き換えるだけで動作します。ポリシーにどう抵触したかは \`report-uri\` ディレクティブに宣言したURLにJSONで送信され、ChromeであればDeveloper ToolsのConsoleタブにも表示されます。

![Content Security Policy on Console](//images.ctfassets.net/2mfcuy3p355s/1oWhYr7YeNky58LHICVmuy/85f3f4e0255aa54a214fc5dbeb76a4ed/Screen_Shot_2019-12-09_at_21.40.39.png)

これは宣言したポリシーが正しいか開発環境で確認する時や、テスト段階の際にプロダクションでデータを集めたりするのに役立ちます。

https://report-uri.com のような \`Content-Security-Policy-Report-Only\` のレポートの送信先として利用できるWebサービスもあります。集められたポリシー抵触をダッシュボードで確認できて便利です。

![The Dashboard of report-uri.io](//images.ctfassets.net/2mfcuy3p355s/DQceKmwjIPk3RazusFo5C/c11a0d2e959d576c37deaa5749973365/PixelSnap_2019-12-09_at_17.43.32_2x.png)

## \`default-src 'none'\` が一番が厳しい設定
Content Security Policyの宣言はディレクティブごとにホワイトリストです。例えば \`img-src 'self'\` にしておくと画像ファイルの読み込みは同一オリジンからのみ許可する設定となりますが、そもそも \`img-src\` ディレクティブを宣言していなければあらゆる画像ファイルの読み込みが許可されます。

潜在的なXSSの実行を防ぐためには、まずは \`default-src\` ディクレクティブを宣言し、 \`'none'\` をソースとして指定しておくのと良いです。Content Security Policyが以下のように \`default-src 'none'\` のみになっていれば、これが最も厳しいポリシーです。何の読み込みも許可されません。

\`\`\`
Content-Security-Policy default-src 'none'
\`\`\`

\`default-src\` はいろいろなリソース読み込みのフォールバック先となるので、 以下のように \`img-src\` を追加すると、 \`https://google.com\` からの画像ファイルのみ許可し、他はすべてブロックされます。

\`\`\`
Content-Security-Policy default-src 'none'; img-src https://google.com
\`\`\`

このような形で \`Content-Security-Policy-Report-Only\` を駆使して、必要なディレクティブとオリジンだけを宣言していって最小の設定にするのがセキュリティの最も高い設定になります。 

## \`script-src\` と \`default-src\` にの設定にはより注意
ひとたびXSSが発生すると、あらゆる方法でのリソースの読み込みや実行が考えられます。とくに、以下のソースの利用は気をつけてください。いずれもXSSによって発生させられる可能性のある読み込み/実行のソースです。

- \`'unsafe-inline'\`
- \`'unsafe-eval'\`
- \`data:\`

とくに \`'unsafe-inline'\` をインラインスクリプトやインラインスタイルのために利用するのは避けましょう。代わりに、インラインスクリプトやインラインスタイルの中身の文字列のSHA256ハッシュ値を取得し、 \`'sha256-<hashed value>'\` という形でソースとして利用できます。

以下は例として、このウェブサイトのGoogle Analytics用のインラインスクリプトを許可しているディレクティブです。この形式でなら実行されてもよいインラインスクリプトを個別に指定できます。

\`\`\`
Content-Security-Policy: script-src 'sha256-6DELbQJmrBPpBmoPBeNHhSHAD6sidc72qGApkgX4m0E='
\`\`\`

当然ホワイトスペースや改行文字の有無でハッシュ値が変わるので注意しましょう。Google AnalyticsやFacebookなどのサードパーティのSDKのインラインスクリプトをフロントエンドで利用している時は、ひとまず何も許可せずにChromeのDeveloper ToolsのConsoleタブを見ると良いです。抵触したインラインスクリプトをハッシュ化して自動生成されたソースが確認でき、これをそのまま利用するだけで設定できて便利です。

![Content Security Policy Source Auto Generating](//images.ctfassets.net/2mfcuy3p355s/6RAO5o3tjfuwXmf90PTjrF/3e1f1996d44d7e175b90c721fa8f8911/Screen_Shot_2019-12-09_at_17.13.02.png)

## Web Extensionsが抵触することがある
ChromeやSafariなどの拡張機能であるWeb ExtensionsはWebページ内のDOMに干渉でき、表示の拡張を目的として画像ファイルを利用することがあります。これもContent Security Policyのチェック項目に含まれ抵触することがあります。

多くのWeb Extensionsはオフラインでも利用できるようにローカルファイルや \`data:image/png,...\` といったData URIで画像ファイルを読み込みます。中でもData URIで画像ファイルを読み込んでいるものは対処が難しいです。

Data URIはMIME Typeとコンテンツを自由に設定できるので、例えば \`data:text/html,<script>alert('hi');</script>\` とするとXSS攻撃が可能です。そのため \`data:\` をContent Security Policyのソースとして許可するわけにはいきません。

![Content Security Policy Blocks Web Extensions](//images.ctfassets.net/2mfcuy3p355s/3H61s9YM21x8lKJyGcZai6/a92f9be269d2a2a33f783bdbd823aff2/Screen_Shot_2019-12-09_at_16.02.33.png)

![Web Extensions Use Data URI Images](//images.ctfassets.net/2mfcuy3p355s/6BmwzVoVJ3ZEfKBWV6iRAq/ace1be3c0c3f194d0d55c0542399f8ad/Screen_Shot_2019-12-09_at_16.02.23.png)

これは僕も解決法を見つけていないので、知っている方がいればぜひご一報ください...。
`;

const ARTICLE_C = `
あけましておめでとうございます。年末の空いた時間を利用してこのWebサイトでローディングプレースホルダーを表示するようにしたので、その紹介をしたいと思います。

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
`;
