Developing Twicker Mobile for lab 4 was an interesting challenge. For the most part jQuery Mobile actually got in the way of the way I wanted the content to render on smaller screens. I had to end up overwriting much of the text and content styles with an alternate stylesheet that I had to link after jquery Mobile. Th problem was that jquery handled a lot of the floating stuff very well, but I found no easier way to solve the problem then what I did.

I put the working demo up on projects.campuslist.myrpi.org/TwickerMobile and I plan on updating it through the semester as my design tastes change. 

I was messing around with a ton of different queries one could use on twitter's api and settled for the location one because it was the most unique. 

also I find it pretty interesting that at least 0% of the tweets cycling through on Twicker are about tests of some sort.

Another interesting problem presented to me was that the tweets I am pulling in are limited, and sometimes do not contain tweets made from campus itself because of the way that twitter handles our location on the wifi network at rpi (technically to twitter we are all tweeting from Hartford CT)