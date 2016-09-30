/*
* This background file will intercept any request from any url like:
* (*://twitter.com/*), then will check if it has the query string 'plunge' and
* its value is 'true', if so then it will remove the Cookie from the requestHeaders
* to get the publicly available page.
*
* -kaluaim
*/
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

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details){
    var plunge = getQueryString(details.url, 'plunge');

    if (plunge == 'on') {
      // Remove the Cookie from the requestHeaders.
      // TODO: Only remove the user info from the Cookie.
      for( var i = 0; i < details.requestHeaders.length; ++i ) {

        if( details.requestHeaders[i].name == 'Cookie' ) {
          details.requestHeaders[i].value = '';
          break;
        }

      }
    }

    return {requestHeaders: details.requestHeaders};
  },
  {urls: ["*://twitter.com/*"]},
  ["blocking", "requestHeaders"]
);
