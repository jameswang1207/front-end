(function(winElement, docElement) {
    /**
     * alog
     * @file alog.js
     * @description 前端统计框架
     * @author 王集鹄(WangJihu,http://weibo.com/zswang),
     *         张军(ZhangJun08,http://weibo.com/zhangjunah),
     *         梁东杰(LiangDongjie,http://weibo.com/nedj)
     * @version 1.0
     * @copyright www.baidu.com
     * @profile
     */
    // 压缩代码相关
    /* compressor */
    var objectName = winElement.alogObjectName || 'alog';
    var oldObject = winElement[objectName];
    if (oldObject && oldObject.defined) { // 避免重复加载
        return;
    }
    /*<ie>*/
    var ie = docElement.all && winElement.attachEvent;
    /**
     * @description 是否IE
     */
    /**
     * 点击javascript链接的时间
     */
    var clickJsLinkTime;
    /*</ie>*/
    /**
     * @description 起始时间
     */
    var startTime = (oldObject && oldObject.l) || (+new Date());
    /**
     * @description session id 优先从服务端获取
     */
    var sid = winElement.logId ||
        ((+new Date()).toString(36) + Math.random().toString(36).substr(2, 3));
    /**
     * @description id编码
     */
    var guid = 0;
    /**
     * @description 正在加载的脚本
     */
    var loadScripts = {};
    /**
     * @description 模块列表
     */
    var modules;
    /**
     * @description 处理入口
     * @param {Object} params 配置项
     */
    var $ = function(params) {
        var args = arguments;
        var moduleName;
        var requires;
        var creator;
        if (params === 'define' || params === 'require') {
            // 校正参数调用
            for (var i = 1; i < args.length; i++) {
                switch (typeof args[i]) {
                    case 'string':
                        moduleName = args[i];
                        break;
                    case 'object':
                        requires = args[i];
                        break;
                    case 'function':
                        creator = args[i];
                        break;
                }
            }
            if (params === 'require') {
                if (moduleName && !requires) {
                    requires = [moduleName];
                }
                moduleName = null;
            }
            // 如果是引用，这产生临时模块名
            moduleName = !moduleName ? '#' + (guid++) : moduleName;
            var module = modules[moduleName] = (modules[moduleName] || {});
            // 避免模块重复定义
            if (!module.defined) {
                module.name = moduleName;
                module.requires = requires;
                module.creator = creator;
                if (params === 'define') {
                    module.defining = true;
                }
                clearDepend(module);
            }
            return;
        }
        if (typeof params === 'function') {
            params($);
            return;
        }
        /**
         * @example
            ```js
            alog('hunter.send', 'pageview');
            alog('monkey.send', 'pageview');
            alog('send', 'pageview'); // alog('default.send', 'pageview');
            ```
         */
        // 'hunter.send' -> [1]=>'hunter', [2]=>'send'
        String(params).replace(/^(?:([\w$_]+)\.)?(\w+)$/,
            function(all, trackerName, method) {
                args[0] = method; // 'hunter.send' -> 'send'
                command.apply($.tracker(trackerName), args);
            }
        );
    };
    modules = {
        alog: {
            /**
             * 模块名
             */
            name: 'alog',
            /**
             * 是否声明
             */
            defined: true,
            /**
             * 模块实例
             */
            instance: $
        }
    };
    /**
     * @description 监听列表
     */
    var alogListeners = {};
    /**
     * @description 追踪器字典
     */
    var trackers = {};
    /**
     * @description 页面关闭中
     */
    var closing;
    /**
     * 默认追踪器
     */
    var defaultTracker;
    /**
     * @description 加载模块
     * @param {string} moduleName 模块名
     */
    function loadModules(moduleName) {
        var modulesConfig = defaultTracker.get('alias') || {};
        var scriptUrl = modulesConfig[moduleName] || (moduleName + '.js');
        if (loadScripts[scriptUrl]) {
            return;
        }
        loadScripts[scriptUrl] = true;
        var scriptTag = 'script';
        var scriptElement = docElement.createElement(scriptTag);
        var lastElement = docElement.getElementsByTagName(scriptTag)[0];
        scriptElement.async = !0;
        scriptElement.src = scriptUrl;
        lastElement.parentNode.insertBefore(scriptElement, lastElement);
    }
    /**
     * @description 处理依赖关系
     * @param {module} module 模块
     */
    function clearDepend(module) {
        if (module.defined) {
            return;
        }
        var defined = true;
        var params = [];
        var requires = module.requires;
        for (var i = 0; requires && i < requires.length; i++) {
            var moduleName = requires[i];
            var depend = modules[moduleName] = (modules[moduleName] || {});
            if (depend.defined || depend === module) {
                params.push(depend.instance);
            } else {
                defined = false;
                if (!depend.defining) { // 已经存在定义
                    loadModules(moduleName);
                }
                depend.waiting = depend.waiting || {};
                depend.waiting[module.name] = module;
            }
        }
        if (defined) {
            module.defined = true;
            if (module.creator) {
                module.instance = module.creator.apply(module, params);
            }
            clearWaiting(module);
        }
    }
    /**
     * @description 清理等待依赖项加载的模块
     * @param {Module} module 模块对象
     */
    function clearWaiting(module) {
        for (var p in module.waiting) {
            if (module.waiting.hasOwnProperty(p)) {
                clearDepend(module.waiting[p]);
            }
        }
    }
    /**
     * @description 获取时间戳
     * @param {Date} now 当前时间
     * @return {number} 返回时间戳
     */
    function timestamp(now) {
        return (now || new Date()) - startTime;
    }
    /**
     * @description 绑定事件
     * @param {HTMLElement} element 页面元素
     * @param {string} eventName 事件名
     * @param {Function} callback 回调函数
     * @example
        ```js
        alog.on('report', function(data){ data.tt = +new Date; });
        ```
     */
    function on(element, eventName, callback) {
        if (!element) {
            return;
        }
        if (typeof element === 'string') {
            callback = eventName;
            eventName = element;
            element = $;
        }
        try {
            if (element === $) {
                alogListeners[eventName] = alogListeners[eventName] || [];
                alogListeners[eventName].unshift(callback);
                return;
            }
            if (element.addEventListener) {
                element.addEventListener(eventName, callback, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, callback);
            }
        } catch (ex) {}
    }
    /**
     * @description 注销事件绑定
     * @param {HTMLElement} element 页面元素
     * @param {string} eventName 事件名
     * @param {Function} callback 回调函数
     */
    function un(element, eventName, callback) {
        if (!element) {
            return;
        }
        if (typeof element === 'string') {
            callback = eventName;
            eventName = element;
            element = $;
        }
        try {
            if (element === $) {
                var listener = alogListeners[eventName];
                if (!listener) {
                    return;
                }
                var i = listener.length;
                while (i--) {
                    if (listener[i] === callback) {
                        listener.splice(i, 1);
                    }
                }
                return;
            }
            if (element.removeEventListener) {
                element.removeEventListener(eventName, callback, false);
            } else {
                element.detachEvent && element.detachEvent('on' + eventName, callback);
            }
        } catch (ex) {}
    }
    /**
     * @description 触发事件
     * @param {string} eventName 事件名 "error"、"close"
     * @return {Object} 返回当前实例
     * @example
        ```js
        alog.fire('click', { element: document.getElementById('save') });
        ```
     */
    function fire(eventName) {
        var listener = alogListeners[eventName];
        if (!listener) {
            return;
        }
        var items = [];
        var args = arguments;
        for (var i = 1; i < args.length; i++) {
            items.push(args[i]);
        }
        var result = 0;
        var j = listener.length;
        while (j--) {
            if (listener[j].apply(this, items)) {
                result++;
            }
        }
        return result;
    }
    /**
     * @description 上报数据
     * @param {string} url 目标链接
     * @param {Object} data 上报数据
     */
    function report(url, data) {
        if (!url || !data) {
            return;
        }
        var image = new Image(1, 1);
        var items = [];
        for (var key in data) {
            if (data[key]) {
                items.push(key + '=' + encodeURIComponent(data[key]));
            }
        }
        var name = 'img_' + (+new Date());
        $[name] = image;
        image.onload = image.onerror = function() {
            $[name] =
                image =
                image.onload =
                image.onerror = null;
            delete $[name];
        };
        image.src = url + (url.indexOf('?') < 0 ? '?' : '&') + items.join('&');
    }
    /**
     * @description 字段名使用简写
     * @param {Object} protocolParameter 字段名对照表，如果为null表示不上报
     * @param {Object} data 待处理的数据
     * @return{Object} 返回处理后的数据
     */
    function runProtocolParameter(protocolParameter, data) {
        if (!protocolParameter) {
            return data;
        }
        var result = {};
        for (var p in data) {
            if (protocolParameter[p] !== null) {
                result[protocolParameter[p] || p] = data[p];
            }
        }
        return result;
    }
    /**
     * @description 执行命令
     */
    function command() {
        var args = arguments;
        var method = args[0];
        if (this.created || /^(on|un|set|get|create)$/.test(method)) {
            var methodFunc = Tracker.prototype[method];
            var params = [];
            for (var i = 1, len = args.length; i < len; i++) {
                params.push(args[i]);
            }
            if (typeof methodFunc === 'function') {
                methodFunc.apply(this, params);
            }
        } else { // send|fire // 实例创建以后才能调用的方法
            this.argsList.push(args);
        }
    }
    /**
     * @description 合并两个对象
     * @param {Object} a 对象1
     * @param {Object} b 对象2
     * @return {Object} 返回合并后的对象
     */
    function merge(a, b) {
        var result = {};
        for (var p in a) {
            if (a.hasOwnProperty(p)) {
                result[p] = a[p];
            }
        }
        for (var q in b) {
            if (b.hasOwnProperty(q)) {
                result[q] = b[q];
            }
        }
        return result;
    }
    /**
     * @description 追踪器构造器
     * @param {string} name 追踪器名称
     */
    function Tracker(name) {
        this.name = name;
        this.fields = {
            protocolParameter: {
                postUrl: null,
                protocolParameter: null
            }
        };
        this.argsList = [];
        this.alog = $;
    }
    /**
     * @description 获取追踪器
     * @param {string} trackerName 追踪器名称，如果为'*'则获取全部追踪器
     * @return{Object|Array} 返回追踪器对象
     */
    function getTracker(trackerName) {
        var result;
        trackerName = trackerName || 'default';
        if (trackerName === '*') {
            result = [];
            for (var p in trackers) {
                if (trackers.hasOwnProperty(p)) {
                    result.push(trackers[p]);
                }
            }
            return result;
        }
        var tracker = trackers[trackerName];
        if (!tracker) {
            tracker = trackers[trackerName] = new Tracker(trackerName);
        }
        return tracker;
    }
    /**
     * @description 创建追踪器
     * @param {Object} fields 字段列表
     */
    Tracker.prototype.create = function(fields) {
        if (this.created) {
            return;
        }
        if (typeof fields === 'object') {
            this.set(fields);
        }
        this.created = new Date();
        this.fire('create', this);
        var args;
        while (args = this.argsList.shift()) {
            command.apply(this, args);
        }
    };
    /**
     * 发送日志数据
     * @param {string} hitType 数据类型
     * @param {Object} fieldObject 发送数据
     */
    Tracker.prototype.send = function(hitType, fieldObject) {
        var data = merge({
            ts: timestamp().toString(36),
            t: hitType,
            sid: sid
        }, this.fields);
        if (typeof fieldObject === 'object') {
            data = merge(data, fieldObject);
        } else {
            var args = arguments;
            switch (hitType) {
                case 'pageview':
                    // [page[, title]]
                    if (args[1]) {
                        data.page = args[1];
                    }
                    if (args[2]) {
                        data.title = args[2];
                    }
                    break;
                case 'event':
                    // eventCategory, eventAction[, eventLabel[, eventValue]]
                    if (args[1]) {
                        data.eventCategory = args[1];
                    }
                    if (args[2]) {
                        data.eventAction = args[2];
                    }
                    if (args[3]) {
                        data.eventLabel = args[3];
                    }
                    if (args[4]) {
                        data.eventValue = args[4];
                    }
                    break;
                case 'timing':
                    // timingCategory, timingVar, timingValue[, timingLabel]
                    if (args[1]) {
                        data.timingCategory = args[1];
                    }
                    if (args[2]) {
                        data.timingVar = args[2];
                    }
                    if (args[3]) {
                        data.timingValue = args[3];
                    }
                    if (args[4]) {
                        data.timingLabel = args[4];
                    }
                    break;
                case 'exception':
                    // exDescription[, exFatal]
                    if (args[1]) {
                        data.exDescription = args[1];
                    }
                    if (args[2]) {
                        data.exFatal = args[2];
                    }
                    break;
                default:
                    return;
            }
        }
        this.fire('send', data);
        report(this.fields.postUrl, runProtocolParameter(this.fields.protocolParameter, data));
    };
    /**
     * 设置字段值
     * @param {string} name 字段名
     * @param {Any} value 字段值
     */
    Tracker.prototype.set = function(name, value) {
        if (typeof name === 'string') {
            if (name === 'protocolParameter') {
                value = merge({
                    postUrl: null,
                    protocolParameter: null
                }, value);
            }
            this.fields[name] = value;
        } else if (typeof name === 'object') {
            for (var p in name) {
                if (name.hasOwnProperty(p)) {
                    this.set(p, name[p]);
                }
            }
        }
    };
    /**
     * 获取字段值
     * @param {string} name 字段名
     * @param {Function} callback 回调函数
     * @return {Object} 返回当前实例
     */
    Tracker.prototype.get = function(name, callback) {
        var result = this.fields[name];
        if (typeof callback === 'function') {
            callback(result);
        }
        return result;
    };
    /**
     * 触发事件
     * @param {string} eventName 事件名
     * @return {Object} 返回当前实例
     */
    Tracker.prototype.fire = function(eventName) {
        var items = [this.name + '.' + eventName];
        var args = arguments;
        for (var i = 1; i < args.length; i++) {
            items.push(args[i]);
        }
        return fire.apply(this, items);
    };
    /**
     * 绑定事件
     * @param {string} eventName 事件名
     * @param {Function} callback 回调函数
     */
    Tracker.prototype.on = function(eventName, callback) {
        $.on(this.name + '.' + eventName, callback);
    };
    /**
     * 注销事件
     * @param {string} eventName 事件名
     * @param {Function} callback 回调函数
     */
    Tracker.prototype.un = function(eventName, callback) {
        $.un(this.name + '.' + eventName, callback);
    };
    $.name = 'alog';
    $.sid = sid;
    $.defined = true;
    $.timestamp = timestamp;
    $.un = un;
    $.on = on;
    $.fire = fire;
    $.tracker = getTracker;
    $('init');
    defaultTracker = getTracker();
    defaultTracker.set('protocolParameter', {
        modules: null
    });
    if (oldObject) {
        // 处理临时alog对象
        var items = [].concat(oldObject.p || [], oldObject.q || []);
        oldObject.p = oldObject.q = null; // 清理内存
        for (var p in $) {
            if ($.hasOwnProperty(p)) {
                oldObject[p] = $[p];
            }
        }
        $.p = $.q = { // 接管之前的定义
            push: function(args) {
                $.apply($, args);
            }
        };
        // 开始处理缓存命令
        for (var i = 0; i < items.length; i++) {
            $.apply($, items[i]);
        }
    }
    winElement[objectName] = $;
    /*<ie>*/
    if (ie) {
        on(docElement, 'mouseup', function(e) {
            var target = e.target || e.srcElement;
            if (target.nodeType === 1 && /^ajavascript:/i.test(target.tagName + target.href)) {
                clickJsLinkTime = new Date();
            }
        });
    }
    /*</ie>*/
    /**
     * @description 页面关闭时处理方法
     */
    function unloadHandler() {
        /*<ie>*/
        // http://msdn.microsoft.com/en-us/library/ms536907(VS.85).aspx
        // Click an anchor that refers to another document.
        // 修复IE中点击<a href="javascript:">...</a>也会触发beforeunload事件的问题
        if (ie && (new Date() - clickJsLinkTime < 50)) {
            return;
        }
        /*</ie>*/
        if (closing) {
            return;
        }
        closing = true;
        var sleepCount = 0;
        for (var p in trackers) {
            if (trackers.hasOwnProperty(p)) {
                var tracker = trackers[p];
                if (tracker.created) {
                    sleepCount += tracker.fire('unload');
                }
            }
        }
        if (sleepCount) { // isSleep
            var isSleep = new Date();
            while ((new Date() - isSleep) < 100) {
                /* isSleep */
            }
        }
    }
    on(winElement, 'beforeunload', unloadHandler);
    on(winElement, 'unload', unloadHandler);
})(window, document);
