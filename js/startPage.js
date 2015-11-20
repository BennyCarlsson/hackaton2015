"use strict";
var sp = sp || {};
sp.vue = sp.vue || {};
sp.dal = sp.dal || {};
sp.css = sp.css || {};

sp.init = function(){
    var playButton, skippButton, savedArticelsButton;

    if(sp.IsEmergency()){
        var emergencyButtonView = sp.vue.emergencyView(sp.vue.emergencyButtonTemplate());
        sp.vue.mountEmergencyButtonView(emergencyButtonView);
    }

    sp.css.buildAnimationZoomIn();
    sp.css.buildAnimationZoomOut();
    playButton = sp.vue.startButton();
    skippButton = sp.vue.skipVideo();
    savedArticelsButton = sp.vue.savedArticels();
    // commitFix!
};

sp.IsEmergency = function(){
    return true;
    //return Math.floor((Math.random() * 4) + 1) < 3;
};

sp.vue.emergencyView = function(EmergencyButtonTemplate){
    var click = true;
    return new EmergencyButtonTemplate({
        replace: false,
        methods: {
            emergencyButtonClick: function(){
                var emergencyArticleView;
                if(click){
                    var el = this.$el.querySelector(".startPageEmergencyArticleWrap");
                    el.classList.add("animmaMoveDownFullPage");
                    var self = this;

                    function ev(){
                        self.$el.removeChild(self.$el.querySelector(".startPageEmergencyWrap"));
                        el.removeEventListener("animationend", ev);
                    }

                    el.removeEventListener("animationend", ev);
                    el.addEventListener("animationend", ev, false);

                    emergencyArticleView = sp.vue.emergencyArticleView(sp.vue.emergencyArticleTemplate(), this);
                    sp.vue.mountEmergencyArticleTemplate(emergencyArticleView);
                    click = false;
                }else if(!click){

                }
            }
        }
    });
};

sp.vue.emergencyButtonTemplate = function(){
    return Vue.extend({
        template:
            '<div id="startPageEmergencyTemplateHolder" class="startPageEmergencyArticleWrap"></div>'+
            '<div v-on:click="emergencyButtonClick" class="startPageEmergencyWrap">'+
            '<div class="startPageEmergencyArrowLeft"><i class="material-icons">arrow_downward</i></div>'+
            '<div class="startPageEmergencytitle">Just nu!</div>'+
            '<div class="startPageEmergencyIngress">SPIIK hackaton pågår och studenter från Linneuni...</div>'+
            '<div class="startPageEmergencyTimeStamp">10min sedan</div>'+
            '<div class="startPageEmergencyArrowRight"><i class="material-icons">arrow_downward</i></div>'+
            '<div id="startPageEmergencyNewsArticle"></div>'+
        '</div>'
    });
};

sp.vue.emergencyArticleView = function(EmergencyArticleTemplate, emergencyHolder){
    return new EmergencyArticleTemplate({
        replace: false,
        methods: {
            closeView: function(){
                //emergencyHolder.$el.querySelector(".startPageEmergencyArticleWrap").classList.remove("animmaMoveDownFullPage");
                //emergencyHolder.$el.querySelector(".startPageEmergencyArticleWrap").classList.remove("animmaMoveUp");
                emergencyHolder.$el.classList.add("animmaIntoSaved");

                function ev(){
                    emergencyHolder.$destroy(emergencyHolder);
                    //emergencyHolder.$el.removeEventListener("animationend", ev);
                }

                //emergencyHolder.$el.removeEventListener("animationend", ev);
                emergencyHolder.$el.addEventListener("animationend", ev, false);

                this.$destroy(this);
            }
        }
    });
};

sp.vue.emergencyArticleTemplate = function(){
    return Vue.extend({
        template: '<div class="startPageEmergencyArticleWrap2">'+
            '<div class="startPageEmergencyClose" v-on:click="closeView"><i class="material-icons">close</i></div>'+
            '<div class="startPageEmergencyArticleTitle"><h1>Hackaton mellan studenter och företag</h1></div>'+
            '<div class="startPageEmergencyArticleIngress"><b>Ett hackaton mellan studentföreningen SPIIK från Linnéuniversitetet och företag</b></div>'+
            '<div class="startPageEmergencyArticleContent"><img id="startPageEmergencyBild" src="http://www.beliefnet.com/columnists/bemore/files/2013/11/bigstock-Hacker-Typing-On-A-Laptop-44548564.jpg" alt="">Företagen Infomaker och Gota Media är i full gång. Idéer och koncept för framtidens nyhetskällor produceras i mängder men bara en idé kan vinna. Vinnaren presenteras senare under dagen</div>'+
            '</div>'
    });
};

sp.vue.mountEmergencyArticleTemplate = function(EmergencyButtonView){
    EmergencyButtonView.$mount().$appendTo('#startPageEmergencyTemplateHolder');
};

sp.vue.mountEmergencyButtonView = function(EmergencyButtonView){
    EmergencyButtonView.$mount().$appendTo('#startPageEmergency');
};

// returns video json
sp.dal.getVideo = function(){
    return {
        videoSrc: "video/FAMAfilm.mp4",
        skips: [5, 11, 17, 27, 35, 42],
        stories: ["", "", "", ""]
    };
};

