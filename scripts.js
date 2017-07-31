window.onload = function(){
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

  // Get commit data from API
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://api.sidewalklabs.com/codechallenge/commits", true);
  var commits = [];
  xhttp.onload = function() {
    if (xhttp.status == 200) {
      var commits = JSON.parse(xhttp.responseText);
    }

    var numCommits = document.getElementById("number-of-commits");
    numCommits.innerText = commits.length;

    // Set the date we're counting down to
    var countDownDate = new Date("Aug 6, 2018 12:00:00").getTime();

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

      // Display the result in the element with id="demo"
      document.getElementById("countdown-timer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";

      // If the count down is finished, write some text 
      if (distance < 0 || commits.length >= 1000) {
        clearInterval(countDown);
        document.getElementById("countdown-timer").innerHTML = "Sidewalk Labs has pushed their 1000th commit!";
      }
    }, 1000);

    // add event listener for commit button
    var commitButton = document.getElementById("commit-button");
    var countDownDateText = document.getElementById("countdown-date");
    commitButton.addEventListener("click", function() {
      var newCommitDate = new Date();
      commits.unshift(newCommitDate.getTime());
      numCommits.innerText = commits.length;
      countDownDate -= 60909000; // average time to complete a commit in milliseconds, based on given data
      var predictedDate = new Date(countDownDate);
      if (predictedDate.getDay() === 6) { // if the new date is on a Saturday
        countDownDate -= 86400000; // number of milliseconds in 24 hours, will turn the date into a Friday
      } else if (predictedDate.getDay() === 0) { // if the new date is on a Sunday
        countDownDate -= 172800000; // number of milliseconds in 48 hours, will turn the date into a Friday
      }
      countDownDateText.innerHTML = timeConverter(countDownDate);
    });
  }
  xhttp.send();
}