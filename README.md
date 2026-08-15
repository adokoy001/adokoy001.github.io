# nikki.yokoda.okinawa

[Tsuzuri](https://github.com/adokoy001/Tsuzuri) で生成する日記サイトのソース。
旧 nikki.pl プロジェクト（blog_by_nikki）から `tsuzuri migrate-nikki --timezone=+09:00` で移行。

## 記事を書く

`content/posts/YYYY/MM/slug.md` を追加して master に push すると、
GitHub Actions がビルドして `gh-pages` ブランチへ公開します。

```sh
perl tools/tsuzuri new post --root=. --title="タイトル"
perl tools/tsuzuri serve --root=.   # ローカルプレビュー http://127.0.0.1:4173/
```

- エンジンは `tools/tsuzuri`（依存ゼロの単一ファイル、Perl 5.10+ コアのみ）。
- 旧URL `/entry/YYYY/MM/*.html` は各記事の `aliases` によりリダイレクトを生成。
- `static/` はそのまま出力へコピー（CNAME / .nojekyll / favicon / 画像）。
