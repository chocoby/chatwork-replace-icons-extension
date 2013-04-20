# chatwork-replace-icons-extension

ChatWork のユーザーアイコンを置換する Google Chrome 用の extension です。

## 概要

アイコンを管理する API である [Chatworker](https://github.com/asonas/chatworker) に、置換したいユーザーのクラス名と画像を、あらかじめ登録しておきます。
この extension から Chatworker API にアクセスし、クラス名と画像のリストを取得することで、ChatWork 内のユーザーアイコンを置換します。

## インストール

あらかじめ Chatworker を動かして、アイコンを追加しておく必要があります。詳しくは [Chatworker の README](https://github.com/asonas/chatworker) を参照してください。

1. [chatwork-replace-icons-extension.crx](https://github.com/chocoby/chatwork-replace-icons-extension/raw/master/chatwork-replace-icons-extension.crx) を右クリックして
「リンク先を別名で保存」で適当な場所に保存します。

2. Google Chrome で「ツール」-「拡張機能」を開き、`chatwork-replace-icons-extension.crx` をウィンドウ内にドラッグアンドドロップします。

3. インストールした「ChatWork Replace Icons Extension」の「オプション」を開き、`Chatworker API Endpoint` を入力し、「Save」で設定を保存します。

4. ChatWork にアクセス、またはリロードすることで、アイコンが置換されます。

## アップデート

「インストール」と同じ手順でアップデートを行なってください。
オプションを再び設定する必要はありません。

## 注意事項

* Google Chrome の最新バージョンにて確認を行なっています。
* ChatWork 側の変更により、動作しなくなる可能性があります。
* ご利用は自己責任でお願いします。
* 一つのアイコンのみ置換したいのであれば [chatwork-replace-icon](https://github.com/chocoby/chatwork-replace-icon) をお勧めします。

## 変更履歴

### [v0.0.1](https://github.com/chocoby/chatwork-replace-icons-extension/tree/v0.0.1) (2013/04/20)

* 初期リリース

## 開発

CoffeeScript から JavaScript に変換:

```
% cd src
% npm install grunt --save-dev
% grunt watch
```

パッケージ化するためのディレクトリを作成:

```
# repo root directory
% sh package.sh
```

## GitHub

https://github.com/chocoby/chatwork-replace-icons-extension

## ライセンス

MIT: http://chocoby.mit-license.org/
