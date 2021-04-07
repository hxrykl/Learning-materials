


vue项目的优化


3.0 响应式 Proxy 与 2.x Object.defineProperty
	API:Proxy 劫持整个对象，能监听到对象属性的增删改 
		Object.defineProperty劫持对象属性的访问和修改，不能监听到对象属性的增删

	兼容性：Proxy 支持现代主流浏览器，不支持IE
		   Object.defineProperty 支持主流浏览器及IE+9

	性能：Proxy 比 Object.defineProperty 慢
		 但初始化阶段 Proxy 不会对子对象递归成响应式，而 Object.defineProperty 会，
		 因此初始化阶段 Proxy 性能更好

vue生命周期

说一下父组件和子组件之间的通信
	prop、$emit、

	$attrs、$listeners：
		子组件定义v-bind="$attrs"获取非prop的父组件在子组件设置的属性
		inheritAttrs

	provide、inject、，父组件通过provide提供变量，子孙组件通过inject注入使用变量，轻松实现跨级访问祖先组件的数据

	EventBus.$on()监听 EventBus.$emit()分发 EventBus.$off()取消监听

	Vuex:state、getter、mutation、action

	this.$parent访问该组件的父组件、this.$children访问该组件的子组件

	$root设置根
