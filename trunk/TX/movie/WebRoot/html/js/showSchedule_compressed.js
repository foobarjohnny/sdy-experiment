function fetchScheduleData(){var a=JSON.parse(getCurrentMovie()).id,b=JSON.parse(getCurrentTheater()).id;searchCriteria={movieId:a,theaterId:b,dateIndex:getScheduleDateText()};a=JSON.stringify(searchCriteria);a={data:0,loadingStyle:1,url:GLOBAL_hostUrl+"lookUpSchedule.do?jsonStr="+a+"&"+CommonUtil.getClientInfo(),onSuccess:ajaxCallBackForSchedule};CommonUtil.ajax(a)}function ajaxCallBackForSchedule(a){setCurrentSchedule(a);getDefaultSchedule()==null&&setDefaultSchedule(a);displayScheduleData()}
function displayMovieInfo(){var a=JSON.parse(getCurrentMovie());document.getElementById("movieData").innerText=a.name}function displayTheaterInfo(){var a=JSON.parse(getCurrentTheater()),b="";b+=a.name+"<div class='clsScheduleTheaterAddressContent clsScheduleTheaterAddressContentColor fs_middle'>"+a.addressDisplay+"</div>";document.getElementById("theaterData").innerHTML=b}
function onClickBuy(a){var b=JSON.parse(getCurrentSchedule());CommonUtil.debug("[Current Schedule]"+getCurrentSchedule());if(b==null||b.ticketURI==null||b.ticketURI=="")CommonUtil.showAlert("",I18NHelper["buyticket.noticket.movie"],I18NHelper["button.ok"]);else{setMovieTime(a);window.location=GLOBAL_hostUrl+"goToJsp.do?jsp=buyTicket&"+CommonUtil.getClientInfo()}}
function initSchedule(){GLOBAL_todayDate=new Date;GLOBAL_searchDate=getSearchDate();displayMovieInfo();displayTheaterInfo();getCurrentSchedule()==null?fetchScheduleData():displayScheduleData();changeDateDisplay()}function datePickerOnDateChange(){setScheduleDate(GLOBAL_searchDate);setSearchDate(GLOBAL_searchDate);fetchScheduleData()}
function highlightScheduleItem(a){if(a){switchHightlight(a,"clsListBgNormal","clsListBgHighlight");switchHightlight(a,"fc_gray","fc_white");switchHightlight(a.childNodes[1].childNodes[0],"clsShowScheduleArrow","clsShowScheduleArrowFocused")}}function dishighlightScheduleItem(a){if(a){switchHightlight(a,"clsListBgHighlight","clsListBgNormal");switchHightlight(a,"fc_white","fc_gray");switchHightlight(a.childNodes[1].childNodes[0],"clsShowScheduleArrowFocused","clsShowScheduleArrow")}}
function formatTimeAsHtmlText(a){a=a.split(":");var b=a[0]%24,c="";if(b==0)c="12:"+a[1]+"am";else if(b==12)c="12:"+a[1]+"pm";else if(b<12){if(b<10)b="&nbsp;&nbsp;"+b;c=b+":"+a[1]+"am"}else{b-=12;if(b<10)b="&nbsp;&nbsp;"+b;c=b+":"+a[1]+"pm"}return c}function isPassedTime(a){var b=new Date,c=b.getHours()+":"+b.getMinutes()+":"+b.getSeconds(),d=false;b=getDaysDiff(b,getSearchDate());return d=b==0?compareTime(c,a)>0?true:false:b>0?false:true}
function displayScheduleData(){var a=JSON.parse(getCurrentSchedule()).showTimes,b="",c="";if(a!=null&&a!=""){a=a.split(";");for(var d=0;d<a.length;d++){var e="";e=a.length==1?"clsScheduleItemBg":d==0?"clsScheduleItemBgTop":a.length==1+d?"clsScheduleItemBgBottom":"clsScheduleItemBgMiddle";b=a[d];var f=formatTimeAsHtmlText(b),g=isPassedTime(b);c+=g==false?'<div  class="div_table fc_gray clsListBgNormal '+e+'" ontouchstart="highlightScheduleItem(this)" ontouchend="dishighlightScheduleItem(this)" ontouchmove="dishighlightScheduleItem(this)" onClick="onClickBuy(\''+
b+"',this)\" ><div class='div_cell ticketinfostyle fs_large' >"+I18NHelper["movie.buyticketsfor"]+" "+f+"</div><div class='div_cell'><div class='clsShowScheduleArrow'></div></div></div>":'<div class="div_table fc_gray clsListBgNormal '+e+"\"><div class='div_cell ticketinfostyle fs_large'><span class='clsPassedShow'>"+I18NHelper["movie.buyticketsfor"]+" "+f+"</span></div><div class='div_cell'><div class='clsShowScheduleArrow'></div></div></div>"}}document.getElementById("scheduleList").innerHTML=c}
;