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
    //return true;
    return Math.floor((Math.random() * 4) + 1) < 2;
};

sp.vue.emergencyView = function(EmergencyButtonTemplate){
    return new EmergencyButtonTemplate({
        replace: false,
        methods: {
            emergencyButtonClick: function(){

            }
        }
    });
};

sp.vue.emergencyButtonTemplate = function(){
    return Vue.extend({
        template: '<div class="startPageEmergencyWrap">'+
            '<div class="startPageEmergencyArrowLeft"><i class="material-icons">arrow_upward</i></div>'+
            '<div class="startPageEmergencytitle">Just nu!</div>'+
            '<div class="startPageEmergencyIngress">SPIIK hackaton pågår och studenter från Linneuni...</div>'+
            '<div class="startPageEmergencyArrowRight"><i class="material-icons">arrow_upward</i></div>'+
        '</div>'
    });
};

sp.vue.mountEmergencyButtonView = function(EmergencyButtonView){
    EmergencyButtonView.$mount().$appendTo('#startPageEmergency');
};

// returns video json
sp.dal.getVideo = function(){
    return {
        videoSrc: "video/vidTest.mp4",
        skips: [4.5, 12, 22, 27],
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
                el.classList.add("animmaSmall");
                el.addEventListener("animationend", function(){
                        this.$destroy(this);
                }.bind(this), false);

            },

            startPageVideoSkip: function(){
                var videoElem = this.$el.querySelector("video");
                var counter = this.$el.querySelector(".startPageVideoCounterText");

                if(i == (data.skips.length-1)){
                    // TODO: call swipe function
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

            function updateCountdown() {
                var progress = document.querySelector('.startPageVideoCounter');
                progress.max = videoEl.duration;
                progress.value = videoEl.duration - videoEl.currentTime;
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
        '<video v-on:click="startPageVideoSkip" v-bind:src="videoSrc" class="startPageVideo animmaBig" autoplay></video>'+
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
