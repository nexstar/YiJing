import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Random } from 'meteor/random'
import './main.html';

// window.addEventListener('click', function() {
//    if(navigator.onLine){
//      alert('1');
//    }else{
//      alert('0');
//    }
//  }); 

// $("#Con_overlay").show();
// $("#Con_spinner").show();
// $("#Con_overlay").side();
// $("#Con_spinner").side();

// $("#Load_overlay").show();
// $("#Load_spinner").show();
// $("#Load_overlay").side();
// $("#Load_spinner").side();

var live;
var TimeOutHub=[];
var liveNumber=0;
var TimeOutID;
function Flive(_TimeNumber){
	live = navigator.onLine;
	if(live){
		if(liveNumber<3){
			TimeOutID = Meteor.setTimeout(Flive,_TimeNumber);
		}else{
			for(var i=0;i<TimeOutHub.length;i++){
				Meteor.clearTimeout(TimeOutHub[i]);
			}
			// $("#Con_overlay").hide();
			// $("#Con_spinner").hide();
			$("#Load_overlay").hide();
			$("#Load_spinner").hide();
			liveNumber=0;
		}
		liveNumber++;
	}else{
		liveNumber = 0;
		TimeOutID = Meteor.setTimeout(Flive,_TimeNumber);
	}
	TimeOutHub.push(TimeOutID);
}

Router.route('/', {
	onBeforeAction: function () {
		// $("#Con_overlay").show();
		// $("#Con_spinner").show();
		$("#Load_overlay").show();
		$("#Load_spinner").show();
		Flive(1000);
		this.next();
	},
	name: 'post.Main',
	layoutTemplate: 'MasterLayout',
});

Router.route('/Route_Meditation',{
	onBeforeAction: function () {
		// $("#Con_overlay").show();
		// $("#Con_spinner").show();
		$("#Load_overlay").show();
		$("#Load_spinner").show();
		Flive(1000);
		this.next();
	},
	name: 'post.Meditation',
	layoutTemplate: 'Meditation',

});

Router.route('/Route_birthday',{
	onBeforeAction: function () {
		// $("#Con_overlay").show();
		// $("#Con_spinner").show();
		$("#Load_overlay").show();
		$("#Load_spinner").show();
		Flive(1000);
		this.next();
	},
	name: 'post.birthday',
	layoutTemplate: 'birthday',
});
// this.layout('ShowHang', { data: { title: this.params.query['Rebk'] } });
// Router.route('/Route_ShowHang/:_id',
Router.route('/Route_ShowHang',
	// function(){
	// 	// this.layout('ShowHang', { data: { title: this.params.query['Rebk'] } });
	// },{
	{onBeforeAction: function () {
		// $("#Con_overlay").show();
		// $("#Con_spinner").show();
		$("#Load_overlay").show();
		$("#Load_spinner").show();
		Flive(4000);
		this.next();
	},
	name: 'post.ShowHang',
	layoutTemplate : 'ShowHang'
});

// 首頁MasterLayout
	Template.MasterLayout.events({
		'click [name=Meditation]':function(){
			Router.go('post.Meditation');
		},
		'click [name=birthday]':function(){
			Router.go('post.birthday');
		},
	});

var Relat = new ReactiveVar('');
var Relong = new ReactiveVar('');
var PathName = new ReactiveVar('NoMonthDay');
// 默念Meditation
	Template.Meditation.events({
		'click button':function(evt,tmp){
			var _top = tmp.$('[name=top_input]').val();
			var _bottom = tmp.$('[name=bottom_input]').val();
			if(_top==""){
				alert("上掛不能為空只能填數字！！");
			}else{
				if(_bottom==""){
					alert("下掛不能為空只能填數字！！");
				}else{
					if(_top%8==0 || _bottom%8==0){
						alert("重新默念及更換新數字..");
						$('[name=top_input]').val('');
						$('[name=bottom_input]').val('');
					}else{
						var _lat=_top%8;
						var _long=_bottom%8;
						// var tmp=Random.secret(5);
						PathName.set("NoMonthDay");
						Relat.set(_lat);
						Relong.set(_long);
						// Router.go('post.ShowHang',{_id:tmp},{query:'Rebk=Route_Meditation'});
						Router.go('post.ShowHang');
					}
				}
			}
		},
	});

// 
	var ReIF = new ReactiveVar('0');
	Template.ShowHang.helpers({
		IFShowHang(){
			// $("#Con_overlay").show();
			// $("#Con_spinner").show();
			return 1;
		},
		eachShowHang(){
			var Hub=[];
			$("#Con_overlay").show();
		    $("#Con_overlay").show();
			$.ajax({
		      type: "POST",
		      async: false,
		      crossDomain: true,
		      url: "https://jnadtech.com/Yijing/GetHangMD.php",
		      dataType: "json",
		      data: {
		      	vname:PathName.get(),
		        vmonth:Relat.get(),
		        vday:Relong.get()
		      },
		      success: function (data) {
		        Hub.push({ 
		        	pic:data[0]['流水號'],
					title:data[0]['第幾掛'],
					contant1:data[0]['掛象'],
					contant2:data[0]['現象'],
					contant3:data[0]['對策']}
				);
		        $("#Con_overlay").hide();
		    	$("#Con_overlay").hide();
		      }, error: function (jqXHR) {
		      	Flive(1000);
		      	Router.go('post.Main');
		      }
			});
			return Hub;
		}
	});

// 生日的Template
	Template.birthday.events({
		'click button':function(evt,tmp){
			var _select_Year = tmp.$('[name=select_Year]').val();
			var _select_month = tmp.$('[name=select_month]').val();
			var _select_day = tmp.$('[name=select_day]').val();
			var _temp_birthday = tmp.$('[name=temp_birthday]').val();
			// if(String(_select_Year)=="null"){
			// 	alert("請選擇年份");
			// }else{
			if(String(_select_month)=="null"){
				alert("請選擇月份");
			}else{
				if(String(_select_day)=="null"){
					alert("請選擇日期");
				}else{
					PathName.set("MonthDay");
					Relat.set(_select_month);
					Relong.set(_select_day);
					// var tmp=Random.secret(5);
					// Router.go('post.ShowHang',{_id:tmp},{query:'Rebk=Route_birthday'});
					Router.go('post.ShowHang');
				}
			}
			// }
		}});

// 年份下拉式
	Template.birthday_Yoption.helpers({
		YOptionNumber(){
			var MonHub = [];
		    for (var i = 2030; i >= 1910; i--) {
		      MonHub.push({ YONumber: i });
		    }
		    return MonHub;
		}});

// 月份下拉式
	Template.birthday_Moption.helpers({
		MOptionNumber(){
			var MonHub = [];
		    for (var i = 12; i >= 1; i--) {
		      MonHub.push({ MONumber: i });
		    }
		    return MonHub;
		}});

// 日期下拉式
	Template.birthday_Doption.helpers({
		DOptionNumber(){
			var DayHub = [];
		    for (var i = 31; i >= 1; i--) {
		      DayHub.push({ DONumber: i });
		    }
		    return DayHub;
		}});





