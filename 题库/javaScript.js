
说一下原型链（三个关键词）
	__proto__，prototype，constructor
	在引用类型中，都有一个__proto__属性，这个属性会指向创建当前类型的构造函数的原型prototype，
	这个原型是对象，也有__proto__属性，指向的是创建当前构造函数的构造函数的原型prototype，(一般是Object的原型)
	顺着__proto__往上找，最终会指向Object的原型prototypr，之后就是null。

	引用类型中之所以能够调用toString方法，就是因为通过原型链继承了来自Object原型prototype的方法。
	而consturctor是原型prototype的属性，指向的是函数本身，进而能够解释为什么被创建的对象能够通过constructor
	确认创建自己的构造函数

基本类型包装器
	为了实现基本数据类型直接调用方法 '12345'.substring(5,15)
		创建String类型的一个实例 var _realMessage = new String("12345");
		在实例上调用指定的方法 var myMessage = _realMessage.substring(5,15);
		销毁这个实例 _realMessgae = null;

说一下继承（六种）
	原型链继承： Fun.prototype = new F() 新实例的原型指向父类的实例
	借用构造函数继承： F.call(this, 'tony') 只能继承父构造函数的属性
	组合继承：原型链继承与借用构造函数继承结合，克隆父构造函数属性又继承父类构造函数原型
	原型式继承：
	寄生式继承：
	寄生组合式继承：

new操作中发生了什么
	创建一个新的空对象，
	新的对象有一个__proto__属性指向构造函数的原型prototype

理解 js 中的执行上下文和执行栈
	执行上下文有：全局执行上下文（一个）、函数执行上下文（多个，执行函数时创建）eval执行上下文
	执行栈：先进后出原则执行全局执行上下文和函数执行上下文

说一下事件循环（event loop）
	在浏览器中，为了维护用户点击、页面渲染、脚本执行，网络请求等事件处理，采用事件循环机制。
	宏任务：script、setTimeout、setInterval、MessageChannel、I/O、UI交互事件、postMessage、setImmediate
	微任务:Promise.then、MutationObserver（变动观察器）、async await 之后代码
	v8单线程,当一个宏任务同步任务执行完毕，立即执行当前微任务队列中的所有微任务，页面渲染，之后再执行宏任务队列中的下一个宏任务，以此循环

深度说一下闭包
	本质是函数嵌套函数。通过函数内部可访问函数外部的参数及变量这一特性，当内部嵌套函数作为返回值时，
	函数的参数及变量不会被垃圾回收机制回收（嵌内部套函数未执行前，函数变量不能被释放）。
	因此消耗一定内存，但也保护了函数内部变量不会被污染。

谈一下垃圾回收
	为什么：为了避免内存泄漏，v8引擎会对没有引用到的对象或对象环进行回收处理
	怎么做：通过标记清除、引用计数等策略进行垃圾回收

深度聊一下内存泄漏
	当用不到的内存没有得到及时的释放，就叫内存泄漏。过多内存泄漏会影响性能，甚至系统崩溃。
	泄漏点：闭包、BOM中的定时器、DOM中的监听事件回调函数
	
说一下函数柯里化
	把多参数传入的函数拆成部分函数，
	内部再返回调用下一个部分函数，依次处理剩余的参数。

说一下 var、let、const（三个方面）
	作用域：var不受限块级作用域，let和const受限
		全局作用域下，var会成为全局对象属性，let和const不会

	声明：var可重复声明，let和const不可
		const声明时必须赋值，且不能修改变量值，但可修改变量指向的对象属性、
	
	变量提升：都会变量提升。var提升了创建及初始化，let、const提升了创建（暂时性死区）
		var 变量提升会给到undefined（未定义） let变量提升会给到uninitialized（未初始化）
		var a = 1; if(true){console.log(a,'2'); let a = 3;}//Cannot access 'a' before initialization

为什么会有变量提升？
	解析阶段：JS会检查语法，并对函数进行预编译。
	执行阶段：逐条解释每条语句并执行
	解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
	声明提升还可以提高JS代码的容错性，使一些不规范的代码也可以正常执行
	
说一下call、apply、bind区别
	都是改变this指向
	call与apply的区别在于第一个参数之后，call是传的是实参列表，apply传的是数组或类数组
	call与bind区别在于，call是立即执行，bind不是	

谈一下箭头函数与普通函数区别（四点）
	没有自己的this，会捕获其所在的上下文的this值（箭头函数被定义时所在作用域的this），作为自己的this值
	不能作为构造函数，没有原型prototype，不能使用new
	不能当做Generator函数，不能使用 yield 关键字
	没有arguments，只能用解构 ... 解决 

说一下this指向
	在函数调用时，才能确定this指向，谁调用指向谁，链式调用指向最后一个，没有明确调用对象，指向window
	一般函数this指向可用fun.call(context,obj1)理解，箭头函数不行

谈一下js严格模式
	提高代码健壮性，很多情况下，对于不会报错的语句，抛出错误提示并阻止执行代码	。
	全局作用域下的this是undefined，不是window
	
如何让事件先冒泡后捕获
	默认情况下，事件流的执行顺序是：先捕获，后冒泡。

	要想先冒泡后捕获，可以在添加监听事件时addEventListener第三个参数设置布尔值，
	true为捕获阶段触发事件，false为冒泡阶段触发事件。

	如果在一个元素上绑定捕获和冒泡两个阶段的事件，且触发事件的目标直接是当前元素时，
	冒泡和捕获两个事件执行的顺序是遵循js执行上下文去执行的。即将冒泡事件写在捕获事件前面，即可

	如果触发事件的目标是当前绑定事件元素的子元素，事件的执行顺序是先捕获，后冒泡，需要用setTimeout或者setinterval
	将监听到的捕获事件暂停，等待冒泡事件触发后再继续执行。

说说前端中的事件流
	描述的是事件发生的顺序
	包含三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段
	事件捕获阶段：自上而下，从window到目标元素
	事件冒泡阶段：自下而上，从目标元素到窗口

说一下事件委托
	为了减少dom操作，需要事件委托，进而提高性能。
	本质是通过事件冒泡，将事件绑定到目标元素的父元素上，触发事件时通过回调参数判定目标元素。

聊一下数据类型的判断（四种）
	数据类型（10）：string、number、boolean、symbol、bigint、undefined、null,object、funciton、array

	typeof:
		用来判断 number、string、boolean、undefined、symbol、bigint、function（七种类型）
		object、array、null为object，因为js判断类型用底层机器码低位标识，对象为000，null全为0。

	instanceof:一般用来判断引用数据类型，Object、Function、Array、Date、RegExp等，通过原型链查找是否父或祖的原型
		let c = new C(); c.__proto__ === C.prototype

	constructor：判断原理基本与instanceof一致，
		区别在于constructor是属性,只能判断当前的构造函数，instanceof是关键字，可以判断父祖构造函数

	Object.prototype.toString:（最准确、最广范）
		Object.prototype.toString.call('.') // "[object String]"
		Object.prototype.toString.call(null) ; // "[object Null]"
		Object.prototype.toString.call(undefined) // "[object Undefined]"
		Object.prototype.toString.call(Symbol()) // "[object Symbol]"

typeof 的原理
	js 在底层存储变量时，用机器码的低位1-3 位存储其变量类型信息
	000：对象
	010：浮点数
	100：字符串
	110：布尔
	1：整数
	null机器码均为0
	undefined：-2^30


模板字符串
	反引号` ` 加 ${};//可以在里面执行js代码

0.1+0.2=0.30000000000000004
	
	计算机采用二进制表示，0.1 => 0.001100110011...
	

