/*
* Twitter Plunger Ver. 0.0.1 (Google Chrome Extension)
* Bypass blocked Twitter accounts (Unblocker, NOT really!)
*
* The idea is to present the publicly available page for accounts you're
* blocked from following. By intercepting the request and removing the
* Cookie from the requestHeaders.
*
*
* Developed by: Khalid Alnuaim (kaluaim)
* http://kalua.im
* Monday, September 26, 2016 (Chicago, IL)
*/

$( document ).ready(function() {
  var url = window.location.href;
  var plunge = getQueryString(url, 'plunge');

  // Check if body has blocked warning class
  if ($('div').hasClass('BlocksYouTimeline')) {

    if (!(plunge == 'off')) {
      window.location.href = setQueryString(url, 'plunge', 'on');
    }

  }

  if (plunge == 'on' || plunge == 'off') {
    notify(plunge);
  }

});

function notify(status) {

  switch(status) {
    case "on":
        notification = plungerOn;
        break;
    case "off":
        notification = plungerOff;
        break;
    default:
        notification = '';
  }

  $("body").append(notification).on('click', '#toggle-status', toggleStatus);
}

function toggleStatus() {
  var url = window.location.href;
  var plunge = getQueryString(url, 'plunge');

  if (plunge == 'on') {
    window.location.href = setQueryString(window.location.href, 'plunge', 'off');
  } else {
    window.location.href = setQueryString(window.location.href, 'plunge', 'on');
  }

}

function parseUrl(url) {
  var urlComp = {};
  var host = '';
  var qs = {};
  var decode = function (s) {return decodeURIComponent(s.replace(/\+/g, " "));};

  if (url.indexOf('?') > -1) {
    host = url.split('?')[0];
    var queryStrings = url.split('?')[1];
    var keyValues = queryStrings.split('&');

    for(var i in keyValues) {
      var k = keyValues[i].split('=');
      if (k.length > 1) {
        qs[decode(k[0])] = decode(k[1]);
      }
    }
  } else {
    host = url;
  }

  urlComp['host'] = host;
  urlComp['qs'] = qs;
  return urlComp;
}

function getQueryString(url, key) {
  var urlComp = parseUrl(url);
  var qs = urlComp['qs'];
  return qs[key];
}

function setQueryString(url, key, value) {
  var urlComp = parseUrl(url);
  var host = urlComp['host'];
  var qs = urlComp['qs'];
  var decode = function (s) {return decodeURIComponent(s.replace(/\+/g, " "));};

  if (qs[key]) {
    qs[key] = value;
  } else {
    qs[decode(key)] = decode(value);
  }

  var newQueryStrings = '';
  $.each(qs, function( k, v ) {
    newQueryStrings = newQueryStrings + '&' + k + '=' + v;
  });

  newQueryStrings = newQueryStrings.slice(1);
  return host + '?' + newQueryStrings;
}

// Vars
var toggle = '<a id="toggle-status" class=\'plunger-toggle\' href="#">toggle the plunge</a>';
var icon = chrome.extension.getURL('resources/icon.png');
var notification = '';
var plungerOn = '<div class=\'plunger-notification\'><img src=\''+ icon +'\' class=\'plunger-icon\'><div class=\'plunger-msg\'><span class=\'plunger-text\'>The Plunger is On </span>' + toggle + '<span class=\'plunger-subtext\'>You\'re not logged out!</span></div></div>';
var plungerOff = '<div class=\'plunger-notification\'><img src=\''+ icon +'\' class=\'plunger-icon\'><div class=\'plunger-msg\'><span class=\'plunger-text\'>The Plunger is Off </span>' + toggle + '</div></div>';
