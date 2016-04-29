var Q = require('./Q');
var q = new Q();

var tpl1='<footer class="yo-tab yo-tab-view">'+
                '<a href="#sub" class="item item-y-ico  item-on"><i class="yo-ico"></i>购物</a>'+
                '<a href="#major" class="item item-y-ico"><i class="yo-ico"></i>定位</a>'+
                '<a href="#third" class="item item-y-ico"><i class="yo-ico"></i>支付</a>'+
                '<a href="#subgo" class="item item-y-ico"><i class="yo-ico"></i>嵌套1</a>'+
                '<a href="#subgo2" class="item item-y-ico"><i class="yo-ico"></i>嵌套2</a>'+
            '</footer>';
var tpl2='<div class="yo-flex">'+
            '<h2 class="yo-header">普通头部-外层-major</h2>'+
            '<div class="flex"></div>'+
            '<footer class="yo-tab yo-tab-view">'+
                '<a href="#sub" class="item item-y-ico "><i class="yo-ico"></i>购物</a>'+
                '<a href="#major" class="item item-y-ico item-on"><i class="yo-ico"></i>定位</a>'+
                '<a href="#third" class="item item-y-ico"><i class="yo-ico"></i>支付</a>'+
                '<a href="#subgo" class="item item-y-ico"><i class="yo-ico"></i>嵌套</a>'+
            '</footer>'+
        '</div>';
var tpl3='<div class="yo-flex">'+
            '<h2 class="yo-header">普通头部-外层-third</h2>'+
            '<div class="flex"></div>'+
            '<footer class="yo-tab yo-tab-view">'+
                '<a href="#sub" class="item item-y-ico "><i class="yo-ico"></i>购物</a>'+
                '<a href="#major" class="item item-y-ico"><i class="yo-ico"></i>定位</a>'+
                '<a href="#third" class="item item-y-ico item-on"><i class="yo-ico"></i>支付</a>'+
                '<a href="#subgo" class="item item-y-ico"><i class="yo-ico"></i>嵌套</a>'+
            '</footer>'+
        '</div>';
var tpl4='<div class="yo-flex">'+
            '<h2 class="yo-header">普通头部-内层-subgo</h2>'+
            '<div class="flex"></div>'+
        '</div>';
var tpl5='<div class="yo-flex">'+
            '<h2 class="yo-header">普通头部-内层-subgo2</h2>'+
            '<div class="flex"></div>'+
        '</div>';
// 第一层
q.view({
    name:'sub',
    template:tpl1
});
q.view({
    name:'major',
    parent:'root-sub',
    template:tpl2,
    ajax:'/users/getWeek',
    ajaxType:'GET',
    success:function(){
        return tpl2
    }
});
q.view({
    name:'third',
    parent:'root-sub',
    template:tpl3
});

q.view({
    name:'subgo',
    parent:'sub',
    template:tpl4
});
q.view({
    name:'subgo2',
    parent:'sub-subgo',
    template:tpl5
});
q.start();
