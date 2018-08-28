class SiderBar {
    constructor(target) {
        this.sdBar = target;
        this.oUl = this.sdBar.getElementsByTagName('ul')[0];
        this.aLi = this.oUl.getElementsByTagName('li');
        this.mask = document.getElementsByClassName('siderBar-mask')[0];
        this.goTop = document.getElementsByClassName('siderBar-goTop')[0];
        this.sdBarBg = document.getElementsByClassName('siderBar-bg')[0];
        this.lvStrmOffset = $('.liveStrm').offset();
        this.anmtOffset = $('.trueAnimate').offset();
        this.fjOffset = $('.fanju').offset();
        this.gcOffset = $('.guoChuang').offset();
        this.mscOffset = $('.music').offset();
        this.tkMscOffset = $('.talkMusic').offset();
        this.init();
    }
    init() {
        function tabColor(now) {
            $(this.aLi).each(function() {
                this.className = '';
            });
            now? now.className = 'sdBarLiHover': null;
        }
        let halfViewHt = null,
            lvStrmLi = null,
            anmtLi = null,
            fjLi = null,
            gcLi = null,
            mscLi = null,
            tkMscLi = null,
            sortLi = null;
        halfViewHt = Math.round($(window).height() / 2);
        let that = this,
            oUlHt = 0;
        $(this.aLi).each(function() {
            oUlHt += $(this).outerHeight();
            $(this).css({'top': $(this).index() * 32});
            switch($(this).text())
            {
                case '直播': lvStrmLi = this;
                            $(this).on('click', () => {
                                $('html,body').animate({"scrollTop": that.lvStrmOffset.top - 100}, 'fast');
                            });
                break;
                case '动画': anmtLi = this;
                            $(this).on('click', () => {
                                $('html,body').animate({"scrollTop": that.anmtOffset.top - 100}, 'fast');
                            });
                break;
                case '番剧': fjLi = this;
                            $(this).on('click', () => {
                                $('html,body').animate({"scrollTop": that.fjOffset.top - 100}, 'fast');
                            });
                break;
                case '国创': gcLi = this;
                            $(this).on('click', () => {
                                $('html,body').animate({"scrollTop": that.gcOffset.top - 100}, 'fast');
                            });
                break;
                case '音乐': mscLi = this;
                            $(this).on('click', () => {
                                $('html,body').animate({ "scrollTop": that.mscOffset.top - 100 }, 'fast');
                            });
                break;
                case '音频': tkMscLi = this;
                            $(this).on('click', () => {
                                $('html,body').animate({ "scrollTop": that.tkMscOffset.top - 100 }, 'fast');
                            });
                break;
                case '排序': sortLi = this;
            }
        });
        $(this.oUl).height(oUlHt);
        $(this.goTop).on('click', () => {
            $('html,body').animate({"scrollTop": 0}, 'fast');
        });
        $(sortLi).on('click', (ev = window.event) => {
            if($(this.mask).css('display') === 'none')
            {
                $(this.mask).css({'display': 'block'});
                $(this.sdBarBg).css({"right": -20, "width": 200, "opacity": 1});
                $(this.mask).animate({"opacity": 0.5}, 'fast');
            }
            else if($(this.mask).css('display') === 'block')
            {
                $(this.sdBarBg).css({"right": 0, "width": 0, "opacity": 0});
                $(this.mask).animate({'opacity': 0}, 'fast', () => {
                    $(this.mask).css({'display': 'none'});
                });
            }
            if($._data(this.aLi[0],'events')['mousedown'])
            {
                $(this.aLi).each(function() {
                    if($(this).text() !== '排序')
                    {
                        $(this).off('mousedown');
                    }
                });
            }
            else
            {
                $(this.aLi).each(function() {
                    if($(this).text() !== '排序')
                    {
                        let $this = $(this),
                            oldTop = null,
                            nInnerY = null,
                            tempTop = null,
                            name = null,
                            obj1 = null,
                            obj2 = null,
                            txt = null;
                        $this.on('mousedown', (ev = window.event) => {
                            $this.addClass('sdBarLiHover');
                            oldTop = $this.position().top;
                            $this.css({'z-index': 2});
                            nInnerY = Math.round(ev.clientY - oldTop);
                            ev.preventDefault();
                            $(document).on('mousemove', (ev = window.event) => {
                                    $this.css({'top': Math.round(ev.clientY - nInnerY)});
                                    tempTop = $this.position().top;
                                    if(tempTop <= 10) $this.css({'top': 0});
                                    if(tempTop >= 150) $this.css({'top': 161});
                                    $(document).on('mouseup', () => {
                                        $this.removeClass('sdBarLiHover');
                                        name = $this.text();
                                        $(document).off('mousemove');
                                        $this.css({'z-index': '', 'top': parseInt($this.position().top / 32) * 32});
                                        $(that.aLi).each(function() {
                                            txt = $(this).text();
                                            if(txt !== name)
                                            {
                                                if($(this).position().top == $this.position().top)
                                                {
                                                    obj1 = that.getSctDom(txt);
                                                    obj2 = that.getSctDom(name);
                                                    if($(this).position().top < oldTop) that.movePos(obj1, obj2);
                                                    else that.movePos(obj2, obj1);
                                                    $(this).css({'top': oldTop});
                                                }
                                            }
                                        })
                                    });
                            });
                        });
                    }
                });
            }
        });
        $(this.mask).on('click', () => {
            $(this.sdBarBg).css({"right": 0, "width": 0, "opacity": 0});
            $(this.mask).animate({'opacity': 0}, 'fast', () => {
                $(this.mask).css({'display': 'none'});
            });
        });
        let scrTop = null;
        $(document).on('scroll', () => {
            scrTop = $(document).scrollTop();
            if(scrTop >= 235) $(this.sdBar).css({'top': 0});
            else $(this.sdBar).css({'top': 235});

            if(this.lvStrmOffset.top - scrTop <= halfViewHt && this.lvStrmOffset.top - scrTop > 0) tabColor.call(this, lvStrmLi);
            if(this.anmtOffset.top - scrTop <= halfViewHt && this.anmtOffset.top - scrTop > 0) tabColor.call(this, anmtLi);
            if(this.fjOffset.top - scrTop <= halfViewHt && this.fjOffset.top - scrTop > 0) tabColor.call(this, fjLi);
            if(this.gcOffset.top - scrTop <= halfViewHt && this.gcOffset.top - scrTop > 0) tabColor.call(this, gcLi);
            if(this.mscOffset.top - scrTop <= halfViewHt && this.mscOffset.top - scrTop > 0) tabColor.call(this, mscLi);
            if(this.tkMscOffset.top - scrTop <= halfViewHt && this.tkMscOffset.top - scrTop > 0) tabColor.call(this, tkMscLi);

            if($('.nextLiveStrm + section').offset().top - 350 > scrTop) tabColor.call(this, null);
            if($('.tbtj').prev().offset().top + 200 < scrTop) tabColor.call(this, null);
        });
    }
    movePos(obj1, obj2) {
        let $pre = $(obj1).prev(),
            $next = $(obj2).next();
        console.log($pre[0], $next[0]);
        $pre.after(obj2);
        $next.before(obj1);
        this.lvStrmOffset = $('.liveStrm').offset(),
        this.anmtOffset = $('.trueAnimate').offset(),
        this.fjOffset = $('.fanju').offset(),
        this.gcOffset = $('.guoChuang').offset(),
        this.mscOffset = $('.music').offset(),
        this.tkMscOffset = $('.talkMusic').offset();
    }
    getSctDom(txt) {
        switch (txt) {
            case '直播': return $('.liveStrm')[0];
            case '动画': return $('.trueAnimate')[0];
            case '番剧': return $('.fanju')[0];
            case '国创': return $('.guoChuang')[0];
            case '音乐': return $('.music')[0];
            case '音频': return $('.talkMusic')[0];
        }
    }
}
export {SiderBar};
/*

    $pre = $(that.aLi[$(this).index() - 1]),
                                $next = $(that.aLi[$(this).index() + 1]);
                            if(temp1 <= Math.round($pre.position().top + $pre.height() / 2))
                                $pre.css({'top': $pre.position().top + 32});
                            if(temp1 + temp2 >= Math.round($next.position().top + $next.height() / 2))
                                $next.css({'top': $next.position().top - 32});
    
*/
/*
if (moveTop <= lvStrmLi.pivot)
                                $(lvStrmLi).css({
                                    'top': $(lvStrmLi).position().top + 32
                                });
                            if (moveTop <= anmtLi.pivot)
                                $(anmtLi).css({
                                    'top': $(anmtLi).position().top + 32
                                });
                            if (moveTop <= fjLi.pivot)
                                $(fjLi).css({
                                    'top': $(fjLi).position().top + 32
                                });
                            if (moveTop <= gcLi.pivot)
                                $(gcLi).css({
                                    'top': $(gcLi).position().top + 32
                                });
                            if (moveTop <= mscLi.pivot)
                                $(mscLi).css({
                                    'top': $(mscLi).position().top + 32
                                });
                            if (moveTop <= tkMscLi.pivot)
                                $(tkMscLi).css({
                                    'top': $(tkMscLi).position().top + 32
                                });
                            if (moveBtm >= lvStrmLi.pivot)
                                $(lvStrmLi).css({
                                    'top': $(lvStrmLi).position().top - 32
                                });
                            if (moveBtm >= anmtLi.pivot)
                                $(anmtLi).css({
                                    'top': $(anmtLi).position().top - 32
                                });
                            if (moveBtm >= fjLi.pivot)
                                $(fjLi).css({
                                    'top': $(fjLi).position().top - 32
                                });
                            if (moveBtm >= gcLi.pivot)
                                $(gcLi).css({
                                    'top': $(gcLi).position().top - 32
                                });
                            if (moveBtm >= mscLi.pivot)
                                $(mscLi).css({
                                    'top': $(mscLi).position().top - 32
                                });
                            if (moveBtm >= tkMscLi.pivot)
                                $(tkMscLi).css({
                                    'top': $(tkMscLi).position().top - 32
                                });
 */