var arrNum = [];

function onBtnLeftIn() {
	var value = numInput.value.trim();
	if (!value.match(/^\d+$/)) {
		alert("请输入整数！");
		return;
	}
	arrNum.unshift(value);
	renderNums();
}

function onBtnRightIn() {
	var value = numInput.value.trim();
	if (!value.match(/^\d+$/)) {
		alert("请输入整数！");
		return;
	}
	arrNum.push(value);
	renderNums();
}

function onBtnLeftOut() {
	// alert("删除左边第一个数字" + arrNum.shift());
	// renderNums();

	var flag = confirm("删除左边第一个数字" + arrNum[0] + "吗？");
	if (flag) {
		arrNum.shift();
		renderNums();
	}
}

function onBtnRightOut() {
	// alert("删除右边第一个数字" + arrNum.pop());
	// renderNums();

	var flag = confirm("删除右边第一个数字" + arrNum[arrNum.length - 1] + "吗？");
	if (flag) {
		arrNum.pop();
		renderNums();
	}
}

function onNum(numDiv) {
	var index = arrNum.indexOf(numDiv.innerHTML);
	arrNum.splice(index, 1);
	renderNums();
}

function addEvents() {
	document.getElementById("leftIn").addEventListener("click", onBtnLeftIn)
	document.getElementById("rightIn").addEventListener("click", onBtnRightIn)
	document.getElementById("leftOut").addEventListener("click", onBtnLeftOut)
	document.getElementById("rightOut").addEventListener("click", onBtnRightOut)
	document.getElementById("numContainer").addEventListener("click", function(event) {
		if (event.target && event.target.className === "num") {
			onNum(event.target);
		}
	})
}

function renderNums() {
	var items = "";
	for (var idx in arrNum) {
		items += "<div class = 'num' style='background-color: pink; margin: 3px; width: 2em; height: 2em;" +
			" display: inline-block; text-align: center; line-height: 2em;'>" + arrNum[idx] + "</div>"
	}
	document.getElementById("numContainer").innerHTML = items;
}

function init() {
	var numInput = document.getElementById("numInput");
	addEvents();
	renderNums();
}

window.onload = init;
