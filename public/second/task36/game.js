var Game = function(rowMax, colMax) {
    this.rowMax = rowMax;
    this.colMax = colMax;
    this.table = null;
    this.roleEle = null;
    this.rolePos = null;
    this.roleOPos = null;
    this.roleDeg = 0;
    this.arrIsWall = [];
    for (var i = 0; i < this.rowMax; i++) {
        this.arrIsWall.push([]);
        for (var j = 0; j < this.colMax; j++) {
            this.arrIsWall[i].push(false);
        }
    }

}

Game.prototype = {
    render: function(container) {
        if (this.table) {
            container.removeChild(this.table);
        }

        var table = document.createElement('table');
        this.table = table;
        for (var i = 0; i < this.rowMax + 1; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < this.colMax + 1; j++) {
                var td = document.createElement('td');
                if (i === 0 && j === 0) {} else {
                    if (i === 0) {
                        td.innerHTML = j;
                    }
                    if (j === 0) {
                        td.innerHTML = i;
                    }
                }

                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        container.appendChild(table);

        var rowRandom = Math.ceil(Math.random() * this.rowMax),
            colRandom = Math.ceil(Math.random() * this.colMax);
        this.createRoleAt(rowRandom, colRandom);
    },

    createRoleAt: function(row, col) {
        this.rolePos = createPos(row, col);
        this.roleOPos = this.rolePos;
        this.renderRole();
    },

    renderRole: function() {
        this.roleEle = document.createElement('span');
        this.roleEle.innerHTML = '<div></div>';
        this.roleEle.style.transform = 'rotate(' + this.roleDeg + 'deg)';
        this.roleEle.style.marginTop = (this.rolePos.r * 33 + 1) + 'px';
        this.roleEle.style.marginLeft = (this.rolePos.c * 33 + 1) + 'px';
        this.table.appendChild(this.roleEle);
    },

    rotateRole: function(degOffset) {
        this.roleDeg += degOffset;
        this.roleEle.style.transform = 'rotate(' + this.roleDeg + 'deg)';
    },

    getSameDeg: function() {
        this.roleDeg %= 360;
        if (this.roleDeg < 0) {
            this.roleDeg += 360;
        }
        if (this.roleDeg === 270) {
            this.roleDeg = -90;
        }

        return this.roleDeg;
    },

    isWall: function(pos) {
        return this.arrIsWall[pos.r - 1][pos.c - 1];
    },


    eleAtPos: function(pos) {
        return this.table.children[pos.r].children[pos.c];
    },

    buildWall: function(pos) {
        pos = pos ? pos : this.getPosByDeg(this.getSameDeg());
        if (this.posIsOk(pos)) {
            this.arrIsWall[pos.r - 1][pos.c - 1] = true;
            this.eleAtPos(pos).style.backgroundColor = '#8B3A3A';

        } else {
            console.error('取消修墙')
        }
    },

    randomWall: function(num) {
        for (var i = 0; i < num; i++) {
            var randomR = Math.ceil(Math.random() * this.rowMax),
                randomC = Math.ceil(Math.random() * this.colMax);
            var randomPos = createPos(randomR, randomC);
            if (!randomPos.isEqual(this.rolePos)) {
                this.buildWall(randomPos);
            }
        }
    },

    brushWall: function(color) {
        var pos = this.getPosByDeg(this.getSameDeg());
        if (this.isWall(pos)) {
            this.eleAtPos(pos).style.backgroundColor = color;
        } else {
            console.error('这里没有墙无法粉刷')
        }
    },

    posIsOk: function(pos) {
        if (pos.r > this.rowMax || pos.r < 1 || pos.c > this.colMax || pos.c < 1) {
            console.error(pos + ' 超出边界')
            return false;
        }

        if (this.isWall(pos)) {
            console.error(pos + ' 这里是墙');
            return false;
        }

        return true;
    },

    // deg为指定的移动方向，不指定则用原本的朝向
    // change表示移动的同时是否改变朝向
    moveRole: function(deg, change) {
        // 移动并改变方向的情况
        if (!isNaN(deg) && change) {
            var degOffset = deg - this.getSameDeg();
            this.rotateRole(degOffset);
        }
        deg = !isNaN(deg) ? deg : this.getSameDeg();

        var pos = this.getPosByDeg(deg);

        this.moveRoleOneStep(pos);
    },

    getPosByDeg: function(deg) {
        if (deg === 0) {
            return this.rolePos.getTop();
        } else if (deg === 90) {
            return this.rolePos.getRight();
        } else if (deg === 180) {
            return this.rolePos.getBottom();
        } else if (deg === -90) {
            return this.rolePos.getLeft();
        }
    },

    moveRoleOneStep: function(pos) {
        if (this.posIsOk(pos)) {
            this.rolePos = pos;

            this.roleEle.style.marginTop = (this.rolePos.r * 33 + 1) + 'px';
            this.roleEle.style.marginLeft = (this.rolePos.c * 33 + 1) + 'px';
            // this.rolePos = pos;
        }
    },

    moveRoleTo: function(pos) {
        console.log('去到' + pos);
        if (pos.isEqual(this.rolePos)) {
            alert('已经在目标地点');
        }
        var arr = this.getWayTo(pos);
        if (arr.length === 0) {
            alert('无法到达目标地点');
        }
        var stack = [];
        var i = 1;

        for (var i = 1; i < arr.length; i++) {
            var posI = arr[i];
            this.eleAtPos(posI).style.backgroundColor = 'pink';
            var deg = arr[i - 1].getNeibDeg(posI);

            stack.push(deg);
        }

        var self = this;
        var interval = setInterval(function() {
            if (stack.length === 0) {
                clearInterval(interval);
                for (var i = 1; i < arr.length; i++) {
                    self.eleAtPos(arr[i]).style.backgroundColor = 'transparent';
                }
                return;
            }
            var deg = stack.shift();
            self.moveRole(deg, true);
        }, 500);

        return arr.length;
    },

    getWayTo: function(pos) {
        var self = this;
        var arrPos = AStar(this.rolePos, pos, function(pos) {
            return self.posIsOk(pos);
        });

        return arrPos;
    }
};
