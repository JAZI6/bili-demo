class ClickChange {
    constructor(oTgt) {
        this.oNav = oTgt.getElementsByClassName('sctnRt-header')[0].getElementsByTagName('ul')[0];
        this.aNavLi = this.oNav.getElementsByTagName('li');
        this.oCtt = oTgt.getElementsByClassName('sctnRt-content')[0];
        this.oTabUl = this.oCtt.getElementsByClassName('sctnRtCtt-ul')[0];
        this.nNow = 2;
        this.nCttLen = $(this.oCtt).width();
        this.init();
    }
    init() {
        $(this.oTabUl).css({"left": -520});
        $(this.oNav).on('click', 'li', (ev = window.event) => {
            this.nNow = $(ev.target? ev.target: ev.srcElement).index();
            this.tabSwitch();
        });
    }
    tabSwitch() {
        $(this.oTabUl).animate({"left": - this.nNow * this.nCttLen}, 'fast');
        $(this.aNavLi).each(function(){
            this.className = '';
        });
        this.aNavLi[this.nNow].className = 'blueNav-activeLi';
    }
}
export {ClickChange};