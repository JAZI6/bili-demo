import {Carousel} from "./carousel.js";
import {ClickChange} from "./clickChange.js";
import {getData} from './fjRdrData.js';
import {HoverChange} from './hoverChange.js';
import {HoverShow} from './hoverShow.js';
import {NextCarousel} from './nextCarousel.js';
import {SiderBar} from './siderBar.js';

$(document).ready(() => {
        let oCar1 = document.getElementsByClassName('smryCtt-carousel')[0];
        let oCar2 = document.getElementsByClassName('nextCarousel')[0];
        let oCar3 = document.getElementsByClassName('nextCarousel')[1];
        let oCar4 = document.getElementsByClassName('nextCarousel')[2];
        let oCTab = document.getElementsByClassName('liveStrm-right')[0];
        let oHCha1 = document.getElementsByClassName('animate-right')[0];
        let oHCha2 = document.getElementsByClassName('animate-right')[1];
        let oHCha3 = document.getElementsByClassName('animate-right')[2];
        let oHCha4 = document.getElementsByClassName('animate-right')[3];
        let oSBar = document.getElementsByClassName('siderBar')[0];
        //let oScr = document.getElementsByClassName('scroll')[0];
        getData();
        new Carousel(oCar1);
        new NextCarousel(oCar2);
        new NextCarousel(oCar3);
        new NextCarousel(oCar4);
        new ClickChange(oCTab);
        new HoverChange(oHCha1);
        new HoverChange(oHCha2);
        new HoverChange(oHCha3);
        new HoverChange(oHCha4);
        new HoverShow(document);
        new SiderBar(oSBar);
});

/*
import '../css/reset.css';
import '../scss/common.scss';
import '../scss/header.scss';
import '../scss/summary.scss';
import '../scss/popularize.scss';
import '../scss/liveStrm.scss';
import '../scss/animate.scss';
import '../scss/fanju.scss';
import '../scss/fjDongTai.scss';
import '../scss/guoChuang.scss';
import '../scss/gcyc.scss';
import '../scss/music.scss';
import '../scss/talkMusic.scss';
import '../scss/tbtj.scss';
import '../scss/footer.scss';
import '../scss/siderBar.scss';
 */