# React-Challenge

Hi5 Code Challenge for Software Engineer Candidates

- [Intro](#intro)
- [Time Limit](#time-limit)
- [Requirements](#requirements)
- [What We Are Looking For](#what-we-are-looking-for)

## Candidate Information (Fill out with your info)

Name: Davis Wong

Email: daviswong123@gmail.com

Resume: https://drive.google.com/file/d/1DOJBaeuYqoqRQucIDRZ88LVRtdU86OYU/view?usp=sharing

Additional: Github: https://github.com/davis123123  LinkedIn:https://www.linkedin.com/in/davis-wong-b48b75127/

Setup:
cd into React-Challenge/app
npm install
npm start

Notes:
-The homescreen should display the top query results from youtube (top 50)
-The searchbar queries as you type. The videos all come from PewDiePie's channel
-Favorite will display all favorited videos
-Favorites are stored in AsyncStorage so they will be saved even if user refreshes a new session

-All videos can be favorited and unfavorited (in home, search and in favorite screens) by clicking on the favorite/unfavorite button 
(note: text is kinda small have yet to change it)

-All videos can be played by clicking on the video

Bugs:
-when favoriting, the screen will un-render so you will need to either refresh (if you are in home) or search again (if you are in search), 
favorite will auto-refresh

-Was not able to successfully implement infinite scroll. (issue where it would infinite re-render upon initializing screen)
(Thus, I had to remove the load more upon reaching the end of page)

-Maxed out Youtube queries on current API-KEY on 07/09/2020 , need to wait a day before querying
