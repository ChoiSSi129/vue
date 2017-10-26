function hasJqueryObject( $elem ){return $elem.length > 0;}
var app = app || {};

const singleton = "slngleton";
class Singleton {
    static get ins(){
        return this[singleton] = this[singleton] || new this;
    }
    constructor(){
        let Class = Object.create(Singleton);
        return Class[singleton] = Class[singleton] || this;
    }
}

class ModuleDef extends Singleton{
    constructor(){
        super();
        this._all = [];
        this._hashMap = [];
    }

    createClass( cls  ){
        this.add( new cls(), cls );
    }

    add( _Class, cls ){
        this._hashMap[cls] =  _Class;
        this._all.push( _Class );
    }
    find( _cls ){
        return this._hashMap[ _cls ];
    }
}

class MrChoiSSiDataListManager extends Singleton{
    constructor(){
        super();
        this._hashMap = {};
        this._all = [];
    }

    add( obj ){
        this._hashMap[obj.id] = obj;
        this._all.push(obj);
    }

    create( obj ){
        return new MrChoiSSiData( obj );
    }

    reset( obj ){
        for(var i=0; i<obj.length; i++){
            this.add( this.create(obj[i]) );
        }
    }

    all(){
        return this._all;
    }
}

class MrChoiSSiData{
    get id(){
        return this._id;
    }
    get url(){
        return this._url;
    }
    get title(){
        return this._title;
    }
    get text(){
        return this._text;
    }
    get yearID(){
        return this._yearID;
    }
    constructor(obj){
        this._id = obj.id;
        this._url = obj.url;
        this._title = obj.title;
        this._text = obj.text;
        this._yearID = obj.yearID;
    }
}

class MrChoiSSiDataYearManager extends Singleton{
    constructor(){
        super();
        this._hashMap = {};
        this._all = [];
    }

    add( obj ){
        this._hashMap[obj.id] = obj;
        this._all.push(obj);
    }

    create( obj ){
        return new MrChoiSSiDataYear( obj );
    }

    reset( obj ){
        for(var i=0; i<obj.length; i++){
            this.add( this.create(obj[i]) );
        }
    }

    all(){
        return this._all;
    }
}

class MrChoiSSiDataYear{
    get id(){
        return this._id;
    }
    get year(){
        return this._year;
    }
    constructor(obj){
        this._id = obj.id;
        this._year = obj.year;
    }
}

class SetDataView{
    constructor(){

    }

    setListHTML( obj ){
        let html = "";
        for(var i = obj.length-1; i > -1; i--){
            html += "<div class='view' data-listID ="+ i +">";
            html +="<p class='tit'>"+ obj[i].title +"</p>";
            html +="<p class='txt'>"+ obj[i].text +"</p>";
            html += "<div class='btnWrap'>";
            if(obj[i].url !== ""){
                html += "<a href="+ obj[i].url +" class='btn' target='_blank'>자세히보기</a>";
            }
            html += "</div>";
            html += "</div>";
        }
        UI.ins.$projectList.html( html );
    }

    setYearHTML( obj ){
        let html = "";
        for(var i = 0; i < obj.length; i++){
            if(i === 0) html += "<button type='button' class='btnYear current' data-yearID="+ i +">"+ obj[i].year +"</button>";
            else html += "<button type='button' class='btnYear' data-yearID="+ i +">"+ obj[i].year +"</button>";
        }
        UI.ins.$btnArea.html( html );
    }
}

class UIEventManager{
    constructor(){

    }

    init(){
        this.$view = UI.ins.$body.find(".view");
        this.$btnYear = UI.ins.$body.find(".btnYear");
        this.$view.each(function(idx){ ModuleDef.ins.find( UIEventManager ).setViewAlign( $(this), idx) });
        this.$btnYear.on("click", this.setYearlyAlign.bind(this));
    }

    setViewAlign( elem, key ){
        let viewW = this.$view.outerWidth(true);
        let viewH = this.$view.outerHeight(true);
        let viewGapX = 5;
        let viewGapY = 5;
        let margin = 2.5;
        let viewOuterW = viewW + viewGapX;
        let viewOuterH = viewH + viewGapY;
        let count = parseInt( UI.ins.$projectList.width() / (viewW+viewGapX) );
        let randomW = Math.floor( Math.random() * ( (viewOuterW * count) - viewOuterW ) );
        let randomH =Math.floor( Math.random() * ( viewOuterH * parseInt(key / count) ) );
        let settingW = viewOuterW * parseInt(key % count) + margin;
        let settingH = viewOuterH * parseInt(key / count);

        TweenMax.set(elem, { x:randomW, y:randomH, scaleX:.5, scaleY:.5, force3D:true });
        elem.show();
        TweenMax.to(elem, .7, { x:settingW, y:settingH, scaleX:1, scaleY:1, opacity:1, ease: Power1.easeInOut });
        UI.ins.$projectList.css({ "height" : ( viewOuterH * parseInt(key / count) ) + viewOuterH });
    }

    setYearlyAlign(e){
        let yearID = parseInt($(e.target).attr("data-yearID"));
        let currentArr = [];
        this.$btnYear.eq(yearID).addClass("current");
        this.$btnYear.not(this.$btnYear.eq(yearID)).removeClass("current");

        for(var i = 0; i < MrChoiSSiDataListManager.ins.all().length; i++){
            if(yearID === 0){
                currentArr.push(MrChoiSSiDataListManager.ins.all()[i].id);
            } else{
                if(yearID === MrChoiSSiDataListManager.ins.all()[i].yearID) {
                    currentArr.push(MrChoiSSiDataListManager.ins.all()[i].id);
                }
            }
        }

        this.$view.hide();
        for(var c = 0; c < currentArr.length; c++){
            if(yearID === 0){
                ModuleDef.ins.find( UIEventManager ).setViewAlign( this.$view.eq(c), c );
            } else{
                var idx = Math.abs( MrChoiSSiDataListManager.ins.all()[currentArr[c]].id - ( this.$view.length - 1 ) );
                ModuleDef.ins.find( UIEventManager ).setViewAlign( this.$view.eq(idx), c );
            }
        }
    }
}

class UI extends Singleton{
    constructor(){
        super();
        console.log( "UI START" );
        // ModuleDef.ins.createClass( SetDataView );
        ModuleDef.ins.createClass( UIEventManager );
    }

    init( _body ){
        this.$body = _body;
        this.$projectList = this.$body.find(".projectList");
        this.$btnArea = this.$body.find(".btnArea");
        // this.$projectList.length > 0 && ModuleDef.ins.find( SetDataView ).setListHTML( MrChoiSSiDataListManager.ins.all() );
        // this.$btnArea.length > 0 && ModuleDef.ins.find( SetDataView ).setYearHTML( MrChoiSSiDataYearManager.ins.all() );
        this.$projectList.length > 0 && ModuleDef.ins.find( UIEventManager ).init();
    }

    reset(){
        console.log( "UI RESET");
    }
}

$(function(){
	UI.ins.init($("body"));
});