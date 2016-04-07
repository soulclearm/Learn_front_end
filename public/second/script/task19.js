window.onload = function(argument) {
	// 获取元素方法
	var $ = function(str) {
		return document.querySelector(str);
	}
	var $$ = function(str) {
		return document.querySelectorAll(str);
	}

	// 数组
	var arrData = [];

	// 随机生成长度为60的，10到100间的数组
	function randomBuildData() {
		arrData = [];
		for (var i = 0; i < 150; i++) {
			var num = Math.ceil(Math.random() * 91 + 9);
			arrData.push(num);
		}

		render();
	}

	// 排序时渲染
	var queue = []; // 渲染队列

	var curLeft = -1;
	var curRight = -1;

	// 渲染边界
	function renderRange(left, right) {
		var numLeft = arrData[left];
		var numRight = arrData[right];
		queue.push(function() {
			if (curLeft >= 0) {
				$$('#numContainer b')[curLeft].style.border = 'none';
			}
			if (curRight >= 0) {
				$$('#numContainer b')[curRight].style.border = 'none';
			}

			curLeft = left;
			curRight = right;
			$$('#numContainer b')[curLeft].style.border = '3px solid #f00';
			$$('#numContainer b')[curRight].style.border = '3px solid #f00';
		})
	}

	function renderSearch(index, isSearchEnd) {
		queue.push(function() {
			$$('#numContainer b')[index].style.backgroundColor = 'greenyellow';
		});
		if (!isSearchEnd) {
			var num = arrData[index];
			queue.push(function() {
				$$('#numContainer b')[index].style.backgroundColor = getBGColor(num);
			});
		}
	}

	function renderSwap(idx1, idx2) {
		var num1 = arrData[idx1];
		var num2 = arrData[idx2];

		queue.push(function() {
			$$('#numContainer b')[idx1].style.backgroundColor = getBGColor(num1);
			$$('#numContainer b')[idx2].style.backgroundColor = getBGColor(num2);

			$$('#numContainer b')[idx1].style.height = (num1 * 2) + 'px';
			$$('#numContainer b')[idx2].style.height = (num2 * 2) + 'px';

			$$('#numContainer b')[idx1].innerHTML = num1;
			$$('#numContainer b')[idx2].innerHTML = num2;
		})
	}

	function getSpeed() {
		var speed = parseInt($('#speedInput').value.trim()) || 10;
		$('#speedInput').value = speed;
		return speed;
	}

	// 排序
	function sortFunc() {
		var btns = $$('#ctrls button');
		for (var i = btns.length - 1; i >= 0; i--) {
			btns[i].disabled = true;
		}

		function swap(i, j) {
			var temp = arrData[i];
			arrData[i] = arrData[j];
			arrData[j] = temp;

			renderSwap(i, j);
		}

		function qsort(left, right) {
			if (left >= right) {
				return;
			}

			renderRange(left, right);

			var k = left;
			var i = left;
			var j = right;
			while (i < j) {
				while (arrData[j] >= arrData[k] && i < j) {
					renderSearch(j);
					j--;
				}
				renderSearch(j, true);
				while (arrData[i] <= arrData[k] && i < j) {
					renderSearch(i);
					i++;
				}
				renderSearch(i, true);

				swap(i, j);
			}
			swap(j, k);

			qsort(left, j - 1);
			qsort(j + 1, right);
		}
		qsort(0, arrData.length - 1);

		// var items = $$('#numContainer b');
		// for (var i = items.length - 1; i >= 0; i--) {
		// 	items[i].style.transition = getSpeed() * 2 + 'ms height,' + getSpeed() * 2 + 'ms background-color';
		// }

		var it = setInterval(function() {
			if (queue.length === 0) {
				clearInterval(it);
				render();
				var btns = $$('#ctrls button');
				for (var i = btns.length - 1; i >= 0; i--) {
					btns[i].disabled = false;
				}
				return;
			}
			queue.shift()();
		}, getSpeed());
	}

	// 背景色
	var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
		'#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'
	];

	function getBGColor(num) {
		return colors[Math.floor(num / 10)];
	}

	// 渲染
	function render() {
		$('#numContainer').innerHTML = arrData.map(function(d) {
			return "<b style = 'height:" + (d * 2) + 'px; background-color:' + getBGColor(d) + "';>" + d + '</b>';
		}).join('');
	}

	// 事件监听
	function addEvents() {
		$('#createArray').addEventListener('click', randomBuildData);
		$('#sort').addEventListener('click', sortFunc);
	}

	addEvents();
}
