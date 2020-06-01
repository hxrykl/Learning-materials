/* 折线图 */
function getOneEcharts (id, data, arr) { //arr为选中的数组
	var myChart = echarts.init(document.getElementById(id));	
	// let data = {
	// 	yAxisName: ['商品排名', '商品销量'],
	// 	yAxisData:[
	// 		[220, 9322, 9031, 1934, 12920, 13330, 13420],
	// 		[202, 4322, 8031, 3934, 12920, 13330, 13420],
	// 	],
	// 	xAxisName:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
	// }	
	// let arr = [0,1,]


	let type = false
	//处理显示项
	let showData = {
		yAxisName: [],
		yAxisData: [],
	}
	arr.map(function (item) {
		showData.yAxisName.push(data.yAxisName[item])
		showData.yAxisData.push(data.yAxisData[item])
	})
	//处理data.yAxisData
	let newyAxis = []
	showData.yAxisData.map(function (item, index) {
		newyAxis.push({
			name: showData.yAxisName[index],
			data: item, //格式为[220, 9322, 9031, 1934, 12920, 13330, 13420],
			type: 'line',
	        symbol: 'circle',//实心点
	        smooth: !type ? true : false,//直线或曲线
	        areaStyle: {
	            opacity: !type ? 0 : 1,//是否颜色叠层
	        },
		})
	})
	var option = {
	    color: ['#6478fb', '#f9d66e','#4ac6c5', '#37bc58','#f9d66e', '#8e5bde', '#ec5573'],
	    legend: { // 上头文字
	        data: showData.yAxisName,//要与series.name对上
	        left: 25,
	        top: 18,
	        icon: 'rect',//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
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
	        data: showData.xAxisName,//格式为['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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

/* 饼图*/
function getOneEcharts (id, data) { //arr为选中的数组
	var myChart = echarts.init(document.getElementById(id));	
	// let data = {
	 //    seriesData: [
	 //        {value: 30.00},
	 //        {value: 70}
	 //    ]
	// }

option = {
    color: ['#5050c9','#ccc'],
    title: {
      text: data.seriesData[0].value + '%',
      subtext: '直接访问',
      x : 'center',
      y : 'center',
      textStyle:{
          fontSize: 14,
          color: '#666'
      },
      subtextStyle:{
          fontSize: 14,
          color: '#666'
      }
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            itemStyle: {
              normal: {
                label: {
                show: false,
                },
                labelLine: {
                  show: false
                }
              }
            },
            labelLine: {
                show: false
            },
            data: data.seriesData
        }
    ]
};

	myChart.setOption(option);
}