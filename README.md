# typescript-react-recoil-api-client

[typescript-express-api-server](https://github.com/hironomiu/typescript-express-api-server)のクライアント

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

React + TypeScript

```
npx create-react-app . --template typescript
```

Recoil

```
npm install recoil
```

React Router DOM

```
npm install react-router-dom
```

```
npm install --save-dev @types/react-router-dom
```

エラーが出る場合(@babel/core をダウングレードする)

```
npm install --save-dev @babel/core@7.16.12
```
