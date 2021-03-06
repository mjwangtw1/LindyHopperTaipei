var offsets = [];
var counter = 0;
var maxTimes = 10;
var beforeTime = null;
var host = window.location.hostname;

if (host.indexOf('localhost') !== -1) {
    targetUrl = 'http://localhost:8080/index.php/time';
    // alert('Local Env');

}else{
    // alert('Not Local');
    targetUrl = '/time';
}

// get average
var mean = function(array) {
    var sum = 0;

    array.forEach(function (value) {
        sum += value;
    });

    return sum/array.length;
}

var getTimeDiff = function() {
    beforeTime = Date.now();
    $.ajax(targetUrl, {
        type: 'GET',
        success: function(response) {

            response = JSON.parse(response);

            var now, timeDiff, serverTime, offset;
            counter++;

            // Get offset
            now = Date.now();
            timeDiff = (now-beforeTime)/2;
            serverTime = response.body.time-timeDiff;
            offset = now-serverTime;

            console.log('now@Client|' + now);
            console.log('now@Client|' + timeConverter(now));

            console.log('serverTime|' + serverTime);
            console.log('serverTime|' + timeConverter(serverTime));

            console.log('_Time_Diff|' + offset);
            console.log('---------------------');

            // Push to array
            offsets.push(offset)
            if (counter < maxTimes) {
                // Repeat
                getTimeDiff();
            } else {
                var averageOffset = mean(offsets);

                //result
                var result = "Average offset :" + averageOffset;
                $('#result').text(result);

                console.log(result);

                // console.log("average offset:" + averageOffset);
            }
        }
    });
}


var timeConverter = function(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(); var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

// populate 'offsets' array and return average offsets
getTimeDiff();