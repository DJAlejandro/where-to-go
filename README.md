### border：1px

- [移动端border：1px问题解决方案](https://www.cnblogs.com/yaokunlun/p/6545393.html)
- [移动端1px解决方案 1px border.css](https://blog.csdn.net/qq_36407748/article/details/80958774)

### [fastclick](https://github.com/ftlabs/fastclick)

```
npm install fastclick --save
```

```
//main.js

import fastClick from 'fastclick'
fastClick.attach(document.body)
```

- [你真的了解FastClick吗？](https://www.cnblogs.com/ylweb/p/10549040.html)


### padding-bottom

- 通过设置padding-bottom固定宽高比，让含有资源文件的元素占位，放在在低网速下加载资源过程中出现“抖动”

```
    width: 100%
    height: 0
    padding-bottom: 31.25%
```

- [CSS实现宽高等比例自适应矩形](https://juejin.im/post/5b0784566fb9a07abd0e14ae)

### scoped穿透

> scoped看起来很好用，当时在Vue项目中，当我们引入第三方组件库时(如使用vue-awesome-swiper实现移动端轮播)，需要在局部组件中修改第三方组件库的样式，而又不想去除scoped属性造成组件之间的样式覆盖。这时我们可以通过特殊的方式穿透scoped。


sass和less的样式穿透 使用/deep/

```
    .wrapper /deep/ .swiper-pagination-bullet-active{
      background: #fff;
    }
```

stylus的样式穿透 使用>>>

```
    .wrapper >>> .swiper-pagination-bullet-active{
      background: #fff;
    }
```

- [Vue中的scoped和scoped穿透](https://segmentfault.com/a/1190000015932467)


### [axios](https://github.com/axios/axios)

```
 npm install axios --save
 ```
 
 ```
 import axios from "axios";

axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });  

```
 
 
 ### mock ( vue/cli 3.0 )
 
 把静态文件放入 public 文件下
 
 ```
 // 静态数据存放的位置
public/mock/home.json
```

创建一个 vue.config.js 文件放在根目录下

```
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/mock'
        }
      }
    }
  }
}
```

```
axios
 .get('/api/home.json')
 .then(this.handler)
```
