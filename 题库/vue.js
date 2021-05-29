


vue项目的优化

说一说computed、watch、methods区别
	computed：计算缓存，依赖属性改变时再次执行、响应式
	watch：初始化时不监听，设置immediate可初始化监听
	methods: 每次获取都执行一次

理解computed的实现原理
	事件的发布-订阅模式来监听对象数据的变化实现的
	new Vue({}) 
	this._init(options)
	initComputed(vm, vm.$options.computed)





请对 Object.defineProperty 实现深度监听
	function observe(obj) { //
		Object.key(obj).map(item => {
			defineReactive(obj, item, obj[item])
		})
	}
	function defineReactive(obj, key, val) {
		if(Object.prototype.toString.call(val) === "[object Object]") observe(val)
		Object.defineProperty(obj, key, {
			enumerable: true,//可枚举
			configurable: true,//可删除修改
			get: function () {
				//
				return val
			},
			set: function (newVal){
				//
				val = newVal
			}
		})
	}

vm.$set()实现
	export function set(target, key, val){
		//数组
		if(Array.isArray(target) && isValidArrayIndex(key)){
			target.splice(key,1,val)//利用重写的数组方法splice触发响应式
			return val
		}
		//对象
		if(key in target && !(key in Object.prototype)){
			target[key] = val
			return val
		}
		//不满足更新条件时创建新属性
		const ob = target.__ob__ //获取observe实例
		//target是响应式时
		if(!ob){
			target[key] = val
			return val
		}
		defineReactive(ob.value, key, val)
		ob.dep.notify()
		return val
	}

vm.$nextTick原理
	使用异步方式优先级： Promise > MutationObserver（监听DOM修改事件） > setImmediate > setTimeout

	const callbacks = [] //一个task内存放多个nextTick
	let pending = false //为了拦截多个nextTick时只执行一次flushCallbacks

	function flushCallbacks () {
	  pending = false
	  const copies = callbacks.slice(0)
	  callbacks.length = 0
	  for (let i = 0; i < copies.length; i++) {
	    copies[i]( "i")
	  }
	}
	let timerFunc = () => {
		const p = Promise.resolve()
		p.then(flushCallbacks)
	}
	function nextTick(cb, ctx) {
		callbacks.push(() => {
		    cb.call(ctx)
		})
		if(!pending){
			pending = true
			timerFunc()
		}
		
	}

3.0 响应式 Proxy 与 2.x Object.defineProperty 区别（三点）
	API作用:Proxy 劫持整个对象，能监听到对象属性的新增、删除、修改 
		Object.defineProperty劫持对象属性的访问和修改，不能监听到对象属性的新增、删除

	兼容性：Proxy 支持现代主流浏览器，不支持IE
		   Object.defineProperty 支持主流浏览器及IE+9

	性能：Proxy 比 Object.defineProperty 慢
		 但初始化阶段 Proxy 不会对子对象递归成响应式，而 Object.defineProperty 会，
		 因此初始化阶段 Proxy 性能更好

vue生命周期
	created
	mounted
	updated
	destoryed


说一下父组件和子组件之间的通信（七种）
	prop、$emit：

	$attrs、$listeners：
		子组件中 this.$attrs 获取非prop、class、style的父组件在子组件上设置的属性
		inheritAttrs: false 不希望当前组件的根元素继承属性

		$listeners：获取父组件在根组件上绑定的所有事件
		子组件中设置 v-on="$listeners" 则可以从孙组件传递事件到父组件

	$parent、$children：
		this.$parent 访问该组件的父组件、
		this.$children 访问该组件的子组件 （节制使用：组件复用混乱）

	provide、inject：
		父组件通过provide提供变量，子孙组件通过inject注入使用变量，轻松实现跨级访问祖先组件的数据

	EventBus.$on()监听 EventBus.$emit()分发 EventBus.$off()取消监听事件

	Vuex:state、getter、mutation、action

	$root设置根
