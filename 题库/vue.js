



3.0 响应式 Proxy 与 2.x Object.defineProperty
	API:Proxy 劫持整个对象，能监听到对象属性的增删改 
		Object.defineProperty劫持对象属性的访问和修改，不能监听到对象属性的增删

	兼容性：Proxy 支持现代主流浏览器，不支持IE
		   Object.defineProperty 支持主流浏览器及IE+9

	性能：Proxy 比 Object.defineProperty 慢
		 但初始化阶段 Proxy 不会对子对象递归成响应式，而 Object.defineProperty 会，
		 因此初始化阶段 Proxy 性能更好