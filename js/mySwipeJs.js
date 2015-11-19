// pure JS
var elem = document.getElementById('mySwipe');
window.mySwipe = Swipe(elem, {
    startSlide: 2,
    continuous: false
});
var startPageSkip = document.getElementById('startPageSkip');
startPageSkip.onclick=function(){
    mySwipe.next();
};
var startPageSavedArticels = document.getElementById('startPageSavedArticels');
startPageSavedArticels.onclick=function(){
    mySwipe.prev();
};
