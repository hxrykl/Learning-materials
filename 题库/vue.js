


vue项目的优化
	代码层面的优化
		1 长列表性能优化/大数据量冻结处理
			通过 Object.freeze 冻结数据，使得 Object.defineProperty不能劫持
		2 虚拟长列表
			窗口化
		3 图片资源懒加载
			使用vue-lazyload，当图片滚动到可视区域再加载
		4 v-if 和 v-show 区分使用场景
	Webpack 层面的优化
		1 Webpack 对图片进行压缩
			对图片过小可以转base64,过大的用 image-webpack-loader 来压缩
		2 提取公共代码
			4.0 CommonsChunkPlugin / 5.0 splitchunksplugin
		3 优化 SourceMap
			生产环境推荐：cheap-module-source-map
	基础的 Web 技术优化
		1 开启 gzip 压缩
		2 浏览器缓存
			HTML协商缓存， js、css、图片等强缓存+文件名hash
		3 CDN 的使用
		4 使用 Chrome Performance 查找性能瓶颈


v-model实现

vue响应式原理
	采用 Object.defineProperty 数据劫持 结合 发布者-订阅者模式
	Observer：对data数据进行劫持
	Dep：收集 Watcher
	Watcher： 通知更新页面
	Compiler： 解析模板中的vue指令，将所需的data渲染到模板中
	1 依赖收集
		Compiler解析 -> Observer触发get -> Dep订阅Watcher
	2 派发更新
		data数据修改Observer触发set -> Dep通知Watcher -> 调用updateComponent -> 执行renders生成vnode -> 通过pacth去diff -> 渲染

vue2 diff算法
	vue2采用了双端diff算法。核心方法是updateChildren,通过新前与旧前、新后与旧后、新后与旧前、新前与旧后、暴力比对5种查找

vue双向绑定原理解析

为什么data是函数式返回值而不是对象？
	在组件化条件下，为了维护多实例引用时对对象的独立拷贝，而不是共享一个对象的引用

	
说一说computed、watch、methods区别
	computed：计算缓存，依赖属性改变时再次执行、响应式，不支持异步，支持缓存
	watch：初始化时不监听，设置immediate可初始化监听，支持异步，不支持缓存
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
	使用异步方式优先级： Promise > MutationObserver（监听DOM修改事件,已摒弃） > setImmediate > MessageChannel.postMessage > setTimeout

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

	vue3
		const p = Promise.resolve()
		export function nextTick(fn?: () => void): Promise<void> {
		  return fn ? p.then(fn) : p
		}
		const queue: (Job | null)[] = []
		export function queueJob(job: Job) {
		  // 去重 
		  if (!queue.includes(job)) {
		    queue.push(job)
		    queueFlush()
		  }
		}
		export function queuePostFlushCb(cb: Function | Function[]) {
		  if (!isArray(cb)) {
		    postFlushCbs.push(cb)
		  } else {
		    postFlushCbs.push(...cb)
		  }
		  queueFlush()
		}
		function queueFlush() {
		  // 避免重复调用flushJobs
		  if (!isFlushing && !isFlushPending) {
		    isFlushPending = true
		    nextTick(flushJobs)
		  }
		}

render函数实现



vue生命周期
	created beforCreate
	mounted 
	updated
	destoryed


说一下父组件和子组件之间的通信（七种）
	prop、$emit：

	$parent、$children：
		this.$parent 访问该组件的父组件、
		this.$children 访问该组件的子组件 （节制使用：组件复用混乱）

	provide、inject：
		父组件通过provide提供变量，子孙组件通过inject注入使用变量，轻松实现跨级访问祖先组件的数据

	$attrs、$listeners：
		子组件中 this.$attrs 获取非prop、class、style的父组件在子组件上设置的属性
		inheritAttrs: false 不希望当前组件的根元素继承属性

		$listeners：获取父组件在根组件上绑定的所有事件
		子组件中设置 v-on="$listeners" 则可以从孙组件传递事件到父组件

	Vuex:state、getter、mutation、action

	$root设置根

	EventBus.$on()监听 EventBus.$emit()分发 EventBus.$off()取消监听事件
