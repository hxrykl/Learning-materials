2、flex常用属性
	flex-direction 定义主轴
	flex-wrap 是否换行
	flex: grow shrink basis
	盈余空间的分配 亏损空间的贡献 基础值
12、flex布局；
	justify-content 子项目在主轴上的对齐方式
	align-content 子项目在次轴上的对齐方式（多行，要有换行才行）
	align-items 子项目在次轴上的对齐方式（单行）
	align-self （子属性）控制子项自己在次轴上的排列方式
37、flex:1 和 flex auto的区别
	flex:auto;  // flex:1,1,auto; 适用基于内容动态适配的布局
	flex:1;    //  flex:1,1,0%; 适用等分布局
1、CSS交互
	keyframes transition transform
11、水平垂直居中；
8、relative定位根据谁
	本身
21、position的具体属性
	relative absolute fixed sticky

19、Let const var区别-堆栈，数据结构
34、const 对象
30、事件委托原理？场景？
	事件冒泡，表格删除
29、实现浅拷贝/深拷贝方法？每个方法怎么实现的？
	浅拷贝 
		Object.assign 
		扩展运算符... 
		Array.prototype.concat 
		Array.prototype.slice
	深拷贝 
		JSON.parse(JSON.stringify(obj))
		递归实现
		lodash的_.cloneDeep()
17、事件循环，this；
44. 改变this指向 call apply bind
4，es6的新特征
	1、let和const；2、symbol；3、模板字符串；4、解构表达式；5、对象方面，如Map和Set；6、函数方面，如参数默认值和箭头函数；
26、箭头函数区别
41、箭头函数this指向的工作流程
7、promise.all；
	promise实例数组全部是成功态时返回promise实例数组
	有一个失败时返回第一个失败
27、Promise.all 其中一个失败
18、Promise async await这些
33、promise 状态、使用
	pending、fulfilled、rejected
39、promise实现并发请求 防抖函数 单击双击实现 点赞发请求后端没返回在一秒之后返回对应结果
	
5、Vue生命周期
	created beforeCreate
	mounted beforeMount
	updated beforeUpdate	
	destroyed beforeDestroy	
	activated keep-alive 缓存的组件激活时
	deactivated keep-alive 缓存的组件停用时调用
38、在created 怎么获取dom的
	$nextTick 和 setTimeout 
35、watch、computed区别与场景
	1 是否支持缓存
	2 是否支持异步操作
	3 watch默认第一次不做监听 immediate
	computed 一受多影响 购物车结算
	watch 一影响多 搜索框
23、vue 组件传值

36、slot使用
	默认插槽
	具名插槽
	作用域插槽
42、$slots,$listeners,ngix反向代理，css预编译
43、高阶函数，scpot是如何操作实现等等
24、v-if v-show区别
	1 v-show display:none  v-if直接删除dom
	2 v-if有一个局部编译/卸载的过程,伴随钩子触发
	3 性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；
28、v-if 从true到false的过程，
	触发beforeCreate，created，beforeMount，mounted钩子
45. vue响应式原理
	数据劫持 Object.defineProperty
	观察者模式 注册-发布
	组件初始化的时候，先给每一个Data属性都注册getter，setter，
	new 一个自己的Watcher对象
	watcher会立即调用组件的render函数去生成虚拟DOM
	在调用render的时候，就会需要用到data的属性值，此时会触发getter函数，将当前的Watcher函数注册进sub里。
	当data属性发生改变之后，就会遍历sub里所有的watcher对象，通知它们去重新渲染组件。 
		
40、vue3中异步请求还没结束，组件销毁了，数据应该办？处理不？怎么处理？

20、跨域产生的原因 解决方法
13、同源策略， 协议相同\域名相同\端口相同
31、跨域时浏览器是否携带cookie，另一个是跨域代理的实现原理
16、nginx属性
6、nginx配置

15、post请求和get请求区别，
	1 参数位置： get在url中，post在body中
	2 参数长度： get由浏览器限制，post没有
	3 参数类型： get只接受ASCII字符，post不限制
    4 安全： POST相比GET安全

14、HTTP请求协议
	GET、POST、HEAD、PUT、OPTIONS、DELETE
25、git命令
	git init 初始化仓库
	git config 配置基本信息
	git clone 克隆仓库
	git add 添加文件
	git commit 提交
	git branch 显示本地分支
	git checkout 切换分支
	git merge 合并分支
	git cherry-pick 合并指定提交版本
	git push 推送
	git pull 拉取