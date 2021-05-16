实现 New

实现 const
	
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

