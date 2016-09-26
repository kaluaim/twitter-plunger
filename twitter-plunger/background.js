function parseUrl(url) {
  var urlComp = {};
  var host = '';
  var qs = {};
  var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };

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

// function getQueryStrings(url) {
//   var assoc  = {};
//   var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
//
//
//
//   if(url.indexOf('?') > -1) {
//     var queryStrings = url.split('?')[1];
//     var keyValues = queryStrings.split('&');
//
//     for(var i in keyValues) {
//       var k = keyValues[i].split('=');
//       if (k.length > 1) {
//         assoc[decode(k[0])] = decode(k[1]);
//       }
//     }
//   }
//
//
// //  var queryStrings = url.split('?')[1];
// //  console.log(queryStrings);
// //  var keyValues = queryStrings.split('&');
//
// //  for(var i in keyValues) {
//   //  var key = keyValues[i].split('=');
//   //  if (key.length > 1) {
//     //  assoc[decode(key[0])] = decode(key[1]);
//   //  }
// //  }
//
//   return assoc;
// }

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details){

    // // print details
    // for(var propName in details) {
    //   propValue = details[propName];
    //   console.log(propName,propValue);
    // }


  var plunge = getQueryString(details.url, 'plunge');
  if (plunge == 'on') {
    // remove the cookie from the requestHeaders
    // TODO only remove the user part of the cookie and keep the rest
    for( var i = 0; i < details.requestHeaders.length; ++i ) {

      if( details.requestHeaders[i].name == 'Cookie' ) {
        details.requestHeaders[i].value = '';
        break;
      }

    }
  }
    // for( var i = 0; i < details.requestHeaders.length; ++i ) {
    //
    //   if( details.requestHeaders[i].name == 'Plunger' ) {
    //     console.log(details.requestHeaders[i].name + ": " + details.requestHeaders[i].value);
    //     for( var j = 0; j < details.requestHeaders.length; ++j ) {
    //
    //       if( details.requestHeaders[j].name == 'Cookie' ) {
    //         details.requestHeaders[j].value = '';
    //         break;
    //       }
    //
    //     }
    //
    //     break;
    //   }
    //
    // }



    return {requestHeaders: details.requestHeaders};
  },
  {urls: ["*://twitter.com/*"]},
  ["blocking", "requestHeaders"]
);




// chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
//
//
//   //console.log(JSON.stringify(details));
//   var headers = details.requestHeaders,
//   blockingResponse = {};
//
//   // Each header parameter is stored in an array. Since Chrome
//   // makes no guarantee about the contents/order of this array,
//   // you'll have to iterate through it to find for the
//   // 'User-Agent' element
//   for( var i = 0; i < headers.length; ++i ) {
//     //console.log('before: ' + headers[i].name + headers[i].value);
//     if( headers[i].name == 'Plunger' ) {
//       //headers[i].value = '>>> Your new user agent string here <<<';
//       //console.log(headers[i].value);
//       //break;
//       console.log("###################################we got the header then we need to remove cookie");
//
//
//
//       for( var j = 0; j < headers.length; ++j ) {
//         //console.log('before: ' + headers[i].name + headers[i].value);
//         if( headers[j].name == 'Cookie' ) {
//           headers[j].value = '';
//           console.log(headers[j].value);
//           console.log("=========== Cookie set Done");
//           break;
//         }
//         //console.log('after: ' + headers[i].name + headers[i].value);
//         // If you want to modify other headers, this is the place to
//         // do it. Either remove the 'break;' statement and add in more
//         // conditionals or use a 'switch' statement on 'headers[i].name'
//       }
//
//
//       break;
//
//
//
//
//
//
//
//     }
//     //console.log('after: ' + headers[i].name + headers[i].value);
//     // If you want to modify other headers, this is the place to
//     // do it. Either remove the 'break;' statement and add in more
//     // conditionals or use a 'switch' statement on 'headers[i].name'
//   }
//
//   blockingResponse.requestHeaders = headers;
//   return blockingResponse;
// },
// {urls: [ "*://twitter.com/*" ]},['requestHeaders','blocking']);

// chrome.webRequest.onBeforeSendHeaders.addListener(
//   function(details) {
//     for (var i = 0; i < details.requestHeaders.length; ++i) {
//       if (details.requestHeaders[i].name === 'Cookie') {
//         details.requestHeaders.splice(i, 1);
//         break;
//       }
//     }
//     return {requestHeaders: details.requestHeaders};
//   },
//   {urls: ["<all_urls>"]},
//   ["blocking", "requestHeaders"]
// );
