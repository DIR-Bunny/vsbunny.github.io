$(document).ready(function()
{$(".projectNames").click(function()
{var type=$(this).find("h1").text();$("#myModalLabel").text(type);var AllData=$("."+type+"Pannel").html();$(".myModalBody").text('');$(".myModalBody").append(AllData);$("#MyModal").modal('show')});$('.close').click(function()
{$("#MyModal").modal('hide')});$(window).scroll(function()
{if($(this).scrollTop()>=50)
{$('#return-to-top').fadeIn(200)}else{$('#return-to-top').fadeOut(200)}});$('#return-to-top').click(function()
{$('body,html').animate({scrollTop:0},500)})})
