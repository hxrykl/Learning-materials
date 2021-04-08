
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
	Expires：响应头中的字段，发起请求的时间小于到期时间，则触发缓存，不再发起请求

	last-modified：响应头中的字段，If-Modified-Since请求头取last-modified的值，服务器做对比，决定200或304
		侦测时间最小单位为1s

	Cache-Control：控制缓存，优先级高于expires
		max-age=30 缓存30秒后过期
		public 允许响应可以被客户端和代理服务器缓存
		private 响应只允许客户端缓存