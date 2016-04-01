/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var inputCity = document.getElementById("aqi-city-input");
	var inputAqi = document.getElementById("aqi-value-input");

	aqiData[inputCity.value] = inputCity.value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	table.innerHTML = "";
	if (aqiData !== {}) {
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		td1.innerHTML = "城市";
		tr.appendChild(td1);
		var td2 = document.createElement("td");
		td2.innerHTML = "空气质量";
		tr.appendChild(td2);
		var td3 = document.createElement("td");
		td3.innerHTML = "操作";
		tr.appendChild(td3);
		table.appendChild(tr);
	}

	for (strCity in aqiData) {
		var tr = document.createElement("tr");
		var td1 = document.createElement("td");
		td1.innerHTML = strCity;
		tr.appendChild(td1);
		var td2 = document.createElement("td");
		td2.innerHTML = aqiData[strCity];
		tr.appendChild(td2);
		var td3 = document.createElement("td");
		td3.innerHTML = "<button class='del-btn'>删除</button>";
		tr.appendChild(td3);
		table.appendChild(tr);
	}

	init();
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
	// do sth.
	var tr = this.parentElement.parentElement;
	var strCity = tr.children[0].innerHTML;
	delete aqiData[strCity];
	console.log(strCity);
	renderAqiList();
}

function init() {

	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var btnAdd = document.getElementById("add-btn");
	btnAdd.onclick = addBtnHandle;

	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var table = document.getElementById("aqi-table");
	var arrBtnDel = table.getElementsByClassName("del-btn");

	for (var i = 0; i < arrBtnDel.length; i++) {
		var btn = arrBtnDel[i];
		btn.onclick = delBtnHandle;
	}
}

init();