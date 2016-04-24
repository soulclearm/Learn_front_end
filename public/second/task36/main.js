$ = function(id) {
    return document.getElementById(id);
}

var divGame = $('divGame'),
    divLineNum = $('divLineNum'),
    divLineNumInner = $('divLineNumInner'),
    btnCall = $('btnCall'),
    btnClear = $('btnClear'),
    inputCmds = $('inputCmds');

inputCmds.innerHTML = 'randomwall\nrandomwall\ngo to 7 8 \nbuild\nbru blue';

var curLen = 0;

// textaream内容发生变化时控制行号的显示
// 不能正确处理不输入回车自动换行的情况
function changeLineNum(str) {
    var len = str.split(/\r\n|\n/g).length;
    len = str.length === 0 ? 0 : len;
    if (curLen === len) {
        return;
    }
    while (curLen > len) {
        divLineNumInner.removeChild(divLineNumInner.lastElementChild);
        curLen--;
    }
    while (curLen < len) {
        curLen++;
        var span = document.createElement('span');
        span.innerHTML = curLen;
        divLineNumInner.appendChild(span);
    }
}

var allOK = true; // 输入内容完全正确的情况
var arrCmds = []; // 存储字符命令的数组

// 将某行标记为错误
function markErrLine(lineNum) {
    divLineNumInner.children[lineNum - 1].style.backgroundColor = 'red';
}

// 清除所有标记
function clearErrMark() {
    for (var i = 0; i < divLineNumInner.children.length; i++) {
        divLineNumInner.children[i].style.backgroundColor = 'transparent';
    }
}

// 检查输入命令
function checkInput(str) {
    clearErrMark();

    var arr = str.split(/\r\n|\n/g);
    allOK = true;
    for (var i = 0; i < arr.length; i++) {
        var strCmd = arr[i].trim().toLowerCase().replace(/\s+/, ' ');
        if (strCmd.length === 0) {
            continue;
        }

        // bru命令特殊
        if (strCmd.match(/^bru\s+(#[a-fA-F0-9]{6}|\w+)$/g)) {
            continue;
        }

        // go to 命令格式特殊
        if (strCmd.match(/^go\s+to/g)) {
            if (strCmd.match(/^go\s+to\s+\d+\s+\d+$/g)) {
                continue;
            } else {
                allOK = false;
                markErrLine(i + 1);
            }
        }

        var temp = strCmd.replace(/\d+/g, '').trim();
        if (commands.hasOwnProperty(temp)) {
            var reg = new RegExp('^' + temp + '\\s+\\d*$', 'g');
            var ok = temp === strCmd || strCmd.match(reg);
            if (!ok) {
                allOK = false;
                markErrLine(i + 1);
            }
        } else {
            allOK = false;
            markErrLine(i + 1);
        }
    }

    if (allOK) {
        arrCmds = arr;
    }
}

function textareaValueChange(e) {
    changeLineNum(this.value);
    checkInput(this.value);
}

inputCmds.addEventListener('propertychange', textareaValueChange);
inputCmds.addEventListener('input', textareaValueChange);
inputCmds.addEventListener('scroll', function(e) {
    divLineNumInner.style.marginTop = -this.scrollTop + 'px';
})


// 将字符串命令解析成方法返回
function* parseStrCmd(strCmd) {
    var strCmdLower = strCmd.trim().toLowerCase().replace(/\s+/, " ");

    var str1 = strCmdLower.replace(/\d+/g, '').trim();
    var str2 = strCmdLower.replace(str1, "").trim();
    var num = str2.length > 0 ? parseInt(str2) : 1;

    if (strCmdLower.match(/^go\s+to\s+\d+\s+\d+$/g)) {
        var arr = strCmdLower.split(/\s+/);
        num = game.getWayTo(createPos(arr[2], arr[3])).length;
        num = (num === 0) ? 1 : num;
    }

    var flag = false;

    function fn() {
        if (strCmdLower.match(/^bru\s+(#[a-fA-F0-9]{6}|\w+)$/g)) {
            commands['bru'](strCmdLower.split(/\s+/)[1]);
            str1 = 'bru';
        } else if (strCmdLower.match(/^go\s+to\s+\d+\s+\d+$/g)) {
            if (!flag) {
                var arr = strCmdLower.split(/\s+/);
                commands['go to'](arr[2], arr[3]);
                flag = true;
            }
        } else {
            commands[str1]();
        }
        var btn = getBtnByValue(str1);
        if (btn) {
            var oColor = btn.style.backgroundColor;
            btn.style.backgroundColor = 'red';
            setTimeout(function() {
                btn.style.backgroundColor = oColor;
            }, 400)
        }
    }

    while (num > 0) {
        num--;
        yield fn;
    }
}

// 执行事件
btnCall.addEventListener('click', function(e) {
    checkInput(inputCmds.value);
    if (!allOK) {
        alert('请检查命令是否有错误');
        return;
    }

    setBtnsEnable(false);

    // 先将命令压栈
    var arrfunc = [];
    for (var i = 0; i < arrCmds.length; i++) {
        if (arrCmds[i].trim().length === 0) {
            continue;
        }
        for (var x of parseStrCmd(arrCmds[i])) {
            arrfunc.push(x);
        }
    }

    var i = setInterval(function() {
        if (arrfunc.length === 0) {
            clearInterval(i);
            setBtnsEnable(true);
            return;
        }
        arrfunc.shift()();
    }, 500)
})

// 清除textarea的输入内容
btnClear.addEventListener('click', function(e) {
    inputCmds.value = '';
    changeLineNum(inputCmds.value);
    clearErrMark();
    arrCmds = [];
})

// 命令obj
var commands = {
    'go': getFnMove(),
    'tun lef': getFnRotate(-90),
    'tun rig': getFnRotate(90),
    'tun bac': getFnRotate(180),
    'tra lef': getFnMove(-90),
    'tra rig': getFnMove(90),
    'tra top': getFnMove(0),
    'tra bot': getFnMove(180),
    'mov lef': getFnMove(-90, true),
    'mov rig': getFnMove(90, true),
    'mov top': getFnMove(0, true),
    'mov bot': getFnMove(180, true),
    'build': getFnBuild(),
    'bru': fnBru,
    'randomwall': fnRandomWall,
    'go to': fnGoto,
}

var eleBtns = document.querySelectorAll('#formBtns input');
for (var i = 0; i < eleBtns.length; i++) {
    eleBtns[i].addEventListener('click', commands[eleBtns[i].value.toLowerCase()]);
}

function setBtnsEnable(flag) {
    for (var i = 0; i < eleBtns.length; i++) {
        eleBtns[i].disabled = !flag;
    }

    btnCall.disabled = !flag;
    btnClear.disabled = !flag;
}

function getBtnByValue(value) {
    for (var i = 0; i < eleBtns.length; i++) {
        if (eleBtns[i].value === value.toUpperCase()) {
            return eleBtns[i];
        }
    }
}

function getFnRotate(num) {
    return function() {
        game.rotateRole(num);
    }
}

function getFnMove(deg, change) {
    return function() {
        game.moveRole(deg, change);
    }
}

function getFnBuild() {
    return function() {
        game.buildWall();
    }
}

function fnBru(color) {
    game.brushWall(color);
}

function fnRandomWall(num) {
    game.randomWall(20);
}

function fnGoto(x, y) {
    game.moveRoleTo(createPos(x, y));
}

var game = new Game(15, 15);
game.render(divGame);
