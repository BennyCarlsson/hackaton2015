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


/*--- show hide for historyPage---*/
var onClickShowHistoryArticle = function(number){
    switch (number) {
            case 1:
                document.getElementById("articleArticleHistoryOne").className = "articleShowHistoryArticle";
                break;
            case 2:
                document.getElementById("articleArticleHistoryTwo").className = "articleShowHistoryArticle";
                break;
            case 3:
                document.getElementById("articleArticleHistoryThree").className = "articleShowHistoryArticle";
                break;
            default:
                break;
        }
}

var onClickRemoveHistoryArticle = function(){
    var element = document.querySelector('.articleShowHistoryArticle');
    element.className = "articleRemovedHistoryArticle";
    var elem = document.querySelector('.articleRemovedHistoryArticle');

    function ev(){
        var element = document.querySelector('.articleRemovedHistoryArticle');
        element.className = "articleHiddenArticle";
        elem.removeEventListener("animationend", ev);
    }
    elem.removeEventListener("animationend", ev);
    elem.addEventListener("animationend", ev, false);
};
