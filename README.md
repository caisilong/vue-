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

## 获取所有的评论数据 显示到页面中

## 实现点击加载更多评论的功能
1. 为加载更多按钮绑定点击事件
2. 点击加载更多 让 pageIndex++，然后重新调用 this.getComment()方法获取最新一页的数据
3. 为了防止新数据 覆盖 老数据的情况， 我们在 点击加载更多的时候， 每当获取到新数据，应该让老数据调用数组的 
concat方法拼接上新数组