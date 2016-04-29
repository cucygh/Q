# Q.js
## 让移动单页面项目开发更简单
### 安装

``` shell
cd Q
npm install
```

### 一、快速上手

``` html
<!DOCTYPE html>
<html>
<head>
    <title>Q.js快速上手</title>
    <meta charset='utf-8'>
    <meta name="viewport" content="initial-scale=1, minimum-scale=1, user-scalable=no">
</head>
<body>
	<app></app>
 	<script src="/javascripts/index.min.js" charset="utf-8"></script>
	<script type="text/script">
		var q=new Q;
		q.view({
		    name:'sub',
		    template:'<div>第一个视图</div>'
		});
		q.view({
		    name:'major',
		    template:'<div>第二个视图</div>'
		});
		q.start();
	</script>
</body>
</html>
```

### 二、用户API指南

- view 定义视图
	- name 【必选】视图的名称，也就是路由的路径
	- template 【可选】视图的模板，和ajax选项二选一
	- ajax 【可选】视图对应的服务端接口，和template选项二选一
	- ajaxType 【可选】ajax的方式，默认是POST
	- AjaxDataType 【可选】数据类型，默认是json
	- ajaxData 【可选】向服务端提交的数据，可以是json也可以是function，注：如果是function一定要返回json
	- success 【可选】和ajax同时出现，需要返回处理后的模板

	注：视图定义支持多层嵌套
- start 启动应用
- go 定位到指定的视图
	- name 视图的名称，如果视图无效，go不会有任何效果
- translate 视图切换的逻辑层
	- name 视图的名称

	注：目前视图切换支持2层嵌套已足够满足应用，如果支持多层嵌套，请重新定义translate接口。

### 三、开发API指南

- viewList 应用的视图列表
- swipeList 应用的Swipe列表
- viewActive 激活视图，使用go(viewName)的时候先触发视图的模板编译，编译通过后会触发viewActive事件，进而调用viewActive
- getRoot 获取根节点的name
- getView 根据视图名称获取指定视图对象
- getSwipe 根据名称获取指定的Swipe对象
- insertPage 插入Page，任何视图都是嵌套在Page里的
	- parent	父节点，不是单纯意义的DOM父节点，而是app->page->view->page->view列表的上一级节点
	- name 视图的名称，要插入视图的名称
- insertView 插入视图
	- parent 父节点，同insertPage
	- name 视图名称
- getID 获取一个随机的5位字母为id，每个节点在编译的时候需要一个id

### 四、问题

- 目前视图渲染的顺序呢没有按视图定义的顺序来渲染，而是按访问的顺序
- 嵌套的时候需要加加载父级视图才可以
