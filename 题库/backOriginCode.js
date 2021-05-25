实现 New

实现 const
	
实现一个call
	Function.prototype.newCall = function(context, ...args) {
		let newContext = context || window //不传时默认window
		newContext.fn = this //给传入的对象添加一个属性保存调用者,这个this就是调用者(方法)
		let result = newContext.fn(...args) //将调用者的执行结果保存起来
		delete newContext.fn //销毁避免污染
		return result
	}
实现一个apply
	Function.prototype.newApply = function(context, arg) {
		let newContext = context || window
		newContext.fn = this
		let result = newContext.fn(arg)
		delete newContext.fn 
		return result
	}

实现一个bind
	Function.prototype.newBind = function(context) {
		if(typeof this !== 'function'){
			throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
		}
		var self = this
		var args = Array.prototype.slice.call(arguments, 1)

		var fNOP = function () {}
		var fBound = function () {
			var bindArgs = Array.prototype.slice.call(arguments)
			return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
		}
		
		fNOP.prototype = this.prototype
		fBound.prototype = new fNOP()
		return fBound
	}
	

实现一个instanceof
	function newInstanceof(left, right) {
		let proto = left.__proto__
		let prototype = right.prototype
		while(true){
			if(proto === null) return false
			if(proto === prototype) return true
			proto = proto.__proto__//往上找
		}
	}

实现深浅拷贝
	递归：
	function deepClone(obj) {
		if(obj === null) return null
		let object = {}

		for(let key in obj) {

			if(typeof obj[key] === 'object') object[key] = deepClone(obj[key])
			else object[key] = obj[key]

		}

		return object
	}

	json方式：
	function deepClone(obj) {
		return JSON.parse(JSON.stringify(obj))
	}
