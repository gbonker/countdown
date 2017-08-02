Countdown to 1000th commit

This project counts down the days, hours, minutes and seconds until Sidewalk Labs is predicted to make their 1000th commit to their codebase.

I calculated the predicted date for the 1000th commit by finding the average amount of time each commit takes to do. I found this by subtracting the last commit's date by the first commit's date, and dividing that amount of time by the number of existing commits (410). I then subtracted the number of existing commits by 1000, and multiplied that number by the average amount of time per commit (about 16 hours). These calculations were all performed in epoch timestamps, since that's the data I was given. I concluded that if no other commits were made, the 1000th commit would occur on Friday, August 3rd, 2018 at 11:01:51 AM.

My calculations in more detail are listed below:

last date (1497469401) - first date (1472496731) = 24972670 seconds

number of commits so far: 410

24972670 seconds / 410 commits = 60909 (rounded up to nearest second) seconds per commit

1000 commits - 410 commits already = 590 commits left

590 remaining commits x 60909 seconds per commit = 35936310 more seconds until 1000th commit

1497469401 (last commit unix timestamp) + 35936310 more seconds = 1533405711

1533405711 = GMT: Saturday, August 4, 2018 6:01:51 PM


Before I performed any of these calculations, I put the given data into an Excel spreadsheet and then into a Tableau workbook to see if I noticed any trends in the commit data. One trend I noticed was that commits never occurred on weekends. I account for that in the timer app by subtracting weekend time if pressing the commit button would result in the program predicting that the updated 1000th commit date would be on a weekend. It then predicts that the commit will occur that Friday. If given more time, I would have loved to have implemented other considerations as well, such as the fact that commits likely will not happen in the middle of the night. 

I used HTML, CSS/Bootstrap, and vanilla JavaScript for this project. The page is completely responsive to any screen size. Whenever the user presses the commit button, the timer, predicted date, and number of commits all update. When the timer runs out, a message will show below it saying that Sidewalk Labs has pushed their 1000th commit. All timer-related calculations are based on the results of an API call (GET request) to the given API.

This project should run if you simply open the index.html file in the browser.