css.js

CSS性能优化
	1 合并css文件，如果页面加载10个css文件,每个文件1k，那么也要比只加载一个100k的css文件慢。
	2 减少css嵌套，最好不要嵌套三层以上。
	3 不要在ID选择器前面进行嵌套，ID本来就是唯一的而且权限值大，嵌套完全是浪费性能。
	4 建立公共样式类，把相同样式提取出来作为公共类使用。
	5 减少通配符*或者类似[hidden="true"]这类选择器的使用，挨个查找所有...这性能能好吗？
	6 巧妙运用css的继承机制，如果父节点定义了，子节点就无需定义。
	7 拆分出公共css文件，对于比较大的项目可以将大部分页面的公共结构样式提取出来放到单独css文件里，
		这样一次下载 后就放到缓存里，当然这种做法会增加请求，具体做法应以实际情况而定。
	8 不用css表达式，表达式只是让你的代码显得更加酷炫，但是对性能的浪费可能是超乎你想象的。
	9 少用css rest，可能会觉得重置样式是规范，但是其实其中有很多操作是不必要不友好的，有需求有兴趣，可以选择normolize.css。
	10 cssSprite，合成所有icon图片，用宽高加上background-position的背景图方式显现icon图，这样很实用，减少了http请求。
	11 善后工作，css压缩(在线压缩工具 YUI Compressor)GZIP压缩，是一种流行的文件压缩算法。

BFC
	格式化上下文

	触发：
		body 根元素、
		浮动元素、
		absolute、fixed
		inline-block、table-cells、flex
		overflow

	特性：
		 同一个 BFC 下外边距会发生折叠
		 BFC 可以包含浮动的元素（清除浮动）
		 BFC 可以阻止元素被浮动元素覆盖

重排(reflow、回流)和重绘(repaint)
	重排：
		添加/删除可见的DOM元素
		改变元素位置
		改变元素尺寸，比如边距、填充、边框、宽度和高度等
		改变元素内容，比如文字数量，图片大小等
		改变元素字体大小
		改变浏览器窗口尺寸，比如resize事件发生时
		激活CSS伪类（例如：:hover）
		width、height、margin、padding、display
		border-width、border

	重绘：
		元素的外观发生改变
		color、border-style、visibility、background
		text-decoration、background-image、background-position

	优化：
		减少重排范围：不要使用table布局
		减少重排次数

div垂直水平居中
	1 flex:
		父div: display:flex; justify-content:center; align-items:center;
	2 绝对定位1: 不确定当前div的宽度和高度
		position:absolute; left:50%; top:50%; transform: translate(-50%, -50%);
	3 绝对定位2: 确定了当前div的宽高度各100px
		position:absolute; left:50%; top:50%; margin-left:-50px; margin-top:-50px;
	4 绝对定位3: 
		position:absolute; left:0; top: 0; bottom: 0; right: 0; margin: auto;
讲一下浏览器渲染HTML的原理
