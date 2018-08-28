class HoverChange {
    constructor(oTgt) {
        this.oNav = oTgt.getElementsByClassName('blueNav')[0];
        this.aNavLi = this.oNav.getElementsByTagName('li');
        this.oUl = oTgt.getElementsByClassName('sctnRtCtt-ul')[0];
        this.aLi = this.oUl.getElementsByTagName('li');
        this.nLiLen = $(this.aLi[0]).width();
        this.init();
    }
    init() {
        $(this.oNav).on('mouseover', 'li', (ev = window.event) => {
            this.hoverChage($(ev.target? ev.target: ev.srcElement).index());
        });
    }
    hoverChage(num) {
        $(this.aNavLi).each(function() {
            this.className = '';
        })
        this.aNavLi[num].className = 'blueNav-activeLi';
        $(this.oUl).animate({"left": - num * this.nLiLen}, 'fast');
    }
}
export {HoverChange};