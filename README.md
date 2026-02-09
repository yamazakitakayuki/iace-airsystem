# 航空券予約システム (Flight Booking System)

## プロジェクト概要
- **名称**: FlightSearch - 航空券予約システム
- **目的**: Amadeus APIを使用した航空券検索・予約システム
- **主要機能**: 
  - 航空券検索フォーム（往復/片道/複数都市対応）
  - フライト検索結果表示
  - フィルター・ソート機能
  - レスポンシブデザイン対応

## 公開URL
- **開発環境**: https://3000-ixum760vzlh6kn5x9qt8b-dfc00ec5.sandbox.novita.ai
- **GitHub**: (未設定)

## 完成済み機能

### 1. 検索フォーム
- ✅ **旅程タイプ選択**: 往復/片道/複数都市
- ✅ **出発地・目的地入力**: 空港コード対応
- ✅ **日付選択**: 出発日・帰国日
- ✅ **乗客数選択**: 大人/子供/幼児の個別カウント
- ✅ **座席クラス選択**: エコノミー/プレミアムエコノミー/ビジネス/ファースト
- ✅ **直行便のみオプション**: チェックボックス

### 2. 検索結果表示
- ✅ **フライトカード**: 往復便情報を見やすく表示
- ✅ **航空会社ロゴ**: 各航空会社のロゴ画像表示（ダミー画像使用、Amadeus API統合後に実際のロゴを取得）
- ✅ **航空会社情報**: 名称、便名
- ✅ **フライト詳細**: 出発時刻、到着時刻、所要時間
- ✅ **経由地情報**: 直行便/経由便の表示
- ✅ **価格表示**: 1人あたりの往復料金
- ✅ **手荷物情報**: 手荷物込みの表示

### 3. 座席クラス選択モーダル 🆕
- ✅ **モーダル表示**: 「選択する」ボタンクリックでモーダル表示
- ✅ **往路・復路選択**: 各区間で座席クラスを個別選択
- ✅ **座席クラスプラン**:
  - **エコノミー**: 標準座席、機内食付き、受託手荷物1個
  - **プレミアムエコノミー**: 広々とした座席、優先搭乗、受託手荷物2個（基本料金の1.5倍）
  - **ビジネス**: フルフラットシート、ラウンジ利用、プレミアム機内食、受託手荷物3個（基本料金の3倍）
  - **ファースト**: プライベートスイート、ラウンジ利用、シェフ監修機内食、受託手荷物無制限（基本料金の5倍）
- ✅ **詳細情報表示**:
  - 残席数表示
  - 座席クラス別のアメニティ一覧
  - キャンセル条件
  - 価格（片道/1名あたり）
- ✅ **合計金額表示**: リアルタイム計算
- ✅ **アクセシビリティ**:
  - キーボード操作対応（Enter/Spaceで選択、Escで閉じる）
  - ARIA属性実装
  - フォーカス管理
- ✅ **レスポンシブデザイン**: モバイル/タブレット/デスクトップ対応
- ✅ **アニメーション**: スムーズなフェードイン/スライドイン効果

### 4. フィルター機能
- ✅ **価格帯フィルター**: スライダーで範囲選択
- ✅ **経由回数フィルター**: 直行便/1回経由/2回以上経由
- ✅ **出発時間帯フィルター**: 朝/昼/夕/夜
- ✅ **航空会社フィルター**: 複数航空会社選択可能

### 5. ソート機能
- ✅ **おすすめ順**: デフォルトソート
- ✅ **最安値順**: 価格昇順
- ✅ **最短時間順**: 所要時間昇順
- ✅ **出発時間順**: 出発時刻順

### 6. UI/UX
- ✅ **レスポンシブデザイン**: モバイル/タブレット/デスクトップ対応
- ✅ **モダンなデザイン**: Tailwind CSS使用
- ✅ **航空会社ロゴ**: Google Flights CDNから実際のロゴを表示（70x70px、透過PNG）
- ✅ **アイコン**: Font Awesome使用
- ✅ **スムーズアニメーション**: CSS Transition

### 7. 航空会社ロゴ実装
- ✅ **実際のロゴ表示**: Google Flights CDN (gstatic.com) を使用
- ✅ **レスポンシブ対応**: モバイルでは60x30px、デスクトップでは80x40px
- ✅ **対応航空会社**:
  - ANA（全日空）: NH
  - JAL（日本航空）: JL
  - ユナイテッド航空: UA
  - デルタ航空: DL
  - アメリカン航空: AA
- ✅ **ロゴURL形式**: `https://www.gstatic.com/flights/airline_logos/70px/{IATA_CODE}.png`
- ⏳ **Amadeus API統合後**: API レスポンスから航空会社コードを取得し、同じURL形式でロゴを表示予定

## 未実装機能

### バックエンド統合
- ❌ **Amadeus API統合**: 実際のフライトデータ取得
- ❌ **認証機能**: ユーザーログイン/登録
- ❌ **予約機能**: フライト予約処理（座席クラス選択データをバックエンドへ送信）
- ❌ **決済機能**: 支払い処理
- ❌ **予約管理**: 予約確認/キャンセル
- ❌ **メール通知**: 予約確認メール

