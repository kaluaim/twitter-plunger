$( document ).ready(function() {
    var url = window.location.href;
    var plunge = getQueryString(url, 'plunge');

    // Check if body has blocked warning class
    if ($('div').hasClass('BlocksYouTimeline')) {
      console.log('we are blocked from follwoing: ' + url);

      if (plunge == 'off') {
        console.log('the plunge is disabled');
      } else {
        window.location.href = setQueryString(window.location.href, 'plunge', 'on');
        console.log('can you hear me');
      }

    }

    if (plunge == 'on' || plunge == 'off') {
      console.log('now we update the UI');
      notify(plunge);
    }
    //var newUrl = setQueryStrings(window.location.href, 'test', 'one');
    //console.log('new url');
    //console.log(newUrl);

//window.location.href = window.location.href +"&test=yes";
});


// function plung(url) {
//   console.log(url);
//   $.ajax({
//       url: url,
//       dataType:'html',
//       headers:{'Plunger':'Yup'},
//       success: function(data) {
//           // success, do work
//           updateUI(data);
//       },
//       error: function(data) {
//           // error, handle failure
//           console.log("error");
//       }
//
//   });
// }

// function updateUI(page) {
//   console.log("we sholud update ui here");
//   var html = $.parseHTML(page);
//   var unblokedBody = $(html).find('.AppContainer');
//   //$('.AppContainer').replaceWith(unblokedBody);
// }
function notify(status) {
  var button = '<a id="toggle-status" href="#">toggle the plunge</a>';

  // $(button).click(function() {
  //       console.log('we called@@@@@@@#######');
  //   });




  var notification = '';

  if (status == 'on') {
    //var notification = '<div class=\'plunger-notification\'><span>The Plunger is On </span><a onclick="toggleStatus()" href="javascript:void(0);">Plunger Off</a></div>';
    notification = '<div class=\'plunger-notification\'><span>The Plunger is On </span>' + button + '</div>';

  } else if (status == 'off') {
    //var notification = '<div class=\'plunger-notification\'><span>The Plunger is Off </span><a onclick="toggleStatus()" href="javascript:void(0);">Plunger On</a></div>';
    notification = '<div class=\'plunger-notification\'><span>The Plunger is Off </span>' + button + '</div>';
  }

  $("body").append(notification).on('click', '#toggle-status', toggleStatus);

}

function toggleStatus() {
  console.log("we just been called @@@@@@@@@");
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

function setQueryString(url, key, value) {
  // var assoc  = {};
  // var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
  // var host;
  //
  // if(url.indexOf('?') > -1) {
  //   host = url.split('?')[0];
  //   var queryStrings = url.split('?')[1];
  //   var keyValues = queryStrings.split('&');
  //   console.log(host);
  //   console.log(queryStrings);
  //
  //   for(var i in keyValues) {
  //     var k = keyValues[i].split('=');
  //     if (k.length > 1) {
  //       assoc[decode(k[0])] = decode(k[1]);
  //     }
  //   }
  // } else {
  //   host = url;
  // }
  var urlComp = parseUrl(url);
  var host = urlComp['host'];
  var qs = urlComp['qs'];


  if (qs[key]) {
    qs[key] = value;
  } else {
    qs[decode(key)] = decode(value);
  }

  console.log("new queryStrings");
  console.log(qs);

  var newQueryStrings = '';
  $.each(qs, function( k, v ) {
    console.log( "Key: " + k + ", Value: " + v );
    newQueryStrings = newQueryStrings + '&' + k + '=' + v;
  });

  newQueryStrings = newQueryStrings.slice(1);
  console.log(newQueryStrings);
  return host + '?' + newQueryStrings;
  //params["plunge"] = $(this).val();
  //var newUrl = "?" + $.param(params);
}









// Storage functions
// function getStorage(key) {
//   chrome.storage.local.get([key], function(items){
//     //  items = [ { "phasersTo": "awesome" } ]
//     console.log("inside get chrome");
//     console.log(items);
//     return items;
//   });
// }
//
// function setStorage(key, value) {
//   chrome.storage.local.set({ "phasersTo": "awesome" }, function(){
//     //  Data's been saved boys and girls, go on home
// });
// }

// remove part of the UI like follwo and sign in

// add the top bar for the loged in user

// add notification that this is plunged

// add button to enable and disable the plunge (make plunge true/flase)
