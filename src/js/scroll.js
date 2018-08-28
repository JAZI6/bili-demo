class Scroll {
    constructor(oTgt) {
        this.oScr = oTgt;
        this.oScrBar = oTgt.getElementsByClassName('scrollBar')[0];
        this.oMove = this.oScrBar.getElementsByTagName('span')[0];
        this.oScrDiv = oTgt.getElementsByClassName('scrollDiv');
        this.nMaxScr = $(this.oScrDiv).height() - $(oTgt).height();
        this.timer2 = null;
        this.oDate1 = null;
        this.oDate2 = null;
        this.init();
    }
    init() {
        let $oMove = $(this.oMove),
            $oScrBar = $(this.oScrBar),
            $oScrDiv = $(this.oScrDiv),
            $oScr = $(this.oScr),
            nWhel = null;
        if(this.nMaxScr <= 0)
        {
            $oScrBar.hide();
            return;
        }
        else
        {
            $oScrBar.show();
            $oMove.on('mousedown', (ev = window.event) => {
                ev.preventDefault();
                let nInnerY = Math.round(ev.pageY - $oMove.offset().top);
    
                $(document).on('mousemove', (ev = window.event) => {
                        console.log('y');
                        $oMove.css({'top': Math.round(ev.pageY - $oScrBar.offset().top - nInnerY)});
                        if($oMove.position().top <= 3) $oMove.css({'top': 0});
                        if($oMove.position().top >= 153) $oMove.css({'top': 156});
                        $oScrDiv.css({'top': - Math.round(this.nMaxScr * ($oMove.position().top / 156))});
                        $(document).on('mouseup', () => {
                            $(document).off('mousemove');
                        });
                });
            });
        }
    }
    throttle(func) {
        if(!this.timer2)
        {
            this.oDate1 = new Date();
            this.timer2 = setTimeout(() => {
                this.oDate2 = new Date();
                console.log(this.oDate2 - this.oDate1);
                func();
                this.timer2 = null;
            }, 30);
        }
    }
}
export {Scroll};