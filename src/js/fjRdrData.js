let fjData = null;
function getData() {
    $.ajax({
        url: 'https://bangumi.bilibili.com/jsonp/timeline_v2_global.ver',
        type: 'Get',
        data: {
        },
        dataType: 'JSONP'
    });
}
function timeline(data) {
    console.log(data);
    fjData = data;
    new FjRdrData($('.fanju')[0]);
}
window.timeline = timeline;
class FjRdrData {
    constructor(target) {
        this.fjLftCtt = target.getElementsByClassName('fjLft-content')[0];
        this.fjRank = target.getElementsByClassName('sctnRtCtt-rank')[0];
        this.fjNav = target.getElementsByClassName('blueNav')[0];
        this.fjNavLis = this.fjNav.getElementsByTagName('li');
        this.init();
    }
    init() {
        let that = this;
        function tab(now) {
            $(this.fjNavLis).each(function() {
                this.className = '';
            });
            now.className = 'blueNav-activeLi';
        }
        $(this.fjNavLis).each(function() {
            $(this).on('click', () => {
                tab.call(that, this);
                that.render(false, $(this).index() % 7);
            });
        });
        this.render(true);
    }
    render(lastest, who) {
        let strStep = `<div>
                            <a>
                                <img/>
                            </a>
                            <div>
                                <a></a>
                                <span>
                                    <a></a>
                                </span>
                            </div>
                        </div>`,
            str = '',
            len = fjData.result.length,
            $fjLftCtt = $(this.fjLftCtt),
            i = 0,
            $oDiv = null,
            $iDivA = null,
            $iDivSpanA = null;
        $fjLftCtt.html('');
        if(lastest)
        {
            for (let j = 0; j < len; j++) {
                if(fjData.result[j].new) str += strStep;
            }
            $fjLftCtt.html(str);
            fjData.result.forEach(ele => {
                if(ele.new) writeData(ele);
            });
        }
        else
        {
            fjData.result.forEach(ele => {
                if(ele.weekday === who) str += strStep; 
            });
            $fjLftCtt.html(str);
            fjData.result.forEach(ele => {
                if(ele.weekday === who) writeData(ele);
            });
        }
        function writeData(ele) {
            $oDiv = $($fjLftCtt.children('div')[i++]);
            $iDivA = $oDiv.find('div>a');

            $oDiv.addClass('sctnLftCtt-div');
            $oDiv.children('a').attr({'href': 'https://www.bilibili.com/bangumi/play/ss' + ele.season_id, 'target': '_blank'});
            $oDiv.find('a>img').attr({'src': ele.square_cover});

            $iDivA.addClass('txtBreak');
            $iDivA.attr({'href': 'https://www.bilibili.com/bangumi/play/ss' + ele.season_id, 'target': '_blank'});
            $iDivA.text(ele.title);

            $oDiv.find('div>span').html('更新至<a></a>');
            $iDivSpanA = $oDiv.find('div>span>a');
            $iDivSpanA.addClass('txtOver');
            $iDivSpanA.attr({'href': 'https://www.bilibili.com/bangumi/play/ss' + ele.season_id, 'target': '_blank'});
            $iDivSpanA.text(ele.bgmcount + '话');    
        }
    }
}
export {getData};