## CRA 없이 진행되는 카카오맵 프로젝트

npm init

### 설치 Dependencies (react, webpack, babel, typescript)

npm install react react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader
npm install --save-dev html-webpack-plugin
npm install --save-dev css-loader style-loader mini-css-extract-plugin
npm install --save-dev typescript @types/react @types/react-dom @types/node @babel/preset-typescript
npm run tsc -- --init 으로 tsconfig 파일 생성

### 카카오맵 설치

npm install --save-dev kakao.maps.d.ts

### 도중 'NODE_ENV'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다. 라는 오류가 나서

-> npm install -g win-node-env

### 부가 기능 설치

CSS 라이브러리 : npm install @emotion/react @emotion/react
환경 변수 설정 의존성 : npm install dotenv

###### 최소한으로 webpack 설정하기

참고 : https://www.youtube.com/watch?v=pzHMT9Jxce0

git clone https://github.com/jmyoow/webpack-js-html.git
cd webpack-js-html
npm i -D @bable/cli @babel/core @bable/preset-env bable-loader clean-webpack-plugin copy-webpack-plugin core-js
cross-env html-webpack-plugin seource-map-loader terser-webpack-plugin webpack webpack-cli webpack-dev-server

### Github 연동법

echo "# kakao-map-api-lecture" >> README.md
