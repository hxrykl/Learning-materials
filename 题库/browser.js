
地址栏输入地址回车之后

说一下dns解析

说一下TCP三次握手
	客户端 同步序列编号SYN（SEQ=x）报文 服务器
	服务器 服务端的序列号SYN（SEQ=y）确认字符ACK=x+1 客户端
	客户端 确认字符ACK=y+1 服务器

说一下TCP四次挥手
	客户端 FIN（SEQ=k） 服务器
	服务器 ACK=k+1 客户端
	服务器 FIN（SEQ=L）客户端
	客户端 ACK=L+1 服务器

聊一下浏览器的安全问题

CSRF（跨站请求伪造）攻击
	通过被攻击者网站本地cookie信息加上攻击者网站img标签的src或提交表单发起的请求（get/post）
	防御手段：（3 种）
		验证 HTTP Referer 字段
			Referer的值是当前所在页面的URL,但浏览器IE6有方法篡改Referer值，
			新的浏览器也允许用户取消提供Referer值

		在请求地址中添加 token 并验证
		在 HTTP 头中自定义属性并验证

说一下浏览器单线程优化


说一下http和https的区别

说一下 HTTP/1.1 与 HTTP/2 区别
	HTTP/1.1
		高延迟: 页面访问速度下降 （可优化队头阻塞）
		明文传输：不安全
		无状态：头部巨大且重复，cookie、Accept、User Agent（操作系统及浏览器信息）
		不支持服务器推送: 用定时器去获取通知时浪费资源

	HTTP/2: HTTP/2 基于 SPDY，专注于性能，最大的目标是在用户和网站间只用一个连接（connec-tion）。
		二进制传输
		Header 压缩（HPACK）
		多路复用
		服务端 Push
		提高安全性

队头阻塞（Head-Of-Line Blocking）及解决办法（五种）
	HTTP/1.1 引进管道机制，允许在同一个TCP连接里发起多个请求
	响应时按顺序返回，某个请求阻塞时，后面排队请求的也被阻塞

	使用多个域名： 同一个页面的资源分散到不同域名，提升并发连接，浏览器通常一个域名HTTP连接上限是6个
	引入雪碧图： 多张小图合并成一个大图，减少多个请求
	将小图内联：小图片转换为base64编码，嵌入页面中，减少请求
	使用 webpack 等工具打包： 打包压缩多个js文件合并成一个，减少多个请求
	按需加载： 当前页面非需要的资源不做请求

说一下ssl优点

聊一下跨域问题
	JSONP：script、img获取资源的标签是没有跨域限制
	CORS（跨域资源共享Cross-origin resource sharing）：简单请求和非简单请求。
	Proxy:

举例请求响应状态码

聊一下浏览器缓存位置（四个）
	Service Worker:
		传输协议必须为 HTTPS
	Memory Cache
		短、小、快，关闭 Tab 页面，内存释放
	Disk Cache
		久、大、慢，跨站点可用同地址的资源，
	Push Cache： 
		HTTP/2 

说一下浏览器的缓存过程
	浏览器发起请求时，去浏览器缓存查找是否有该请求的结果及标识（URL及Content-Type,CORS等）
	如果没有时发起HTTP请求，获取结果和缓存规则
		将请求结果及标识存入浏览器缓存中
	如果有先验证是否有强缓存、是否过期、发起请求与服务器通信、协商缓存方式验证是否新鲜
		不过期就使用浏览器缓存，过期就获取结果、缓存规则存入浏览器缓存

说一下浏览器缓存策略优化
	方案：HTML协商缓存， js、css、图片等强缓存+文件名hash

	强缓存：无需发送请求，直接读取浏览器本地缓存（内存和磁盘）	
		Pragma:仅有一个属性，no-cache禁用强缓存，优先级高
		Cache-Control：优先级中 http1.1
			max-age=10 第一次获取资源时间date之后最大时间
			no-cache 禁用强缓存 
			no-store 不缓存禁用强缓存和协商缓存，每次向服务器请求最新资源
			public 允许中间代理的缓存
			private 只允许个人的缓存
			must-revalidate 过期后必须向服务器验证（协商缓存）
		Expires: 服务器系统计算出的时间值，小于本地时间时过期（因为强缓存不达到服务器）。 优先级低 http1.0

	协商缓存：强缓存失效或禁用时，与服务器通信决定是否使用缓存（走协商缓存时，不管结果如何，Date 值更新，导致强缓存重新生效）
		Etag/If-None-Match：hash码，用于对比文件名称，文件修改但内容无变化时无法检测 http1.1
		Last-Modified/If-Modified-Since：文件最后修改时间，存在时间秒级以下误差 http1.0

		Etag（优先级高于Last-Modified） 解决了 Last-Modified 因为文件周期性变更时间内容不变却重新请求问题

	ctr+F5 时强缓存和协商缓存失效， F5时强缓存失效， Disable cache 清空缓存
	注意：浏览器默认缓存时间 = (最新访问时间Date - last-modified时间) / 10 秒
		如果没有设置强缓存，默认缓存会生效，且优先级高于协商缓存
