(function(tagger) {
    if (typeof define === 'function' && define.amd) {
        define(function(require, exports, module) {
            tagger(require('riot'), require, exports, module)
        })
    } else if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        tagger(require('riot'), require, exports, module)
    } else {
        tagger(window.riot)
    }
})(function(riot, require, exports, module) {
    riot.tag2('app', '', 'view{ width: 100%; } .swiper-container{ height: 100%; } .swiper-slide{ background: #1ba9ba; }', 'id="riot-app" class="app" name="{opts.name}"', function(opts) {});
    riot.tag2('page', '<article class="swiper-wrapper"> </article>', '', 'class="swiper-container {opts.swipe}" name="{opts.name}"', function(opts) {});
    riot.tag2('view', '<yield></yield>', '', 'name="{opts.type}" class="swiper-slide" data-hash="{opts.type}"', function(opts) {});
});
