import { withKnobs, text } from "@storybook/addon-knobs";
import * as React from "react";
import PrettyMarkdown from "./PrettyMarkdown/PrettyMarkdown";

export default {
  title: "PrettyMarkdown",
  decorators: [withKnobs]
};

export const articleA = () => (
  <div style={{ padding: 48 }}>
    <PrettyMarkdown>
      {ARTICLE_A.trim()}
    </PrettyMarkdown>
  </div>
);

export const articleB = () => (
  <div style={{ padding: 48 }}>
    <PrettyMarkdown>
      {ARTICLE_B.trim()}
    </PrettyMarkdown>
  </div>
);

export const articleC = () => (
  <div style={{ padding: 48 }}>
    <PrettyMarkdown>
      {ARTICLE_C.trim()}
    </PrettyMarkdown>
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
The previous time I went over, Next.js was version 7 or 8, I guess. There was a lot of workarounds neccessary and I didn’t feel it worth and gave up to use it because of the cost for workarounds and the outcome from the framework didn't balance. Recently I needed to research how good Next.js 9 is and I made this website using it in order to go over. Here is tips what I run into throughout making this website.

## Next.js is now TypeScript
Basically Next.js 9 is fully typed. Before this, you needed to install a plugin to use TypeScript and add a few configs in \`next.config.js\` and \`.babelrc\`. But now you need nothing. Next.js 9 looks totally TypeScript! In fact, there’s Babel is running backside, but you almost never need to care it.

> \`"esModuleInterop": true\` in \`tsconfig.json\` is supposed to be set for Babel, however, it will be automatically added if it’s not set. 

## Write “universal” code in general and “isomorphic” code in \`getInitialProps()\`
All code you wrote will run on both of browsers and Node. At the initial access for each route component, it runs on Node from \`getInitialProps()\` as its starting point. After it’s served as a client-side code, it runs as a single page application, which means each route component runs on the browser from \`getInitialProps()\`. Therefore, **everything in Next.js is supposed to be “universal”.**

> **Universal**: Not dependent to the platform. No reference to APIs only available on browsers or Node such as \`window\` nor \`require("fs")\` . Only using JavaScript’s standard APIs.
> 
> **Isomorphic**: Runs on both of browsers and Node but the code is not universal. Even like it refers to \`window\`, it checks whether it’s available (e.g. \`if (typeof window !== "undefined")\`). Use another way to do something equivalent if it’s not unavailable.

However, \`getInitialProps()\` has arguments \`req\` and \`res\` when it’s called for server-side rendering. **You can distinguish the running platform and fill the difference. This is “isomorphic”.** Here is the code to detect user’s locale isomorphicly (I wrote this for the website but I didn’t use for some reason eventually):

\`\`\`typescript
import * as http from 'http';
import { NextPageContext } from 'next';

SomePageRoute.getInitialProps = ({ req } :NextPageContext) => {
  const locale = decideLocale(req);
}

// returns the most desired locale
function decideLocale(req?: http.IncommingMessage): string {
  if (req) {
    // access to HTTP request headers if there's req
    const acceptLanguage = req.headers["accept-language"];

    if (acceptLanguage) {
      const requestedLocales = acceptLanguage.split(",").map(part => {
        const [locale, priority] = part.trim().split(";q=");

        return { locale, priority: parseInt(priority) };
      });

      // sort requested locales by their priority
      requestedLocales.sort((a, b) => b.priority - a.priority);

      return requestedLocales.find(({ locale }) => locale !== '*') || DEFAULT_LOCALE;
    }
  }

  if (typeof navigator !== 'undefined') {
    // navigator is only available on the browser
    return navigator.languages[0]
  }

  return DEFAULT_LOCALE;
}

const DEFAULT_LOCALE = "en-US"
\`\`\`

## Must create \`_document.tsx\` and \`_app.tsx\`
There two are supposed to be placed in \`pages/\`, however, these are not routes. You can create \`_document.tsx\` to change the output HTML structure. Every route components are going to be wrapped by \`<App>\` component by creating \`_app.tsx\`.

**The default output of Next.js doesn’t have \`<html>\`’s \`lang\` attribute.** You need to set it by yourself ([example](https://github.com/axross/axross.dev/blob/9a396055f59a8ef8428b80b3682a38afb33c351d/pages/_document.tsx#L21)). In addition, I recommend you to add \`<meta>\` elements exactly same throughout every route such as \`<meta name="viewport" >\` and \`<meta name="theme-color" >\` there (if you want to set \`<meta>\` elements individually, you can use Next.js’s \`<Head>\` component).

\`\`\`tsx
import * as React from "react";
import Document, { DocumentContext, Html, Head, Main, NextScript } from "next/document";

interface Props {
  locale: "en-US" | "ja-JP";
}

class CustomDocument extends Document<Props> {
  render() {
    return (
      <Html lang={this.props.locale.split("-")[0]}>
        <Head>
          <meta name="viewport" content="width=device-width,height=device-height" key="viewport" />
          <link rel="shortcut icon" href="/static/shortcut-icon.png" key="shortcutIcon" />
          <meta name="theme-color" content="#087da1" key="themeColor" />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
\`\`\`

\`_app.tsx\` is useful to mount some common element throughout every page such as navigation bars. Furthermore, **it’s also best way to provide certain objects to descendants by [React  Context](https://reactjs.org/docs/context.html) (this is well-known pattern to make dependency injection).** I supply descendant components “current locale“, “placeholder text for translation” and something like that ([example](https://github.com/axross/axross.dev/blob/9a396055f59a8ef8428b80b3682a38afb33c351d/pages/_app.tsx#L21-L47)). Here is also the example code for the case that you make a web application and provide “authentication state”.

\`\`\`tsx
import * as React from "react";
import NextApp, { AppContext, Container } from "next/app";
import Session from "(somewhere...)";
import getAuthenticationSession from "(somewhere...)";

interface Props {
  session: Session;
  pageProps: any;
}

class App extends NextApp<Props> {
  render() {
    const { session, pageProps, Component } = this.props;

    return (
      <Container>
        <SessionContext.Provider value={session}>
          <Component {...pageProps} />
        </SelfUrlContext.Provider>
      </Container>
    );
  }

  static async getInitialProps({ Component, ctx }: AppContext) {
    const componentGetInitialProps = Component.getInitialProps || (() => Promise.resolve());

    const [session, pageProps] = await Promise.all([
      getAuthenticationSession(),
      componentGetInitialProps(ctx),
    ]);

    return {
      session,
      pageProps
    };
  }
}

export default App;
\`\`\`

## Don’t rely on useful API Routes so much
\`/pages/api/*.tsx\` are special routes. They don’t have React component to render but can have implementation what HTTP response they return. Which means you can create Web API endpoints with that as like making Web servers .

Even though you can make “full”-stack web application with both aspect of client-side and server-side, it’s not so great idea. If you make so many Web API endpoints with API routes, it will result in super messy code because you need to carefully write universal code everywhere with Next.js.

What I recommend is using API routes less. You should use it just to support front-ends. Even like you write Web API endpoints in Node, it’s much better if you build a simple Node API server with [Fastify](https://www.fastify.io/), [Koa](https://koajs.com/) or [Express](https://expressjs.com/). **Because you don’t need to concern about the bundle size for the client-side code as well as there’s less restriction of the platform.**

## Able to serve Sitemap and RSS/Atom feeds
\`pages/sitemap.xml.tsx\` is exposed as \`/sitemap.xml\` as the endpoint. In addition, you can control what the endpoint responds for HTTP in \`getInitialProps()\` by doing \`res.send()\` ([example](https://github.com/axross/axross.dev/blob/9a396055f59a8ef8428b80b3682a38afb33c351d/pages/sitemap.xml.ts#L66-L68)). As React component, you can just return \`null\` because **no route can be reached in client-side rendering as long as it is not specified by \`<Link>\`.** This feature enables you to serve Sitemaps or RSS/Atom feeds (As an example, [here](https://axross.dev/posts/feed.xml?hl=ja-JP) is Atom feed of this website).

## Consider to use singleton

\`pages/_app.tsx\` is only the module every route passes. You may come up with some idea that it looks a great idea to prepare dependency injection container there and provide it to each route by React's props or contexts. But you need to remember that every page will be in server-side rendering and then going to be application entry point for the single-page application. If you put everything necessary in all routes, **Next.js cannot split code into small pieces of application endpoint. This makes huge overhead in the bundle size as well as cause the server-side rendering slow.**

Consider that make modules refers dependencies directly or make some singleton object and make it imports dependencies as less as possible. Even in that case, there's no problem because fortunately most test frameworks have ways to mock modules.

## Does Next.js only run on Now?

The answer is "No”. ZEIT, which has [Now](https://zeit.co/now), develops and maintains Next.js as a core team. Surely Now has something like preset for Next.js. Moment after you push your Next.js application to Now, __each \`pages/**/*.tsx\` will be separately deployed as cloud functions automatically. When you go to some route by a browser, the cloud function runs, do server-side rendering and respond rendered HTML and JS.__ It works really well.

My second question was “how about Google Cloud Platform? Amazon Web Services? Netlify?”. The answer is you need to manage it by yourself. Next.js supports making custom single endpoint for server-side in Next.js. It would be the best way for GCP and AWS. As for Netlify, you can generate a normal web application by \`next export\`, deploy it to Netlify, and it works as a normal single page application. In this case, you cannot do dynamic server-side rendering with \`getInitialProps()\`.

## Conclusion
Next.js 9 is pretty nice. It's the best way to create both of web applications and websites without anything struggling.

If you can use Now, there is almost no configuration to make web applications working stunningly well. Even if you cannot use Now, you can use Next.js without server-side rendering. Even in this case, this enough worth as considering that the framework includes routing, \`<head>\` manipulation, static file serving, CSS in JS and Webpack configuration.
`;