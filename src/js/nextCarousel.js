class NextCarousel {
    constructor(oTarget) {
        this.oUl = oTarget.getElementsByTagName('ul')[0];
        this.oDiv = oTarget.getElementsByTagName('div')[0];
        this.oDot = oTarget.getElementsByClassName('nextCarousel-dot')[0];
        this.aDotLi = this.oDot.getElementsByTagName('li');
        this.nNow = 0;
        this.lockClick = false;
        this.timer = null;
        this.nLiLen = this.oUl.getElementsByTagName('li').length;
        this.nImgWidth = this.oUl.getElementsByTagName('li')[0].getElementsByTagName('img')[0].width;
        this.init();
    }
    init(){
        this.autoPlay();
        $(this.oDiv).on('mouseover', () => {
            this.timer && clearInterval(this.timer);
            console.log('null1');
        });
        $(this.oDiv).on('mouseout', () => {
            console.log('start');
            this.autoPlay();
        });

        $(this.oUl).on('mouseover', () => {
            this.timer &&clearInterval(this.timer);
            console.log('null2');
        });
        $(this.oUl).on('mouseout', () => {
            console.log('start');
            this.autoPlay();
        });
        $(this.oDot).on('mouseover', 'li', (ev = window.event) => {
            if(this.lockClick || this.nNow == $(ev.target ?ev.target :ev.srcElement).index()) return;
            this.lockClick = true;
            this.nNow = $(ev.target ?ev.target :ev.srcElement).index();
            this.carSwitch('dotClick');
        });
    }
    autoPlay() {
        this.timer = setInterval(() => {
            this.nNow = (this.nNow + 1) % this.nLiLen;
            this.carSwitch('next');
        }, 2000);
    }
    carSwitch() {
            let aArg = arguments,
            $aLi = $($(this.oDiv).children('ul')[0]).children('li'),
            nNTemp = this.nNow;
            $(this.aDotLi).each(function() {
                this.className = '';
            });
            this.aDotLi[this.nNow].className = 'nextCarousel-activeDot';

            $aLi.each(function () {
                ($(this).css("display") == "block" || $(this).css("display") == "inline-block") && $(this).animate({"opacity": 0}, 'fast', () => {
                    $(this).css({"display": "none"});
                    $($aLi[nNTemp]).css({"display": "block"});
                    $($aLi[nNTemp]).animate({"opacity": 1}, 'fast');
                });
            });
            $(this.oUl).animate({left: (-this.nImgWidth) * this.nNow + 'px'}, () => {
                switch (aArg[0])
                {
                        case 'dotClick':
                            this.lockClick = false;
                        break;
                }
            });
    }
}
export {NextCarousel};