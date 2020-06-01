

/* 折线图 */
function getOneEcharts (id, data, type) { //type为true时为翻转为false时为正常
	var myChart = echarts.init(document.getElementById(id));	
	/**
	data: {
		yAxisName: ['商品排名', '商品销量'],
		yAxisData:[
			[220, 9322, 9031, 1934, 12920, 13330, 13420],
			[202, 4322, 8031, 3934, 12920, 13330, 13420],
		],
		xAxisName:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	}	
	*/

	//处理data.yAxisData
	let newyAxis = []
	data.yAxisData.map(function (item, index) {
		newyAxis.push({
			name: data.yAxisName[index],
			data: item, //格式为[220, 9322, 9031, 1934, 12920, 13330, 13420],
			type: 'line',
	        symbol: 'circle',//实心点
	        smooth: type ? true : false,//直线或曲线
	        areaStyle: {
	            opacity: type ? 0 : 1,//是否颜色叠层
	        },
		})
	})
	var option = {
	    color: ['#6478fb', '#f9d66e','#4ac6c5', '#37bc58','#f9d66e', '#8e5bde', '#ec5573'],
	    legend: { // 上头文字
	        data: data.yAxisName,//要与series.name对上
	        left: 25,
	        top: 18
	     },
	    tooltip: { //鼠标移入显示
            trigger: 'axis', // 坐标轴触发
            textStyle: {
              color: '#333'
            },
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#ccc',
	    },
	    grid: {
	        left: '2%',
	        right: '4%',
	        bottom: '3%',
	        top: '20%',
	        containLabel: true
	    },
	    xAxis: {
	        boundaryGap: false,
	        type: 'category',
	        axisTick: {
	            show: false //不显示刻度线
	        },
	        data: data.xAxisName,//格式为['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	    },
	    yAxis: {
	        inverse: type ? true : false,//是否翻转y轴
	        type: 'value',
	        splitLine: {
	            lineStyle: {
	                type: 'dashed', // 刻度线为虚线
	            }
	        },
	        axisLine: { // 坐标轴轴线相关设置
	            show: false, // 去掉y轴线
	        },
	        axisTick: {
	            show: false //不显示刻度线
	        }
	    },
	    series: newyAxis,
	};

	myChart.setOption(option);
}

/* 雷达图 */
function getRadarEchart (id, data) {
	var myChart = echarts.init(document.getElementById(id));
	/*
	*格式需要定义为
	*data:{
	*	name: ['销售','管理','信息技术'],   //类名字
	*	max: 10,                          //最大值
	*	value: [6, 5.5, 8],               //值
	*}
	*/
	let newName = []
	data.name.map(function (item) {
		newName.push({
			name: item,
			max: data.max,
		})
	})

	var option = {
	    color: ['#6478fb'],
	    title: {
	        text: '基础雷达图'
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    grid: {
	        left: '6%',
	        right: '6%', // grid 组件离容器右侧的距离
	        top: '20%',
	        bottom: '10%',
	      },
	    radar: {
	        name: {
	            textStyle: {
	                color: '#424276',
	            }
	        },
	        indicator: newName,
	    },
	    series: [{
	        type: 'radar',
	        areaStyle: {
	            opacity: 0.3,
	        },
	        data: [
	            {
	                value: data.value,
	            },
	            
	        ]
	    }]
	};
	myChart.setOption(option);
},

/*时间轴*/

function getTimeEcharts (id ,data) {

//  数据格式
// var goods = ['商品1', '商品2', '商品3'];
// var names = ['9块9包邮', '首页秒杀', '限时秒杀', '断码清仓', '多多进宝', '爱逛街' ];
// var datas = [
//     [
//         { 
//             name: '9块9包邮',
//             data: [
//                 1586966400000,
//                 1587052800000
//             ],
//         },
//         { 
//             name: '首页秒杀',
//             data: [
//                 1587139200000,
//                 1587312000000
//             ],
//         },
//     ],[
//         { 
//             name: '限时秒杀',
//             data: [
//                 1586966400000,
//                 1587052800000
//             ],
//         },
//         { 
//             name: '断码清仓',
//             data: [
//                 1587139200000,
//                 1587312000000
//             ],
//         },
//     ],[
//         { 
//             name: '限时秒杀',
//             data: [
//                 1586966400000,
//                 1587052800000
//             ],
//         },
//         { 
//             name: '断码清仓',
//             data: [
//                 1587139200000,
//                 1587484800000
//             ],
//         },
//     ]
// ]
// var data = {
//    goods: goods,
//    names: names,
//    datas: datas,
// }



	var myChart = echarts.init(document.getElementById(id));

	//自定义颜色
	var colors = ['#6478fb','#4ac6c5', '#37bc58', '#f9d66e', '#8e5bde', '#ec5573'];
	/*处理颜色*/
	function delColor (name) {
	   var i = data.names.indexOf(name);
	   return colors[i]
	}

	/* 处理数据*/
	var newdata = [];
	data.datas.map(function (item, index) {
	    
	    item.map(function (item1, index1) {
	        
	        newdata.push({
	            name: item1.name,
	            value: [index, item1.data[0], item1.data[1]],
	            itemStyle: {
	                normal: {
	                    color: delColor(item1.name)
	                }
	            }
	        })
	        
	    })
	    
	})
	
	/*处理legend*/
	var seriesS = []
	data.names.map(function(item, index) {
	    seriesS.push({
	        name: item,
	        type: 'custom',
	        renderItem: renderItem,//开发者自定义渲染逻辑
	        itemStyle: {
	            opacity: 1
	        },
	        encode: {
	            x: [1, 2],
	            y: 0
	        },
	        data: newdata
	    })
	})
	/*自定义渲染方法*/
	function renderItem(params, api) {
	    
	    var categoryIndex = api.value(0);
	    var start = api.coord([api.value(1), categoryIndex]);
	    var end = api.coord([api.value(2), categoryIndex]);
	    var height = api.size([0, 1])[1] * 0.6;

	    var rectShape = echarts.graphic.clipRectByRect({
	        x: start[0],
	        y: start[1] - height / 2,
	        width: end[0] - start[0],
	        height: height
	    }, {
	        x: params.coordSys.x,
	        y: params.coordSys.y,
	        width: params.coordSys.width,
	        height: params.coordSys.height
	    });

	    return rectShape && {
	        type: 'rect',
	        shape: rectShape,
	        style: api.style()
	    };
	}



	var option = {
	    color: colors,
	    legend: { // 上头文字
	        data: data.names,//要与series.name对上
	        left: 25,
	        top: 18,
	        formatter: function (name) {
	            return  name;
	        }
	    },
	    grid: {
	        left: '2%',
	        right: '6%', // grid 组件离容器右侧的距离
	        top: '20%',
	        bottom: '10%',
	    },
	    tooltip: {
	        formatter: function (params) {
	            var days = (params.value[2] -  params.value[1])/86400000
	            return params.marker + params.name + ': ' + days + ' 天';
	        }
	    },
	    xAxis: {
	        maxInterval: 3600 * 24 * 1000,//时间轴显示间隔
	        type: 'time',
	        boundaryGap: false,
	        scale: true,
	        axisTick: {
	            alignWithLabel: true,
	            show: false //不显示刻度线
	        },
	        axisLabel: {
	            formatter: function (val) {
	                var d = new Date(+ val).getDate();
	                var m = new Date(+ val).getMonth() + 1;
	                if (m < 10) m =  '0' + m 
	                return '' + m + '-'+ d
	            }
	        }
	    },
	    yAxis: {
	        data: data.goods,
	        axisTick: {
		       show: false //不显示刻度线
		    },
		    axisLabel: {
		        margin: 20,  
		        formatter: [
		            '',
		        ].join('\n'),
		    },
	    },
	    series: seriesS,
	};

	myChart.setOption(option);
},