// play button events
sp.vue.startButton = function(){
    return new Vue({
        el: "#startPageNews_button",
        methods: {
            startPageButtonClick: function(){
                sp.vueVideo = sp.vue.videoView(sp.vue.videoTemplate(), sp.dal.getVideo());
                sp.vue.mountVideoView(sp.vueVideo);
            }
        }
    });
};

// video events
sp.vue.videoView = function(VideoTemplate, data){
    var i = 0;
    return new VideoTemplate({
        data: data,
        replace: false,
        methods: {
            startPagecloseVideo: function(){
                var el = this.$el.querySelector(".startPageVideoWrap");
                var videoEl = this.$el.querySelector("video");
                videoEl.src = "";
                el.classList.add("animmaSmall");

                var self = this;
                function ev(){
                    self.$destroy(self);
                    el.removeEventListener("animationend", ev);
                }
                el.removeEventListener("animationend", ev);
                el.addEventListener("animationend", ev, false);

            },

            startPageVideoSkip: function(){
                var videoElem = this.$el.querySelector("video");
                var counter = this.$el.querySelector(".startPageVideoCounterText");

                if(i == (data.skips.length-1)){
                    // TODO: call swipe function
                    try {
                        mySwipe.next();
                    } catch (e) {

                    }
                    this.$destroy(this);

                }else if(i < data.skips.length){

                    // TODO: video jumps
                    /*if(videoElem.currentTime > data.skips[i]){
                        var j = 0;
                        do {
                            j++;
                        } while (videoElem.currentTime < data.skips[j]);
                    }else{
                    }*/

                    videoElem.currentTime = data.skips[i];
                    counter.innerHTML = (i+2)+"/"+data.skips.length;
                    i++;
                }
            },
        },

        attached: function(){
            var videoEl = this.$el.querySelector("video");
            var counter = this.$el.querySelector(".startPageVideoCounterText");
            counter.innerHTML = i+1+"/"+data.skips.length;

            videoEl.addEventListener('timeupdate', updateCountdown);
            var el = this.$el.querySelector(".startPageVideoWrap");

            function ev(){
                videoEl.src = data.videoSrc;
                el.removeEventListener("animationend", ev);
            }

            el.removeEventListener("animationend", ev);
            el.addEventListener("animationend", ev, false);


            var self = this;
            function updateCountdown() {
                var progress = document.querySelector('.startPageVideoCounter');
                try {

                    if(videoEl.currentTime >= videoEl.duration){
                        try {
                            mySwipe.next();
                        } catch (e) {

                        }
                        self.$destroy(self);
                    }
                    progress.max = videoEl.duration;
                    progress.value = videoEl.duration - videoEl.currentTime;
                } catch (e) {

                }

            }
        }
    });
};

// skip video events
sp.vue.skipVideo = function(){
    return new Vue({
        el: "#startPageSkip",
        methods: {
            startPageSkipClick: function(){
                //console.log("skipp video!");
            }
        }
    });
};

// saved articels button events
sp.vue.savedArticels = function(){
    return new Vue({
        el: "#startPageSavedArticels",
        methods: {
            startPageViewSaved: function(){
                //console.log("im going to look att my saved articles");
            }
        }
    });
};

// pushing video template to html view
sp.vue.mountVideoView = function(videoView){
    videoView.$mount().$appendTo('#startPageVideo-holder');
};

// template of video view
sp.vue.videoTemplate = function(){
    return Vue.extend({
        template: '<div class="startPageVideoWrap animmaBig">'+
        '<div><div v-on:click="startPagecloseVideo" class="startPageCloseVideo"><i class="material-icons">arrow_back</i></div>'+
        '<div><div class="startPageVideoCounterWrap"><div class="startPageVideoCounterText"></div></div><progress value="0" max="100" class="startPageVideoCounter"></progress></div>'+
        '<video v-on:click="startPageVideoSkip" src="" class="startPageVideo animmaBig" autoplay controls style="transform: scale(2.6);"></video>'+
        '</div></div>'
    });
};

// css animations
sp.css.buildAnimationZoomIn = function(){
    var cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    var rules = document.createTextNode('@keyframes zoomIn {'+
        'from {  }'+
        '0% {  border-radius: 50%; }'+
        '100% { width:'+window.innerWidth+'px; height:'+window.innerHeight+'px; border-radius:0; }'+
        'to { }'+
    '}');

    cssAnimation.appendChild(rules);
    document.getElementsByTagName("head")[0].appendChild(cssAnimation);
};

sp.css.buildAnimationZoomOut = function(){
    var cssAnimation = document.createElement('style');
    cssAnimation.type = 'text/css';
    var rules = document.createTextNode('@keyframes zoomOut {'+
        'from {  }'+
        '0% {  width:'+window.innerWidth+'px; height:'+window.innerHeight+'px; }'+
        '100% { width:200px; height:200px; border-radius:50%;}'+
        'to { }'+
    '}');

    cssAnimation.appendChild(rules);
    document.getElementsByTagName("head")[0].appendChild(cssAnimation);
};

window.onload = sp.init;