### データベース
- ❌ **ユーザー情報保存**: Cloudflare D1使用予定
- ❌ **予約履歴保存**: 予約データ永続化（座席クラス情報含む）
- ❌ **お気に入り機能**: フライト保存機能

### 高度な機能
- ❌ **多言語対応**: 英語、中国語など
- ❌ **価格アラート**: 価格変動通知
- ❌ **おすすめ機能**: AIベースのおすすめ
- ❌ **座席マップ選択**: インタラクティブ座席マップ（現在は座席クラスレベルの選択のみ）

## 推奨される次のステップ

### フェーズ1: Amadeus API統合 (最優先)
1. **Amadeus APIアカウント取得**
   - https://developers.amadeus.com/ でアカウント作成
   - API Key取得

2. **APIルート実装**
   - `/api/search/flights` - フライト検索
   - `/api/flight/offers` - フライトオファー詳細
   - `/api/booking/create` - 予約作成

3. **環境変数設定**
   - `AMADEUS_API_KEY`
   - `AMADEUS_API_SECRET`

### フェーズ2: データベース実装
1. **Cloudflare D1セットアップ**
   ```bash
   npx wrangler d1 create webapp-production
   ```

2. **マイグレーション作成**
   - ユーザーテーブル
   - 予約テーブル
   - お気に入りテーブル

### フェーズ3: 認証・決済
1. **認証実装** (Auth0 or Clerk推奨)
2. **決済統合** (Stripe推奨)

## データアーキテクチャ

### 現在のデータモデル（フロントエンドのみ）
```javascript
SearchCriteria {
  from: string,          // 出発地
  to: string,            // 目的地
  departureDate: Date,   // 出発日
  returnDate: Date,      // 帰国日
  tripType: string,      // 旅程タイプ
  passengers: {
    adults: number,
    children: number,
    infants: number
  },
  cabinClass: string,    // 座席クラス
  directFlights: boolean // 直行便のみ
}

FlightResult {
  airline: string,       // 航空会社
  flightNumber: string,  // 便名
  departure: DateTime,   // 出発時刻
  arrival: DateTime,     // 到着時刻
  duration: string,      // 所要時間
  stops: number,         // 経由回数
  price: number,         // 基本料金
  baggage: boolean       // 手荷物込み
}

SeatClassSelection {
  outbound: {
    class: string,        // 座席クラス（economy/premium_economy/business/first）
    className: string,    // 座席クラス名（日本語）
    price: number         // 片道料金
  },
  return: {
    class: string,
    className: string,
    price: number
  },
  totalPrice: number      // 合計金額
}

BookingData {
  flight: string,         // フライト番号
  route: {
    from: string,         // 出発地
    to: string,           // 目的地
    fromCity: string,
    toCity: string
  },
  seatClasses: SeatClassSelection,
  totalPrice: number      // 総額
}
```

### 将来のストレージ
- **Cloudflare D1**: ユーザー情報、予約履歴
- **Cloudflare KV**: セッション管理、キャッシュ
- **Amadeus API**: リアルタイムフライトデータ

## 使用方法

### 1. フライト検索
1. 出発地と目的地を入力（例: 東京 (TYO)、ニューヨーク (JFK)）
2. 出発日と帰国日を選択
3. 乗客ボタンをクリックして人数を設定
4. 座席クラスを選択
5. 必要に応じて「直行便のみ」をチェック
6. 「フライトを検索」ボタンをクリック

### 2. 結果の絞り込み
- 左側のフィルターで価格帯、経由回数、出発時間帯、航空会社を選択
- 上部のドロップダウンでソート順を変更

### 3. フライト選択
- 各フライトカードの「選択する」ボタンをクリック
- **座席クラス選択モーダル**が表示される
  1. 往路の座席クラスを選択（エコノミー/プレミアムエコノミー/ビジネス/ファースト）
  2. 復路の座席クラスを選択
  3. 合計金額を確認
  4. 「予約を続ける」ボタンをクリック
- ※現在はモックデータで動作、Amadeus API統合後に実際の予約が可能

## デプロイ情報
- **プラットフォーム**: Cloudflare Pages (準備完了)
- **ステータス**: ✅ 開発環境で動作中
- **技術スタック**:
  - **フレームワーク**: Hono (TypeScript)
  - **フロントエンド**: Tailwind CSS, Font Awesome
  - **ランタイム**: Cloudflare Workers
  - **ビルドツール**: Vite
- **最終更新**: 2026-02-09

## 開発コマンド

```bash
# 開発サーバー起動
npm run build
pm2 start ecosystem.config.cjs

# サービス確認
pm2 list
pm2 logs webapp --nostream

# ビルド
npm run build

# 本番デプロイ（Amadeus API統合後）
npm run deploy:prod
```

## 注意事項

### 現在の制限
- モックデータで動作（実際のAPI連携なし）
- 予約機能は未実装
- ユーザー認証なし

### セキュリティ対応予定
- Amadeus APIキーは環境変数で管理
- Cloudflare Secrets使用
- CORS設定適用済み

## ライセンス
Copyright © 2026 FlightSearch. All rights reserved.
