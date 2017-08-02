window.onload = function(){
  // important variables
  var averageCommitTime = 60909000; // based on given data
  var millisecondsInDay = 86400000;

  // Page elements
  var countDownDateText = document.getElementById("countdown-date");
  var numCommits = document.getElementById("number-of-commits");
  var timer = document.getElementById("countdown-timer");
  var commitButton = document.getElementById("commit-button");

  function timeConverter(timestamp){
    var datetime = new Date(timestamp);
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var year = datetime.getFullYear();
    var month = months[datetime.getMonth()];
    var date = datetime.getDate();
    var day = days[datetime.getDay()];
    var hour = datetime.getHours();
    var ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12; // the hour '0' should be '12'
    var min = datetime.getMinutes() < 10 ? '0' + datetime.getMinutes() : datetime.getMinutes(); 
    var sec = datetime.getSeconds() < 10 ? '0' + datetime.getSeconds() : datetime.getSeconds();
    var time = day + ', ' + month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec + ' ' + ampm;
    return time;
  }

  function adjustForWeekend(date) {
    var predictedDate = new Date(date);
    var adjustedDate = date;
    if (predictedDate.getDay() === 6) { // if the new date is on a Saturday
      adjustedDate -= millisecondsInDay; // will turn the date into a Friday
    } else if (predictedDate.getDay() === 0) { // if the new date is on a Sunday
      adjustedDate -= (millisecondsInDay * 2); // will turn the date into a Friday
    }
    return adjustedDate;
  }

  // Get commit data from API
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.sidewalklabs.com/codechallenge/commits", true);
  var commits = [];
  xhttp.onload = function() {
    if (xhttp.status == 200) {
      var commits = JSON.parse(xhttp.responseText);
    }

    numCommits.innerText = commits.length;

    // Set the date we're counting down to
    if (commits.length > 0) { // if API call was successful
      var mostRecentCommit = commits[0]*1000;
      var countDownDate = new Date(Math.floor(mostRecentCommit + ((1000 - commits.length)*averageCommitTime))).getTime();
    } else { // set to now plus the average time it takes for 1000 commits
      var countDownDate = new Date(Date.now() + (1000*averageCommitTime)).getTime();
    }

    countDownDate = adjustForWeekend(countDownDate);

    countDownDateText.innerHTML = timeConverter(countDownDate);

    // Update the count down every 1 second
    var countDown = setInterval(function() {

      // Get todays date and time
      var now = new Date().getTime();

      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result
      timer.innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // If the count down is finished, let the user know 
      if (distance < 0 || commits.length >= 1000) {
        clearInterval(countDown);
        timer.innerHTML = "Sidewalk Labs has pushed their 1000th commit!";
      }
    }, 1000);

    // add event listener for commit button
    commitButton.addEventListener("click", function() {
      var newCommitDate = new Date();
      commits.unshift(Math.floor(newCommitDate.getTime() / 1000));
      numCommits.innerText = commits.length;
      countDownDate -= averageCommitTime;
      countDownDate = adjustForWeekend(countDownDate);
      countDownDateText.innerHTML = timeConverter(countDownDate);
    });
  }
  xhttp.send();
}