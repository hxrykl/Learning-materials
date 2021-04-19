实现 New

实现 const
	
实现一个bind

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