var $ = require('webpack-zepto');
var riot = require('riot');
var _ = require('underscore');
var Swiper = require('swiper');
require('./riot-tag.js');


var Q = function(options) {
    riot.observable(this);
    this.options = _.extend({}, options);
    // 视图列表
    this.viewList = [];
    // swipe对象列表
    this.swipeList = [];
    this.create();
    // 视图激活的时候触发
    this.on('viewActive', this.viewActive);
};
/**
 * [create 初始化函数]
 * @param  {[type]} arguments [description]
 * @return {[type]}           [description]
 */
Q.prototype.create = function(arguments) {
    console.log('create');
};
/**
 * [getRoot 获取最顶层即APP的name]
 * @return {[type]}           [description]
 */
Q.prototype.getRoot = function() {
    return $('app').attr('name') || 'root'
};
/**
 * [start 启动APP]
 * @param  {[type]} arguments [description]
 * @return {[type]}           [description]
 */
Q.prototype.start = function(arguments) {
    riot.mount('app', {
        name: 'root'
    });
    riot.route.start();
    var hash = location.hash.substr(1);
    if (!hash) {
        hash = this.viewList[0];
        if (hash) {
            hash = hash.name;
        } else {
            console.error('您还没有建立视图，应用无法打开');
            return false
        }
    }
    this.go(hash);
};
/**
 * [getView 根据视图名称获取视图]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
Q.prototype.getView = function(name) {
    var view = {};
    _.each(this.viewList, function(item) {
        if (item.name == name) {
            view = item;
            return false;
        }
    });
    return view;
};
/**
 * [getSwipe 获取指定name的swipe]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
Q.prototype.getSwipe = function(name) {
    var swipe;
    _.each(this.swipeList, function(item) {
        if (item.name == name) {
            swipe = item.obj;
            return false
        }
    });
    return swipe;
};
/**
 * [viewEnd 视图激活的回调]
 * @param  {[type]} arguments [description]
 * @return {[type]}           [description]
 */
Q.prototype.viewActive = function(name) {
    var view = this.getView(name);
    var parent = view.parent || this.getRoot();
    // pageName的规则是【父级名-视图名】
    var pageName = parent.indexOf('-') > -1 ? parent : (parent + '-' + name);
    var parentNode = $('section[name=' + pageName + ']');
    // 如果page存在
    if (parentNode.length) {
        this.insertView(parentNode, name);
    } else {
        this.insertPage(parent, name);
    }
};
/**
 * [insertPage description]
 * @param  {[type]} parent [description]
 * @param  {[type]} view   [description]
 * @return {[type]}        [description]
 */
Q.prototype.insertPage = function(parent, viewName) {
    var headerID = this.getID(),
        viewID = this.getID();
    var header = '<section riot-tag="page" id="' + headerID + '"></section>';
    var view = this.getView(viewName);
    var content = '<view id="' + viewID + '">' + view.compiled + '</view>';
    var pageName = parent.indexOf('-') > -1 ? parent : (parent + '-' + viewName);
    var parentNode = $('[name=' + parent + ']');
    var swipe, viewNode;
    if (!parentNode.length) {
        // 视图嵌套
        viewNode = $('view[name=' + parent + ']');
        if (!viewNode.length) {
            parent = this.getRoot();
        }
    }
    $('[name=' + parent + ']').append(header);
    riot.mount('#' + headerID, {
        name: pageName,
        swipe: pageName
    });
    $('#' + headerID + '>article').append(content);
    riot.mount('#' + viewID, {
        html: view.compiled,
        type: view.type
    });
    swipe = new Swiper('.' + pageName, {
        hashnav: true
    });
    this.swipeList.push({
        name: pageName,
        obj: swipe
    });
    view.page = pageName;
    this.translate(viewName);
};
/**
 * [function 插入视图]
 * @param  {[type]} parentNode [description]
 * @param  {[type]} name       [description]
 * @return {[type]}            [description]
 */
Q.prototype.insertView = function(parentNode, name) {
    if (parentNode) {
        var view = this.getView(name);
        var viewID = this.getID();
        var tpl = '<view id="' + viewID + '">' + view.compiled + '</view>';
        var viewNode = $('view[name=' + name + ']');
        if (viewNode.length) {
            this.translate(name);
            return;
        }
        parentNode.find('article').append(tpl);
        riot.mount('#' + viewID, {
            html: view.compiled,
            type: view.type
        });
        var pageName = parentNode.attr('name');
        view.page = pageName;
        var swipe = this.getSwipe(pageName);
        if (swipe) {
            swipe.updateSlidesSize();
        }
        this.translate(name);
    } else {
        console.warn('视图父节点不存在');
    }
};
/**
 * [getID 返回一个ID]
 * @return {[type]} [description]
 */
Q.prototype.getID = function() {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
};
/**
 * [view 定义视图]
 * @param  {[type]} params [description]
 * @return {[type]}           [description]
 */
Q.prototype.view = function(params) {
    var opts = _.extend({}, params),
        me = this;
    // 这个名称是路由的名称，必选
    if (!opts.name) {
        console.warn('视图必须定义名称，禁止是汉字，此名称会和路由一致');
        return;
    };
    // 视图的内容可以定义template或者ajax，二者必具备其一
    if (!opts.template && !opts.ajax) {
        console.warn('视图必须定义模板或者动态获取信息');
        return;
    };
    // 自动检查类型
    _.each(this.viewList, function(item, index) {
        if (item.type == 'major') {
            isMain = true;
            return false;
        }
    });
    // 定义视图的时候第一个是主视图其他是子视图
    opts.type = opts.name;
    this.viewList.push(opts);
    riot.route(opts.name, function() {
        me.go(opts.name);
    });
};
/**
 * [go 导航]
 * @param  {[type]} name [description]
 * @return {[type]}           [description]
 */
Q.prototype.go = function(name) {
    var me = this,
        view = this.getView(name);
    if (view) {
        // 数据是从服务端获取
        if (!!view.ajax) {
            $.ajax({
                url: view.ajax,
                type: view.ajaxType || 'POST',
                dataType: view.AjaxDataType || 'json',
                data: typeof view.ajaxData == 'function' ? _.extend({}, view.ajaxData()) : view.ajaxData,
                success: function(res) {
                    if (typeof view.success == 'function') {
                        view.compiled = view.success.call(res);
                        me.trigger('viewActive', view.name);
                    }
                }
            });
        } else {
            view.compiled = view.template;
            me.trigger('viewActive', view.name);
        }
    }
};
/**
 * [function 滚动视图]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
Q.prototype.translate = function(name) {
    var view = this.getView(name);
    var viewNode = $('view[name=' + name + ']');
    // 只支持二级嵌套
    var parentNode = viewNode.parents('[riot-tag]');
    var viewParent = viewNode.parents('view');
    var swipeParent;
    var swipeName = view.page;
    var swipe = this.getSwipe(swipeName);
    if (swipe) {
        if (parentNode.length > 1) {
            swipe.slideTo(viewNode.index());
            swipeParent = this.getSwipe(parentNode.eq(1).attr('name'));
            swipeParent.slideTo(viewParent.index());
        } else {
            swipe.slideTo(viewNode.index());
        }
    }
};
module.exports = Q;
