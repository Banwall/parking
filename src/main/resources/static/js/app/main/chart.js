var chart = new Chart(document.getElementById("myChart1234"), {
	type: "bar", // pie, line, donut, polarArea ...
	data: {
		labels: ['총 이용자 수'],
		datasets: [{
			label: [ "총 이용자 수" ],
			data: ['1','2']
		}],
	},
	options: {
		plugins: {

		},
		responsive: false,
	},
});

function getChartData(el) {
	let dataList = [];
	let timeList = [];
	let code = $("#chartCdSelect").val();
	
	if(code == null || code == "") {
		code = el;
	}
	
	$.ajax({
		url: "/device/getChartData?code=" + code,
		contentType: 'application/json',
		type:"GET",
	})
	.done(function(data) {
		
		data.reverse();
		
		for(var i=0; i<data.length; i++) {
			dataList.push(Number(data[i].value))
			timeList.push(data[i].mdt)
		}
		
		chart.destroy();
		
		chart = new Chart(document.getElementById("myChart"), {
			type: "line", // pie, line, donut, polarArea ...
			data: {
				labels: timeList,
				datasets: [
					{
						label: [
							"총 이용자 수"
						],
						data: ['1','2'],
						borderColor: [
							"rgba(255, 99, 132, 1)"
						],
						borderWidth: 2
					}
				],
			},
			options: {
				plugins: {
					
				},
				responsive: false,
			}
		});
	})
}