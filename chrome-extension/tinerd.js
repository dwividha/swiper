var Tinerd = new function(){
  var o;
  var open_info=function(){return document.querySelector('circle[fill="#FFF"]')};
  var close_info=function(){return document.querySelector('circle#circle')};
  function act(n){
    document.querySelector('button[aria-label='+n+']').click();
  };
  this.like = function(){act('Like')};
  this.superlike=function(){act('Super Like')};
  this.nope=function(){act('Nope')};
  this.rewind=function(){act('Rewind')};
  this.toggle_info=function(){
    if(close_info()==null){
      simulate(open_info(),'click');
      return;
    }
    simulate(close_info(),'click');
  }
  this.open_profile=function(){
    if(open_info()!=null){
      simulate(open_info(),'click');
    }
  }
  if(!o){
    o = this;
  }
  return o;
}();

function isToLike(p){
  if(!p instanceof ProfileInfo){
    throw "Not a profile Info";
  }
  //TODO Call server here
  return Math.random() >=0.1;
}

function swipeCards(i){
  profiles = [];
  for(j=0;j<i;j++){
    p = swipeCard();
    if(p==null){
      alert("Card not found. Completed - "+j);
      break;
    }
    profiles.push(p);
  }
  return profiles;
}

async function swipeCard(){
  pro = new ProfileInfo();
  if(isToLike(pro)){
    pro.like();
  } else {
    pro.nope();
  }
  new Promise()
  await sleep(1000);
  console.log("Slept 1s");
  return pro;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var ProfileInfo = function(){
  var o;
  function get_title(i,k){
    j = document.querySelector('div.profileCard__header__info div span:nth-child('+i+')');
    if(j==null && k==null){
      Tinerd.open_profile();
      get_title(i,true);
    }
    return j.innerHTML;
  }
  function get_current_image_url(){
    y = document.querySelector('div.recsCardboard__cards div.recCard.active div.tappable-view div.tappable_recCard div.react-swipeable-view-container div[aria-hidden=false] div.StretchedBox');
    if(y==null||y.style['backgroundImage']==null||y.style['backgroundImage'].length<4){
      return null;
    }
    return y.style['backgroundImage'].slice(4, -1).replace(/"/g, "");
  }
  this.name=get_title(1);
  this.age=get_title(2);
  var get_header_text = function(i) {
    var e = document.querySelector(
      'div.profileCard__header__info div div.Row svg[viewBox="'+i+' 0 16 12"]');
    if(e==null || e.parentElement==null || e.parentElement.parentElement==null){
      return null;
    }
    return e.parentElement.parentElement.textContent;
  };
  this.work=get_header_text(-1);
  this.distance=get_header_text(-2);
  this.education=get_header_text(0);
  this.bio=document.querySelector('div.profileCard__bio');
  this.action;
  this.like = function(){
    Tinerd.like();
    this.action='Like';
  };
  this.nope = function(){
    Tinerd.nope();
    this.action='Nope';
  };
  if(this.bio!=null){
    this.bio=this.bio.textContent;
  }
  this.current = function(){
    return new ProfileInfo();
  }
  if(!o){
    o = this;
  }
  return o;
};

function simulate(element, eventName){
  var options = extend(defaultOptions, arguments[2] || {});
  var oEvent, eventType = null;
  for (var name in eventMatchers){
    if (eventMatchers[name].test(eventName)) { 
      eventType = name; 
      break; 
    }
  }
  if (!eventType)
    throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');
  if (document.createEvent){
    oEvent = document.createEvent(eventType);
    if (eventType == 'HTMLEvents'){
      oEvent.initEvent(eventName, options.bubbles, options.cancelable);
    } else {
      oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
      options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
      options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
    }
    element.dispatchEvent(oEvent);
  } else {
    options.clientX = options.pointerX;
    options.clientY = options.pointerY;
    var evt = document.createEventObject();
    oEvent = extend(evt, options);
    element.fireEvent('on' + eventName, oEvent);
  }
  return element;
}

function extend(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
}

var eventMatchers = {
  'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
  'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
  pointerX: 0,
  pointerY: 0,
  button: 0,
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
  metaKey: false,
  bubbles: true,
  cancelable: true
}