### border：1px

- [移动端border：1px问题解决方案](https://www.cnblogs.com/yaokunlun/p/6545393.html)
- [移动端1px解决方案 1px border.css](https://blog.csdn.net/qq_36407748/article/details/80958774)



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

- [Vue CLI 3.0脚手架如何在本地配置mock数据](https://blog.csdn.net/qq_32135281/article/details/84312100)



### touch/click与[fastclick](https://github.com/ftlabs/fastclick)


- 移动端浏览器触摸事件: touchstart、touchmove、touchend、touchcancel
- 触摸列表: touches、targetTouches、changedTouches
- 属性: clientX、clientY、identifier、pageX、pageY、screenX、screenY、target



preventDefault 方法的作用在于：阻止元素默认事件行为的发生，但有意思的是，当我们在目标元素同时绑定 touchstart 和 click 事件时，在 touchstart 事件回调函数中使用preventDefault方法，可以阻止后续 click 事件的发生


```
npm install fastclick --save
```

```
//main.js

import fastClick from 'fastclick'
fastClick.attach(document.body)
```

- [触摸事件 touchstart、touchmove、touchend](https://blog.csdn.net/wangmx1993328/article/details/83270166) 
- [如何解决 touchstart 事件与 click 事件的冲突](https://juejin.im/post/5aa09afe51882555602077be)
- [也来说说touch事件与点击穿透问题](https://juejin.im/entry/5963383bf265da6c3a54dfa7)
- [你真的了解FastClick吗？](https://www.cnblogs.com/ylweb/p/10549040.html)


### keep-alive


> <keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。和 <transition> 相似，<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。

> 当组件在 <keep-alive> 内被切换，它的 **activated** 和 **deactivated** 这两个生命周期钩子函数将会被对应执行。
    
> include - 字符串或正则表达式。只有匹配的组件会被缓存。
> exclude - 字符串或正则表达式。任何匹配的组件都不会被缓存。

##### activated在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用

- [Vue keep-alive实践总结](https://www.cnblogs.com/sysuhanyf/p/7454530.html)
- [vue 路由 按需 keep-alive](https://juejin.im/post/5cdcbae9e51d454759351d84)
- [Vue的钩子函数[路由导航守卫、keep-alive、生命周期钩子]](https://juejin.im/post/5b41bdef6fb9a04fe63765f1)
