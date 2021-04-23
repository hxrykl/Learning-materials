
地址栏输入地址回车之后

说一下dns解析

说一下三次握手

说一下四次挥手

聊一下浏览器的安全问题

说一下浏览器单线程优化

说一下http和https的区别

说一下ssl优点

聊一下跨域问题

举例请求响应状态码

说一下浏览器缓存优化
	强缓存：无需发送请求，直接读取浏览器本地缓存（内存和磁盘）	
	Pragma:仅有一个属性，no-cache禁用强缓存，优先级高
	Cache-Control：优先级中
		max-age=10 距离发起时间的秒数，超过时过期
		no-cache 禁用强缓存
		no-store 不缓存禁用强缓存和协商缓存，每次向服务器请求最新资源
		public 允许中间代理的缓存
		private 只允许个人的缓存
		must-revalidate 过期后必须向服务器验证（协商缓存）
	Expires: 日期值，小于系统时间时过期。 优先级低

	协商缓存：强缓存失效或禁用时，
	Etag/If-None-Match：hash码，用于对比文件名称，文件修改但内容无变化时无法检测
	Last-Modified/If-Modified-Since：文件最后修改时间，存在时间秒级以下误差