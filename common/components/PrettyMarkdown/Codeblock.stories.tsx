import * as React from "react";
import CodeBlock from "./CodeBlock";

export default { title: "PrettyMarkdown/Codeblock" };

export const JSX = () => (
  <div style={{ padding: "0 48px" }}>
    <CodeBlock className="language-jsx">
      {`// 1.75 line-height is 28px as converted
// there's (28 - 16) / 2 = 6px margin at the top and bottom
<ContentLoader>
  {/* y = 6px because there's margin at the top of text */}
  <rect x="0" y="6px" width="100%" height="16px" />

  {/* y is previous line's y + 16px + 12px for line 2 and below */}
  <rect x="0" y="34px" width="100%" height="16px" />
  <rect x="0" y="62px" width="40%" height="16px" />
</ContentLoader>`}
    </CodeBlock>
  </div>
);

export const CSS = () => (
  <div style={{ padding: 48 }}>
    <CodeBlock className="language-css">
      {`/* prefer to use CSS class instead of element-type selector in production */
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
}`}
    </CodeBlock>
  </div>
);

export const Flutter = () => (
  <div style={{ padding: 48 }}>
    <CodeBlock className="language-dart">
      {`// Copyright (c) 2019, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.display1,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ),
    );
  }
}`}
    </CodeBlock>
  </div>
);
