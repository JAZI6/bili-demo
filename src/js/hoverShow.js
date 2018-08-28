class HoverShow {
    constructor(oTgt) {
        this.onHovers = oTgt.getElementsByClassName('onHover');
        this.hoverShows = oTgt.getElementsByClassName('hoverShow');
        this.timer = null;
        this.init();
    }
    init() {
        let i = 0,
            that = this;
        $(this.onHovers).each(function() {
            this.index = i++;
            $(this).on('mouseenter', () => {
                if(that.timer) that.timer = null;
                else that.mOver(this);
            });
            $(this).on('mouseleave', () => {
                that.timer = setTimeout(() => {
                    that.timer = null;
                    that.mOut(this);
                }, 500);
            });
        });
        $(this.hoverShows).each(function() {
            $(this).css({'display': 'none', 'opacity': 0});
            
        });
    }
    mOut(tempThis) {
        let temp = this.hoverShows[tempThis.index];
        if($(temp).hasClass('hoverShow-up'))
        {
            $(temp).animate({'opacity': 0, 'margin-top': 6}, 'fast', () => {
                $(temp).css({'display': 'none'});
            });
        }
        else
        {
            $(temp).animate({'opacity': 0}, 'fast', () => {
                $(temp).css({'display': 'none'});
            });
        }
    }
    mOver(tempThis) {
        let temp = this.hoverShows[tempThis.index];
        $(temp).css({'display': 'block', 'margin-top': 6});
        if($(temp).hasClass('hoverShow-up'))
        {
            $(temp).animate({'opacity': 1, 'margin-top': 0}, 'fast');
        }
        else
        {
            $(temp).css({'margin-top': '0px'});
            $(temp).animate({'opacity': 1}, 'fast');
        }
    }
}
export {HoverShow};