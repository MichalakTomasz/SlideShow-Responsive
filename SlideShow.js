


SlideShow = function (slideShowID, slideShowObjects, showCaption) {
    this.SlidshowID = slideShowID;
    this.SlideShowObjects = slideShowObjects;
    this.ShowCaption = showCaption;
    this.minImageHeightProcent = 10;
    this.Next = true;
    this.Offset = 0;
    this.SelectedIndex = null;
    this.IntervalID = null;
    this.SlideShowHandler = document.getElementById(this.SlidshowID);
    this.SlideShowHandler.setAttribute("style", "position:fixed; top:0; left:0; background: rgba(0, 0, 0, .9); width:100%; height:100%; min-width:750px;");
    this.LargeSlideBoxHandler = document.createElement("figure");
    this.LargeSlideBoxHandler.setAttribute("id", "LargeSlidedBox");
    this.LargeSlideBoxHandler.setAttribute("style", "position:absolute; display:block; left:0; top:5%; bottom:5%; width:90%; height:70%; background-repeat: no-repeat;" +
        "background-position: center center; background-size: auto 100%; padding: 30px;");
    this.SlideShowHandler.appendChild(this.LargeSlideBoxHandler);
    this.MiniSlideBoxHandler = document.createElement("ul");
    this.MiniSlideBoxHandler.setAttribute("style", "position:absolute; margin: 0px; padding: 0px; width:92%; height:" + this.minImageHeightProcent + "%; left:4%; bottom:2%; overflow:hidden;");
    this.MiniSlideBoxHandler.setAttribute("id", "miniSlideBox");
    this.SlideShowHandler.appendChild(this.MiniSlideBoxHandler);
    var imgCount = 0;
    var style;
    var styleArray = document.getElementsByTagName("style");
    if (styleArray.length == 0) style = document.createElement("style");
    else style = styleArray[0];
    var head;
    var headArray = document.getElementsByTagName("head");
    if (headArray.length == 0) head = document.createElement("head");
    else head = headArray[0];
    var htmlElement = document.getElementsByTagName("html");
    htmlElement[0].insertAdjacentElement("afterbegin", head);
    var scriptElement = document.getElementsByTagName("script");
    var imageWidth = this.GetSmallImageWidth();
    var minSlideBoxWidth = this.GetMiniSlideBoxWidth();
    var minSlideBoxHeight = this.GetMinSlideBoxHeight();
    if (scriptElement.length > 0 && scriptElement[0].parentElement.tagName.toLowerCase() == "head")
        scriptElement[0].insertAdjacentElement("beforebegin", style);
    else head[0].appendChild(style);
    var slideStyle = document.createTextNode(".slide { position:absolute; display:inline-block; margin:0; padding:0; background-position: center center; width:" + imageWidth + "px; height:" +
        minSlideBoxHeight + "px;" + "background-color:#434343; background-size: auto " + minSlideBoxHeight + "px; background-repeat: no-repeat;  box-shadow: 0px 0px 40px" +
        " black inset;}");
    style.appendChild(slideStyle);
    var selectedItem = document.createTextNode(".selectedItem{background-image:linear-gradient(to bottom, rgba(0, 0, 0, .3), rgba(255, 255, 255, .3)); box-shadow: 0px 0px 80px white inset;}");
    style.appendChild(selectedItem);
    var slidesWidth = 0;
    while (slidesWidth + imageWidth < minSlideBoxWidth) {
        var li = this.CreateLiElement(imgCount);
        li.style.left = slidesWidth + "px";
        this.MiniSlideBoxHandler.appendChild(li);
        slidesWidth += imageWidth;
        imgCount++;
    }
    this.LeftArrow = document.createElement("div");
    this.LeftArrow.innerHTML = "&lang;";
    this.LeftArrow.setAttribute("id", "LeftArrow");
    this.LeftArrow.setAttribute("style", "position:absolute; left:2%; bottom:5%; width:35px; height:35px; line-height:155%; font-size:140%; text-align:center; background-color:rgba(83, 83, 83, .0);" +
        "color:rgba(255,255,255, .6); border-radius:50%;");
    this.LeftArrow.onclick = this.MovePrev.bind(this);
    this.SlideShowHandler.appendChild(this.LeftArrow);
    this.RightArrow = document.createElement("div");
    this.RightArrow.innerHTML = "&rang;";
    this.RightArrow.setAttribute("id", "RightArrow");
    this.RightArrow.setAttribute("style", "position:absolute; right:2%; bottom:5%; width:35px; height:35px; line-height:155%; font-size:140%; text-align:center; background-color:rgba(83, 83, 83, .0);" +
        "color:rgba(255,255,255, .6); border-radius:50%;");
    this.RightArrow.onclick = this.MoveNext.bind(this);
    this.SlideShowHandler.appendChild(this.RightArrow);
    window.onresize = this.ResizeSlideBox.bind(this);
    this.Select(0);
}
SlideShow.prototype.CreateLiElement = function (index) {
    var li = document.createElement("li");
    li.setAttribute("id", index);
    li.setAttribute("class", "slide");
    li.style.backgroundImage = "url(" + this.SlideShowObjects[index].slide + ")";
    li.onclick = this.Select.bind(this);
    return li;
}
SlideShow.prototype.MoveNext = function () {
    var index;
    if (this.IntervalID != null) {
        clearInterval(this.IntervalID);
        this.IntervalID = null;
    }
    if (parseInt(this.MiniSlideBoxHandler.lastChild.id) < this.SlideShowObjects.length - 1) index = parseInt(this.MiniSlideBoxHandler.lastChild.id) + 1;
    else index = 0;
    var li = this.CreateLiElement(index);
    li.style.left = this.MiniSlideBoxHandler.lastChild.style.left + this.GetSmallImageWidth();
    this.MiniSlideBoxHandler.appendChild(li);
    this.Next = true;
    this.IntervalID = setInterval(this.Animate.bind(this), 10);
}
SlideShow.prototype.MovePrev = function () {
    var index;
    if (this.IntervalID != null) {
        clearInterval(this.IntervalID);
        this.IntervalID = null;
    }
    if (parseInt(this.MiniSlideBoxHandler.firstChild.id) == 0) index = this.SlideShowObjects.length - 1;
    else index = parseInt(this.MiniSlideBoxHandler.firstChild.id) - 1;
    var li = this.CreateLiElement(index);
    li.style.left = -this.GetSmallImageWidth();
    this.MiniSlideBoxHandler.insertAdjacentElement("afterbegin", li);
    this.Next = false;
    this.IntervalID = setInterval(this.Animate.bind(this), 10);
}
SlideShow.prototype.Animate = function () {
    var imageWidth = this.GetSmallImageWidth();
    if (this.Offset == imageWidth) {
        clearInterval(this.IntervalID);
        this.IntervalID = null;
        this.Offset = 0;
        if (this.Next) {
            this.MiniSlideBoxHandler.removeChild(this.MiniSlideBoxHandler.childNodes[0]);
            this.Select(this.GetNextIndex());
        }
        else {
            this.MiniSlideBoxHandler.removeChild(this.MiniSlideBoxHandler.lastChild);
            this.Select(this.GetPrevIndex());
        }
        return;
    }
    if (this.Next) {
        for (var i = 0; i < this.MiniSlideBoxHandler.childNodes.length; i++) {
            this.MiniSlideBoxHandler.childNodes[i].style.left = imageWidth * i - this.Offset + "px";
        }
    }
    else {
        for (var i = 0; i < this.MiniSlideBoxHandler.childNodes.length; i++) {
            this.MiniSlideBoxHandler.childNodes[i].style.left = -imageWidth + imageWidth * i + this.Offset + "px";
        }
    }
    if (this.Offset + 10 < imageWidth) this.Offset += 10;
    else this.Offset = imageWidth;

}
SlideShow.prototype.Select = function (index) {
    var Index;
    if (index == undefined || !("number" == typeof index)) Index = parseInt(event.target.id);
    else Index = index;
    var selectetItems = document.getElementsByClassName("selectedItem");
    if (selectetItems.length > 0) selectetItems[0].classList.remove("selectedItem");
    document.getElementById(Index).classList.add("selectedItem");
    var largeImage = document.getElementById("LargeSlidedBox");
    largeImage.style.backgroundImage = "url(" + this.SlideShowObjects[Index].slide + ")";
    this.SelectedIndex = Index;
}
SlideShow.prototype.ResizeSlideBox = function () {
    var miniSlideBox = document.getElementById("miniSlideBox");
    var imageWidth = this.GetSmallImageWidth();
    var miniSlideBoxWidth = this.GetMiniSlideBoxWidth();
    var miniSlideboxHeight = this.GetMinSlideBoxHeight();
    while (miniSlideBoxWidth < miniSlideBox.childNodes.length * imageWidth + imageWidth) miniSlideBox.removeChild(miniSlideBox.lastChild);
    while (miniSlideBoxWidth > miniSlideBox.childNodes.length * imageWidth + imageWidth) {
        if (miniSlideBox.childNodes.length - 1 < this.SlideShowObjects.length - 1) {
            var li = this.CreateLiElement.call(this, miniSlideBox.childNodes.length);
            miniSlideBox.appendChild(li);
        }
        else {
            var li = this.CreateLiElement.call(this, 0);
            miniSlideBox.appendChild(li);
        }
    }
    for (var i = 0; i < miniSlideBox.childNodes.length; i++) {
        miniSlideBox.childNodes[i].style.width = imageWidth + "px";
        miniSlideBox.childNodes[i].style.height = miniSlideboxHeight + "px";
        miniSlideBox.childNodes[i].style.left = i * imageWidth + "px";
    }
}
SlideShow.prototype.GetNextIndex = function () {
    if (this.SelectedIndex < this.SlideShowObjects.length - 1) return this.SelectedIndex = this.SelectedIndex + 1;
    else return this.SelectedIndex = 0;
}
SlideShow.prototype.GetPrevIndex = function () {
    if (this.SelectedIndex == 0) return this.SelectedIndex = this.SlideShowObjects.length - 1;
    else return this.SelectedIndex = this.SelectedIndex - 1;
}
SlideShow.prototype.GetMiniSlideBoxWidth = function () {
    return Math.ceil(document.defaultView.innerWidth * .92);
}
SlideShow.prototype.GetMinSlideBoxHeight = function () {
    return Math.ceil(document.defaultView.innerHeight * this.minImageHeightProcent / 100);
}
SlideShow.prototype.GetSmallImageWidth = function () {
    return Math.ceil(this.GetMinSlideBoxHeight() * 3 / 2);
}