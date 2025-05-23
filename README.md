# ポジショニングマップ作成ツール
このツールは、Reactで開発されたポジショニングマップ作成アプリケーションです。画像をドラッグ＆ドロップで配置し、軸のラベルやマップサイズ、フォントなどを自由に設定して、独自のポジショニングマップを作成できます。

## 主な機能
- 画像のドラッグ＆ドロップ配置: ローカルファイル、URL、または[TierMaker](https://tiermaker.com/)のHTMLから画像を読み込み、マップ上に自由に配置できます。
- 軸ラベル設定: X軸、Y軸の各ラベル名（例: 「上」「下」「左」「右」）をカスタマイズできます 。
- マップサイズ調整: マップの幅と高さをピクセル単位で変更できます 。
- フォント設定: ラベルのフォント種類とサイズを設定できます 。
- 画像の一括サイズ変更: 配置したすべての画像のサイズを一括で調整できます 。
- 個別の画像サイズ変更: 配置した個別の画像を選択し、拡大・縮小が可能です 。
- テキストの画像化: 入力したテキストを画像としてマップに配置できます 。
- マップのエクスポート: 作成したポジショニングマップをPNG画像としてダウンロードできます 。

## 使い方
1. アプリケーションの起動: （通常、npm start または yarn start コマンドで起動します）
2. 画像を追加:
- ローカルから画像アップロード: 「画像を追加」セクションの「ローカル」から画像ファイルを選択してアップロードします 。
- TierMakerテンプレートから画像取得: TierMakerのテンプレートページのHTMLをコピーし、「TierMakerのテンプレートを使用」のテキストエリアに貼り付けて「追加」ボタンを押すと、テンプレート画像を取り込めます 。
- 文字列から画像作成: 「文字列」の入力欄にテキストを入力し、「追加」ボタンを押すと、そのテキストが画像として追加されます 。
3. 画像をマップに配置: 追加された画像は、画面下部のアイテムリストに表示されます。画像をドラッグしてマップ（白いキャンバス）上にドロップすることで配置できます 。
4. マップのカスタマイズ:
- ラベル名設定: 「ラベル」セクションで、上下左右の軸の名前を変更します 。
- マップサイズ設定: 「マップサイズ」セクションで、マップの幅と高さを調整します 。
- ラベルフォント設定: 「ラベル」セクションで、フォントのサイズと種類を変更します 。
- 画像サイズ一括設定: 「画像サイズ一括設定」でスライダーを操作すると、すべての配置済み画像のサイズが変更されます 。
- 個別の画像調整: マップ上の画像をクリックして選択すると、拡大・縮小ボタンが表示されます。また、ドラッグして位置を調整できます 。
5. マップのダウンロード: 作成したマップは、「ダウンロード」リンクからPNG画像として保存できます。ダウンロードできない場合は、スクリーンショット機能をご利用ください 。

## 開発環境
- React
- TypeScript
- Bootstrap (React-Bootstrap)
- Dnd-kit (ドラッグ＆ドロップライブラリ)

## インストール
```Bash

git clone https://github.com/DismayChildFIsh/Position-Mapper
cd Position-Mapper
npm install
npm run dev
```

## ライセンス
© 2025 狼狽う子は魚(Dismay Child Fish) 
