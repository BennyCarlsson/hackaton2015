"use strict";

var onClickShowArticle = function(number){
    switch (number) {
            case 1:
                document.getElementById("articleArticleOne").className = "articleShowArticle";
                break;
            case 2:
                document.getElementById("articleArticleTwo").className = "articleShowArticle";
                break;
            case 3:
                document.getElementById("articleArticleThree").className = "articleShowArticle";
                break;
            case 4:
                document.getElementById("articleArticleFour").className = "articleShowArticle";
                break;
            case 5:
                document.getElementById("articleArticleFive").className = "articleShowArticle";
                break;
        default:
            break;
    }
};
var onClickRemoveArticle = function(){
    var element = document.querySelector('.articleShowArticle');
    element.className = "articleRemovedArticle";
    var elem = document.querySelector('.articleRemovedArticle');

    function ev(){
        var element = document.querySelector('.articleRemovedArticle');
        element.className = "articleHiddenArticle";
        elem.removeEventListener("animationend", ev);
    }
    elem.removeEventListener("animationend", ev);
    elem.addEventListener("animationend", ev, false);
};
