import { Story, Meta } from "@storybook/react";
import * as React from "react";
import { Article, ArticleProps } from "./article";

export default {
  title: "Components/Article",
  component: Article,
  argTypes: {
    title: {
      control: { type: "text" },
    },
    coverImageUrl: {
      control: { type: "text" },
    },
    tags: {
      control: { type: "array" },
    },
    lastPublishedAt: {
      control: { type: "date" },
    },
    author: {
      control: { type: "object" },
    },
    body: {
      control: { type: "text" },
    },
  },
  args: {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    coverImageUrl:
      "https://i.picsum.photos/id/650/2048/1170.jpg?hmac=XYuLh7sFn9PAmpUQsMgPaZ_lhmJbfYgMdTFQp3hnLzI",
    tags: ["Career", "Frontend", "Security", "Travel"],
    lastPublishedAt: new Date(),
    author: {
      name: "John Due",
      avatarUrl:
        "https://i.picsum.photos/id/1011/256/256.jpg?hmac=Zu92sdcdhGjlD7pgy52JKhO_7kTORVxeI67oCdVePx0",
    },
    body:
      ':::callout{variant="info"}\n2021年3月に最初に書きました。同じURLで随時このページを更新していく予定です。\n\n何か質問などがあればTwitterか、:feedback[こちらのフォームから送って]もらえれば順次書き足します。\n:::\n\n::rich-heading-2[働いている会社 / 背景]{#641db2a7}\n\nParsable Inc. という会社で、ざっくり言うと工業系のフロントライナーのお客さんたちの手順書やチェックリストをデジタル化するSaaSを作っています。ユーザーが入力した項目の内容や時間からボトルネックを探して手順を改善したりするための機能もあって、単なる電子化というよりかは全体最適化を目指すプラットフォームという感じです。\n\n技術的には、GUIでポチポチしながら柔軟に手順書やチェックリストのテンプレートを作れる機能とパフォーマンス計測ができる機能を持ったダッシュボードがあるという感じで、かなり歯応えのある複雑なフロントエンドです。\n\n本社はアメリカのサンフランシスコのダウンタウンのど真ん中にありますが、僕は2020年3月にカナダのバンクーバーオフィスでシニアフロントエンドエンジニアとして採用されました。\n\n採用されてからすぐにCOVID-19の影響でオフィスがシャットダウンされ、それ以来ずっとリモートで働いています。同僚とイベントで何度か顔を合わせてますが、主にオンラインでのやりとりがメインです。\n\n::image-figure{src="https://media.graphcms.com/output=format:jpg/VE7swp8LSZCbftKg1TJ9" caption="同僚とBBQに行った時に遊んだミニスポーツ。Spikeballというらしい" width="1920" height="1200"}\n\n::rich-heading-2[英語]{#590b5b4b}\n\n「USの会社で働く」ということでまず頭に浮かぶのは英語だと思います。結論から言うと、僕の英語力は徐々に伸びてはいるもののまだ充分に流暢ではないという感じです。シニアポジションの特性上、コミュニケーションの仕事の比重がめちゃくちゃ増えます。ミーティングの中で会話をリードする機会や気の利いたコメント（というより説明）を求められる場面が多くなります。\n\n最初の頃は「こういうことを聞かれるだろうな」というのをミーティングの中で想定しておいて、テキストエディタに英語で書き出しておいて話すというのを試していました。元々英語でのライティングが得意だったので使っていたハックという感じです。最近ではそういう下準備なしに複雑な会話もできるようになってきました。\n\n::rich-heading-3[英語で喋ると頭が悪くなる]{#51373d1d}\n\n第二言語話者の間では通説のようなものですが、英語で話すと日本語で話している時よりも思考のパフォーマンスが下がります。その結果、口から出てくる言葉も稚拙になり、話している相手からは頭が悪いように見えます。これは人間が思考に言語野を用いていて、**持っている言語の単語や表現力に思考範囲が制限されるため**だと言われています。そのため、英語を使っていると「日本語だったらもっとうまく説明できるのに」みたいなシチュエーションが発生します。\n\n僕は英語を勉強している中でこの話を知りましたが、実際に働いてみてその存在を確かに実感しました。この本当の意味はおそらく日本語 (ネイティブ言語) で働いているうちは一生気付くことができなかったです。それまでの自分の思考のパフォーマンスが自分にとって当たり前すぎて「いざ奪われるとこうなるのか」という稀有な体験でした。\n\n上でも話した通り僕の英語のスキルはまだまだ下の下なので、前もってドキュメントを作ってミーティングに臨むなどしてオーラルコミュニケーションのコストを減らしたり、そのドキュメントの中でも図をたくさん使うなどして補っています。これはこれで仕事全般として良いプラクティスだとは思いますが、いずれはこういうことをしなくてもいいようにあえて徐々にギプスを外していこうと思っています。\n\n::rich-heading-3[英語力の客観的な評価]{#e58c07b6}\n\n少し恥ずかしいですが、ざっくり周りの評価を書いておこうと思います。「実際どれくらいのレベルの人がこういうこと言ってるのか」という参考になれば...。\n\n*   テストでのスコア\n    *   実はIELTS・TOEFLやTOEICなどの統一的なテストを受けたことがありません...。あればよかったんですが...\n        *   周りの人と比べると、おそらくIELTS Overall 6.0か6.5付近で、現時点ではどうあがいてもOverall 7.0以上は取れないと思います\n        *   TODO: 何か受ける\n            *   TOEICだとリスニングとリーディングが主ですが、仕事で必要なのはスピーキングなのでパフォーマンス計測にはIELTSやTOEFLが良いと思います\n*   同僚からの評価\n    *   *『テキストコミュニケーションは完璧、口頭でのコミュニケーションは詳細を欠くことがある』*\n    *   *『君の英語はとてもじゃないがパーフェクトとは言えない、研鑽して欲しい』*\n        *   言われた日と次の日は正直めちゃくちゃ凹みました\n        *   5ヶ月くらい経った後で同じ人から *『かなり向上を感じた。今はプロフェッショナルな感じがある』* と評価が向上しました💪\n\nただ、日によってめちゃくちゃ英語が上手な日とものすごく下手な日があります。おそらく身体的なパフォーマンスと同じように、頭脳やメンタルのパフォーマンスによって変動があるんだと思います。また、休みの日に日本語のYouTubeを一日中見ていた次の日の月曜日なども英語がすごく下手になったりします。\n\n:::callout{variant="info"}\nフィードバックで質問をいただいたので追記:\n\n> Q. 記事内に「君の英語はとてもじゃないがパーフェクトとは言えない、研鑽して欲しい」と言われたとありますが、"英語"でどのように言われたのか教えて頂くことは可能でしょうか？\n\nA. 1-on-1 ミーティングの中で口頭で言われたことなので正確にどんな表現で言われたかは覚えていません...。が、*Your English has room to improve to some extent. I think you are doing hard work on your own practice but please keep it going.* (君の英語はまだ完璧じゃないから、めっちゃ向上させようと頑張ってると思うけどそれを続けて欲しい) みたいなニュアンスだったと思います...。\n:::\n\n::image-figure{src="https://media.graphcms.com/output=format:jpg/G2yGF4i4SLa2smyFwZsA" caption="ボードゲームのミートアップにて。英語でのルール説明はするのもされるのも難しい。雰囲気でボドゲをやっている" width="1920" height="1440"}\n\n::rich-heading-2[ポジション]{#9b76c1cb}\n\n北米の会社だと経験やスキルによってレベルが何段階かに分かれているのが普通です。定義や基準は会社によってまちまちですが、大まかに次のような感じです。\n\n*   **Junior**: 同僚などの助けを借りてタスクをこなせる。複雑な仕事は誰かに咀嚼してシンプルにしてもらう必要がある\n*   **Intermediate**: 誰の力も借りずに自走できる。即戦力といえる\n*   **Senior**: プロジェクトやタスクを主導できる。専門的な知識を持つ\n\n::rich-heading-3[立ち回り]{#7b628e31}\n\n上でも書いていますが、シニアポジションになるとコミュニケーション的な仕事の割合が増えてきます。今のところコードを書く6:コミュニケーション4といったバランス感です。会社に長くいればいるほど中心人物になっていくので、いずれコミュニケーションタスクが半分を超える日が来ると思います。\n\n他者からの評価は「技術に明るい」「綺麗なコードを書く」という感じなので (自分の認知している中では...ですが) 、自分の立ち回りもその期待に寄せているところがあります。具体的には、会社の中の文化的な話題よりも、技術的な議論に積極的に参加しています。自分の得意分野の仕事が増えていくように印象付けしている形です。先日 (2021年3月) いくつかある年間賞のうちの1つを獲得したので、今のところまあまあうまくいっているのかなと思います。\n\n::image-figure{src="https://media.graphcms.com/output=format:jpg/A14T2AlAQdGhsY83XWq5" caption="自宅の作業環境。ベッド下にデスクを置いてマイクを吊るしている" width="1920" height="1920"}\n\n::rich-heading-2[技術]{#85e0729d}\n\n会社で使っているのはいたって普通の技術スタックです。対外的に話せる範囲 (面接で候補者に話している範囲) だと、\n\n*   TypeScript、React (Web)、React Native (iOS/Android)、Electron (デスクトップ)\n*   [Draft.js](https://draftjs.org/)でのリッチテキストエディタやWebSocketでのソケット通信など\n*   自社[デザインシステム](https://note.com/yoshigorou/n/n102e933d4f58)を構築\n    *   いつでも参照できるように[Abstract](https://www.abstract.com/)で定義を管理\n    *   Webの実装はReactと[Styled System](https://styled-system.com/)を利用、Storybookドリブンで開発)\n*   十数ヶ国語のi18n、翻訳SaaSを通じての自動反映フロー\n*   Web APIは古い箇所は[Apache Thrift](https://thrift.apache.org/)、新しい箇所はGraphQLに移行中\n*   既存フロントエンドがでかいので[マイクロフロントエンドアーキテクチャ](https://micro-frontends.org/)に移行中\n\nといった感じです。\n\n::rich-heading-3[北米は進んでいるのか？ / 優秀なのか？]{#02fbd058}\n\nよく聞かれますが、どうなんでしょう...。ただ、以下のことは共通して言えると思います。\n\n*   新しい技術トピックの認知具合はどこの国でもほとんど同じです。アンテナを張っている人は知っていますし、レガシーな技術で仕事をしている人もいます\n*   「ある技術の名前だけ知っている」という状態の人は少ないです。ドキュメントが母国語 (英語) なので読めばわかるというのが理由だと思います\n*   クリーンアーキテクチャやDDDのような技術的方法論の素養については二極化しているように感じます。知っている人は本当にめちゃくちゃ詳しくて、知識も実経験もある所謂[アンクル・ボブ](https://www.google.com/search?q=%E3%83%AD%E3%83%90%E3%83%BC%E3%83%88%E3%83%BBC%E3%83%BB%E3%83%9E%E3%83%BC%E3%83%86%E3%82%A3%E3%83%B3)みたいな人がたまにいます\n    *   特定的に「DDDに明るい」みたいな人は珍しいですが (そもそもDDD自体がが古すぎて認知されていないのかもしれません) 、Technical Design Document作りの一環・基本として似たような知識を持っている人が多いです\n    *   ただ、マイクロサービスとかオニオンアーキテクチャみたいな構成系の方法論は認知度が高いです\n*   僕が渡航してきた2018年の夏時点ですでにReact Nativeを教えている専門学校がちらほらありました\n\n::image-figure{src="https://media.graphcms.com/output=format:jpg/LwZcSQ7tSeOVl8pH0BbU" caption="React Vancouverというミートアップの時の様子" width="1920" height="1080"}\n\n::rich-heading-2[採用]{#d3c0f99a}\n\nエンジニア採用にも絡んでいます。この箇所を書いている時点 (2021/03/19) まででだいたい20人くらいの候補者と面接したと思います。北米でのエンジニア採用について興味のある方は以下の記事もよかったら読んでみてください。\n\n:::callout{variant="info"}\nTODO: あとで書く\n:::\n\nまた、通年とはいきませんが弊社は色々なエンジニア職種で積極的に採用しています。基本的に即戦力になるようなレベルの方を探していますが、実力があれば経験年数は問いません。ただ、経験が少なすぎるとテクニカルリクルーターの目に止まらない可能性もあるので、興味のある人はTwitterか:feedback[こちらのフォームから連絡]してもらえるとそういう運要素なしに紹介できます。\n',
  },
} as Meta;

export const Example: Story<ArticleProps> = (args) => {
  const props = {
    ...args,
    lastPublishedAt: args.lastPublishedAt
      ? new Date(args.lastPublishedAt)
      : undefined,
    author:
      Object.keys(args.author ?? {}).length === 0 ? undefined : args.author,
  };

  return <Article {...props} />;
};
