// 实现 New

// 实现 const
	
// 实现一个call
	Function.prototype.newCall = function(context, ...args) {
		let newContext = context || window //不传时默认window
		newContext.fn = this //给传入的对象添加一个属性保存调用者,这个this就是调用者(方法)
		let result = newContext.fn(...args) //将调用者的执行结果保存起来
		delete newContext.fn //销毁避免污染
		return result
	}
// 实现一个apply
	Function.prototype.newApply = function(context, arg) {
		let newContext = context || window
		newContext.fn = this
		let result = newContext.fn(arg)
		delete newContext.fn 
		return result
	}

// 实现一个bind
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
	

// 实现一个instanceof
	function newInstanceof(left, right) {
		let proto = left.__proto__
		let prototype = right.prototype
		while(true){
			if(proto === null) return false
			if(proto === prototype) return true
			proto = proto.__proto__//往上找
		}
	}

// 实现深浅拷贝
	// 递归：
	function deepClone(obj) {
		if(obj === null) return null
		let object = {}
		for(let key in obj) {
			if(typeof obj[key] === 'object') object[key] = deepClone(obj[key])
			else object[key] = obj[key]
		}
		return object
	}

	// json方式：
	function deepClone(obj) {
		return JSON.parse(JSON.stringify(obj))
	}

	Object.create()实现
	function deepClone(obj) {
		let copy = Object.create(Object.getPrototypeOf(obj))

		Object.keys(obj).forEach( name => {
			let desc = Object.getOwnPropertyDescriptor(obj, name);
    		Object.defineProperty(copy, name, desc);
		})

		return copy
	}

// 实现防抖
function debounce (fn, delay) {
	let timer = null
	return function () {
		let args = arguments
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}

// 实现节流
function throttle (fn, delay = 1000) {
	let pre = null
	return function () {
		let args = arguments
		let now = + new Date()
		if (now - pre >= delay) {
			fn.apply(this, args)
			pre = now
		}
	}
}

// 实现一个Promise.all
function PromiseAll(arr) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(arr)) {
			return reject('只接受数组作为参数')
		}
		let n = 0,
			result = [];
		for (let i = 0; i < arr.length; i++) {
			Promise.resolve(arr[i]).then(res => {
				n ++
				result[i] = res
				if (n === arr.length) {
					resolve(result)
				}
			})
			.catch(err => {
				reject(err)
			})
		}
	})
}
// 实现一个Promise.race
function PromiseRace(arr) {
	return new Promise((resolve, reject) => {
		if (!Array.isArray(arr)) {
			return reject('只接受数组作为参数')
		}
		for (let i = 0; i < arr.length; i++) {
			Promise.resolve(arr[i]).then(res => resolve(res))
			.catch(err => reject(err))
		}
	})
}

// 实现一个async await
function generatorToAsync(generatorFn) {
    return function () {
        //生成迭代器
        const gen = generatorFn.apply(this, arguments) // gen有可能传参
        // 返回一个Promise
        return new Promise((resolve, reject) => {
            function go(key, arg) {
                let res
                try {
                    res = gen[key](arg) // 这里有可能会执行返回reject状态的Promise
                    //即调用gen.next(arg)，并传入参数
                } catch (error) {
                    return reject(error) // 报错的话会走catch，直接reject
                }
                // 解构获得value和done
                const { value, done } = res
                if (done) {
                    // 如果done为true，说明走完了，进行resolve(value)
                    return resolve(value)
                } else {
                    // 如果done为false，说明没走完，还得继续走

                    // value有可能是：常量，Promise，Promise有可能是成功或者失败
                    //注意，如果传入的promise，那么它会简单的直接返回该promise对象
                    return Promise.resolve(value).then(
                        (val) => go('next', val), //如果还没结束，就再次调用go方法，同时传递结果值
                        (err) => go('throw', err),
                    )
                }
            }

            go('next') // 第一次执行
        })
    }
}

function* gen() {
    const num1 = yield fn(1)
    console.log(num1) // 2
    const num2 = yield fn(num1)
    console.log(num2) // 4
    const num3 = yield fn(num2)
    console.log(num3) // 8
    return num3
}

const genToAsync = generatorToAsync(gen)
const asyncRes = genToAsync()
console.log(asyncRes) // Promise
asyncRes.then((res) => console.log(res)) // 8