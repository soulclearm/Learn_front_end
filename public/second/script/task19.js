window.onload = function(argument) {
	var $ = function(str) {
		return document.querySelector(str);
	}

	var arrData = [];

	function randomBuildData() {
		arrData = [];
		for (var i = 0; i < 60; i++) {
			var num = Math.ceil(Math.random() * 91 + 9);
			arrData.push(num);
		}

		render();
	}

	function sortFunc() {
		function swap(i, j) {
			var temp = arrData[i];
			arrData[i] = arrData[j];
			arrData[j] = temp;
		}

		function qsort(left, right) {
			if (left >= right) {
				return;
			}

			var k = left;
			var i = left;
			var j = right;
			while (i < j) {
				while (arrData[j] >= arrData[k] && i < j) { j-- }
				while (arrData[i] <= arrData[k] && i < j) { i++ }
				swap(i, j);
			}
			swap(j, k);

			qsort(left, j - 1);
			qsort(j + 1, right);
		}
		qsort(0, arrData.length - 1);

		render();
	}

	var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
		'#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'
	];

	function getBGColr(num) {
		return colors[Math.floor(num / 10)];
	}

	function render() {
		$('#numContainer').innerHTML = arrData.map(function(d) {
			return "<b style = 'height:" + (d * 2) + 'px; background-color:' + getBGColr(d) + "';>" + d + '</b>';
		}).join('');
	}

	function addEvents() {
		$('#createArray').addEventListener('click', randomBuildData);
		$('#sort').addEventListener('click', sortFunc);
	}

	addEvents();
}
