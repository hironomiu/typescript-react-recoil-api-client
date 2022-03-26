# typescript-react-recoil-api-client

[![Node.js CI](https://github.com/hironomiu/typescript-react-recoil-api-client/actions/workflows/node.js.yml/badge.svg)](https://github.com/hironomiu/typescript-react-recoil-api-client/actions/workflows/node.js.yml)

TypeScript + React + Recoil + React Router DOM による[typescript-express-api-server](https://github.com/hironomiu/typescript-express-api-server)のクライアントアプリ

## SetUp

```
npm install
```

### .env.xxx.local

プロジェクト直下に`.env.production.local`(本番用),`.env.development.local`(開発用)を作成し設定

| 変数名            | 設定値           |
| :---------------- | :--------------- |
| REACT_APP_API_URL | API サーバの URL |

```
REACT_APP_API_URL=
```

## Run

```
npm start
```

## Build

```
npm run build
```

## Install Memo

### React + TypeScript

```
npx create-react-app . --template typescript
```

### Recoil

```
npm install recoil
```

### React Router DOM

```
npm install react-router-dom
npm install --save-dev @types/react-router-dom
```

エラーが出る場合(@babel/core をダウングレードする)

```
npm install --save-dev @babel/core@7.16.12
```

### tailwindcss

[公式：installation](https://tailwindcss.com/docs/installation)

```
npm install --save-dev tailwindcss @types/tailwindcss
npx tailwindcss init
```

`tailwind.config.js`を公式の通り作成し`tsx`を追記する

```
module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### @headlessui/react

モーダル用

```
npm install @headlessui/react
```

### @heroicons/react

アイコン用

```
npm install @heroicons/react
```

### msw

```
npm install msw
```
