Vue3 与 Vue2 的区别
	1 响应式原理
		Proxy / Object.defineProperty 区别（三点）
		1 API作用:Proxy 劫持整个对象，能监听到对象属性的新增、删除、修改 
			Object.defineProperty 劫持对象属性的访问和修改，不能监听到对象属性的新增、删除

		2 兼容性：Proxy 支持现代主流浏览器，不支持IE
			   Object.defineProperty 支持主流浏览器及IE+9

		3 性能：Proxy 比 Object.defineProperty 慢
			 但初始化阶段 Proxy 不会对子对象递归成响应式，而 Object.defineProperty 会，
			 因此初始化阶段 Proxy 性能更好
	2 多根节点
		template下能够多个div
	3 打包优化
		Vue2 全局API暴露在Vue实例上 无法通过 tree-shaking 进行消除
		Vue3 全局API现在只能作为ES模块构建的命名导出进行访问
	4 Diff算法优化
	5 Composition API
		Vue2 是选项API（Options API）
		Vue3 组合式API（Composition API）
	6 TypeScript支持
		面向对象编程

vue3 Diff算法
	使用了快速diff算法，核心方法是patchKeyedChildren，用一个i变量对比前节点，oldEnd和newEnd对比后结点，
	然后处理剩余节点3种情况：只有新的一组的子节点有剩余、只有老的一组的子节点有剩余、新老两组的子节点都有剩
	新老两组有剩余情况下用新节点长度建立存储新节点索引的老节点顺序数组