# Vue.js
​
> A Vue.js project
​
## Build Setup
``` bash
# install dependencies
npm install
​
# serve with hot reload at localhost:8080
npm run dev
​
# build for production with minification
npm run build
​
# build for production and view the bundle analyzer report
npm run build --report
​
# run unit tests
npm run unit
​
# run e2e tests
npm run e2e
​
# run all tests
npm test
```

## CSS Init
import('./assets/css/common.css')

## jQuery Init
``` bash
npm install --save-dev expose-loader
npm install --save jquery
```
​
### main.js에 하단 내용 추가
``` bash
// eslint-disable-next-line import/no-webpack-loader-syntax
import 'expose-loader?$!expose-loader?jQuery!jquery'
```
