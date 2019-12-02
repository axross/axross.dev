import { withKnobs, text } from "@storybook/addon-knobs";
import * as React from "react";
import PrettyMarkdown from "./PrettyMarkdown/PrettyMarkdown";

export default {
  title: "PrettyMarkdown",
  decorators: [withKnobs]
};

export const playground = () => (
  <PrettyMarkdown children={text("children", initialText)} />
);

const initialText = `[Flutter](https://flutter.dev/)で作ったiOS/Androidアプリを初めてストアに出しました。テキサスホールデムというポーカーの計算機で、複数人のハンドやハンドレンジからそれぞれ誰がどれくらいの勝率があるかを計算できるものです。

![Aqua@2x](//videos.ctfassets.net/2mfcuy3p355s/2WCN3uamkggk0Z9Nc9XMwr/80f0514d1063d664fe298a1f1e460496/aqua_video.mp4)

## ダウンロード

[![Get it on Google Play@3x@inline](//images.ctfassets.net/2mfcuy3p355s/6SDbf9kI8c62otwgfhLQHs/3a81fddd43a02c4f8cd6dba0adc31464/get-it-on-google-play.png)](https://play.google.com/store/apps/details?id=app.axross.aqua&hl=ja) [![Download on the App Store@3x@inline](//images.ctfassets.net/2mfcuy3p355s/3Na9uTH1gjRLi6XsT53iTA/1429fb74c6c49bad97ef2d4dfc384513/download-on-the-app-store.png)](https://apps.apple.com/jp/app/odds-calculator-for-poker/id1485519383)

オープンソースにしており、[こちらからコードも確認できます。](https://github.com/axross/aqua)**IssueやStarなどでのフィードバックは励みになるので是非よろしくお願いします。**

## 実装について
計算処理は所謂モンテカルロシミュレーションで、決められた回数をランダムに試行して平均勝率を算出しています。ポーカーでは互いの持っていそうなカードを複数の候補で予想しながら戦います。ここからプレイヤー人数分の組み合わせを考えるとO(n^m)の時間複雑度になり、全パターン試行するのが難しくなるためです。

一定の精度で求めるには膨大な試行回数が必要になります。計算処理をUIと同じスレッドでするわけにはいかないので、UIスレッドと疎通を行うスレッドを別途用意して計算しています。Flutter (もといDart) ではこういったマルチスレッディングなどでの並列処理を抽象化した[Isolate](https://api.dartlang.org/stable/2.6.0/dart-isolate/dart-isolate-library.html)という概念があり、このアプリでもそれを利用しています。

## Flutter製のアプリをリリースするのはどうだったか
さほど難しくないですが、やっぱりiOSとAndroidでの開発は経験しておいた方がいいです。コーディングに関する部分はFlutterによって抽象化されており、まったく知識がなくても扱えるようになっています。ですが、リリースに際しての証明書での署名や難読化、デバイスのアーキテクチャごとのビルドなど、各プラットフォームの知識があった方がいい箇所もあります。

### マルチスレッド
前述のとおり抽象化されたIsolateという概念があり、凝ったことをしない限りは手軽に扱えます。制約のある安全でシンプルなAPIでガイドラインの意味も果たしています。Goのgoroutineと同じような感じだと思います。

### アニメーション
Flutterではシーケンスなアニメーションと、Tweenを用いた値のグラデーションによるアニメーションの両方を扱えます。

![Flutter Tween Animation Example@2x@inline](//videos.ctfassets.net/2mfcuy3p355s/4jPAo53HynNcYyE32mgJhV/17d508650a4a28f10555433e5b07f82a/RPReplay_Final1574145129.mp4) ![Flutter Tween Animation Example@2x@inline](//videos.ctfassets.net/2mfcuy3p355s/5bER0UCiqkHJH1JyOx7f38/28a6b09476db70cbe3dd97104651b279/RPReplay_Final1574145112.mp4)

あまり凝ったアニメーションは実装していませんが、WebのDOMに比べてより手軽で身近な存在になっているように感じます。パフォーマンスが高いためにheightなどあらゆるUIのプロパティにてTweenを用いてアニメーションを実現できるためです。

### ダークモード
Flutterには[MediaQuery](https://api.flutter.dev/flutter/widgets/MediaQuery-class.html)というAPIがあり、これによって

- ディスプレイのサイズや向き
- 太いフォントを好んで利用するかどうか (iOS)
- 24時間のタイムフォーマットを利用しているかどうか

などデバイスやOSの設定の情報を取得できます。Flutterには[InheritedWidget](https://api.flutter.dev/flutter/widgets/InheritedWidget-class.html)という[ReactのContext](https://ja.reactjs.org/docs/context.html)と同じ伝搬モデルがあり、MediaQueryはこのAPIに則っています。ダークモードもこのMediaQueryを使って簡単にUIに反映できます。

![Aqua Light Theme@2x@inline](//images.ctfassets.net/2mfcuy3p355s/4wUlHSe9lu5HIhSp2l4Nu7/7beb752224d5cb9aa107bf95abdf55d9/light-theme.png) ![Aqua Dark Theme@2x@inline](//images.ctfassets.net/2mfcuy3p355s/42s0jUhzGUqahmL9VKjfIs/9f6fb61f1d3a529df8cba49076a6c6f8/dark-theme.png)

## Flutterは何に向いていないと感じるか
### 広告を入れたい場合
Flutterはプラットフォームで用意されたUIフレームワークを利用せず、全画面にキャンバスを広げて独自のレンダリングシステムでUIを描画しています。そのためケースによってはネイティブ以上のレンダリングパフォーマンスを叩き出すのですが、通常、広告のSDKはプラットフォームごとのUIフレームワークに依存しているのでFlutterと相性が悪いです。

### カメラを軸としたアプリ
これもFlutterが独自のレンダリングシステムを利用しているのが原因です。InstagramやSnapchatのようにカメラにフィルターを当てるようなアプリは作りにくいです。`;
