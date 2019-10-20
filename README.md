# 这是一个好项目

## 用心去感受

### 代码富有诗意

#### 编不下去了

## 【主流开源协议之间的区别？】
(https://www.zhihu.com/question/25079718?sort=created)


## 用（传统方式）命令行把修改后的代码上传到码云？
1. git add.
2. git commit -m "提交信息"
3.  git push

## 制作首页App组件
1. 完成Header 区域，使用的是mint-ui中的Header组件
2. 制作底部的 Tabber 区域  使用的是MUI的Tabber.html
 + 在制作购物车小图标的时候，操作会多一些，先把扩展图标的css样式  拷贝到项目中
 + 拷贝扩展字体库的 .ttf文件到项目中
 + 为购物车小图标 添加 样式
3. 要在中间区域放置一个 router-view 来展示路由组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，如何获取,使用  vue-resource
2. 使用vue-resource 的this.$http.get 获取数据
3. 将获取到的数据保存到data中
4. 使用 v-for 循环渲染每个item项

## 改造九宫格区域的样式

## 改造 新闻资讯 路由链接

## 新闻资讯 页面 制作
1. 绘制页面  使用mui中的 media-list.html
2. 使用vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表点击跳转到  新闻详情
1. 把列表中的每一项改造为router-link 跳转的时候应该提供唯一的id标识符
2. 创建新闻详情的组件页面  NewsInfo.vue
3. 在 路由模块中，将新闻详情的路由地址 和组件中的页面对应起来

## 实现 新闻详情 的页面布局 和 数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的comment.vue组件模板
2. 在需要使用 comment组件 的页面中 ，先手动导入 comment组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用`components`属性，将刚才导入 comment组件，注册为自己的子组件
4. 将注册子组件时候的，注册名称，以标签形式，在页面中应用即可 

## 获取所有的评论数据 
1. getComment()

## 实现点击加载更多评论的功能
1. 为加载更多按钮绑定点击事件
2. 点击加载更多 让 pageIndex++，然后重新调用 this.getComment()方法获取最新一页的数据
3. 为了防止新数据 覆盖 老数据的情况， 我们在 点击加载更多的时候， 每当获取到新数据，应该让老数据调用数组的 
concat方法拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给 服务器
5. 当发表评论 ok之后，重新刷新列表，以查看最新的评论
 + 如果调用 getComment 方法重新刷新评论列表的话，可能只得到 最后一页的评论，前几页的评论获取不到
 + 换一种思路：当评论成功后，在客户端，手动拼接一个 最新的评论对象，然后 调用数组的 unshift 方法，把最新的评论，
 追加到 data 中的 comments 的开头， 这样，就能够完美实现刷新列表的需求；

 ## 改造图片分享按钮为路由的链接并显示对应的组件页面

 ## 绘制 图片列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条  
 2. 制作 底部的图片列表

 ### 制作顶部滑动条的坑：
 1. 需要借助于mui中的tab-top-webview-main.html
 2. 需要把 slider 区域的 mui-fullscreen 类去掉
 3. 滑动条无法正常的触发 滑动，通过检查官方文档发现 这是一个js组件，需要被初始化：
  + 导入 mui.js
  + 调用官方提供的方式去 初始化：
  ```
    mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  ``` 
 4. 我们在初始化 滑动条的时候，导入了 mui.js， 但是，控制台报错：Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions
  + 经过我合理的推测，觉得，可能是mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是，webpack 打包
  好的 bundle.js中， 默认是启用严格模式的，所以，这两者冲突了；
  + 解决方案: 1.把 mui.js 中的非严格模式的代码改掉，但是不现实；
  2.把webpack打包时候的严格模式禁用掉；
  + 最终，我选择了 planB 移除严格模式：
  使用这个插件  babel-plugin-transform-remove-strict-mode
  （https://github.com/genify/babel-plugin-transform-remove-strict-mode）
 5. 刚进入 图片分享页面的时候， 滑动条无法正常工作， 经过我认真的分析，发现， 如果要初始化 滑动条，必须要等 DOM 元素加载完毕，所以，我把 初始化 滑动条 的代码，搬到了 mounted 生命周期函数中； 
 6. 当 滑动条 调试OK后，发现， tabbar 无法正常工作了，这时候，我们需要把 每个 tabbar 按钮的 
 样式中  `mui-tab-item` 重新改一下名字；
 7. 获取所有分类，并渲染 分类列表；

 ### 制作图片列表区域
 1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 `lazy-load`
 2. 根据`lazy-load`的使用文档，尝试使用
 3. 渲染图片列表数据


