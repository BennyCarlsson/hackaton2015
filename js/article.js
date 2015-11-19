"use strict";

var onClickShowArticle = function(number){
    document.getElementById("articleArticleOne").className = "articleShowArticle";
};
var onClickRemoveArticle = function(number){
    document.getElementById("articleArticleOne").className = "articleRemovedArticle";
    var elem = document.querySelector('.articleRemovedArticle');

    function ev(){
        document.getElementById("articleArticleOne").className = "articleHiddenArticle";
        elem.removeEventListener("animationend", ev);
    }
    elem.removeEventListener("animationend", ev);
    elem.addEventListener("animationend", ev, false);
};
