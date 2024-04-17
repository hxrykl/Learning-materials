什么是babel
	js的编译器，用来将最新的语法转换成es5语法，兼容浏览器执行，
	但不能转换最新api，可用babel-polyfill去引入新api

什么是webpack
	是一个打包工具

Tree Shaking（摇树）
	对于模块中未引入的代码不进行打包处理

Code Splitting 
	代码分割

什么是loader
	对于 .less .scss .vue 等文件的转换

vue 模板文件的解析过程

vue-loader 原理分析
	VueLoaderPlugin
		clonedRules
		pitcher

什么是Plugin
	丰富webpack功能，贯穿了整个webpack打包周期
	html-webpack-plugin 输出打包入口 index.html文件
	clean-webpack-plugin 清除上一次打包的目录结构


模块热更新原理 （Hot Module Replacement）
	1 通过webpack-dev-server创建两个服务器：提供静态资源的服务（express）和Socket服务
	2 express server 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）
	3 socket server 是一个 websocket 的长连接，双方可以通信
	4 当 socket server 监听到对应的模块发生变化时，会生成两个文件 .json（manifest文件）和 .js文件（update chunk）
	5 通过长连接，socket server 可以直接将这两个文件主动发送给客户端（浏览器）
	6 浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新

脚手架实现依赖
	chalk：终端字体颜色
	log-symbols：在终端上显示√或×等图标
	ora：终端显示下载中的动画
	download-git-repo：下载并提取git仓库
	fs-extra：删除非空文件夹
	inquirer：通用的命令行用户界面集合，用于交互
	commander：解析命令和参数，用于处理用户输入的命令
	shelljs：自动化处理重复的事


