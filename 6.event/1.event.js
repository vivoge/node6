//一个事件的名字 对应着多个函数 一个事件名字对应一组事件
//{"事件名":[eat,drink]}
//on是订阅事件，emit是发布事件
function Event (){
    //先在自身内构建一个对象
    this._events = {};
}
//绑定事件 eventName绑定事件的名字 和对应的函数callback
Event.prototype.on = function (eventName,callback) {
    //1.先看对象中是否包含当前的eventName
    if(this._events[eventName]){
        //如果当前对象包含了这个名字，就把这个函数在放入到这个池子里
        this._events[eventName].push(callback);
    }else{
        //第一次如果没有就构建一个这样的池子
        this._events[eventName] = [callback];
    }
};
//发布事件
Event.prototype.emit = function (eventName) {
    //要将执行的对象的名字所对应的函数池把里面的函数一一取出执行
    //[drink,eat]
    //要取出发射事件时传递的参数
    var args = Array.prototype.slice.call(arguments,1);
    //args代表的是新数组，也就是传递的参数
    var cur = this._events[eventName];
    var that = this;
    if(cur){
        cur.forEach(function (item) {
            //item所带表的就是drink,eat
            item.apply(that,args)
        })
    }
};
//移出监听
Event.prototype.removeListener = function () {

};
var e = new Event();
function eat (who){
    console.log(1+who);
}
function drink (who){
    console.log(2+who);
}
e.on('饿了',eat);
e.on('饿了',drink);
e.removeListener('饿了',drink);
e.emit('饿了','我');
