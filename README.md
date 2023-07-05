# Forecast-News Aggregator
A full-stack application utilizing React, Node.js, Express.js, AWS DynamoDB, and various APIs. This application aims to provide users with an interface to view weather data, air quality data, and news articles based on the city and state they input. Additionally, the OpenAI API is utilized to provide users a summary of weather conditions, as well as a fun fact about the searched city.

The frontend is built with React, while the backend utilizes Node.js and Express.js. The application is hosted on Vercel for the frontend and Heroku for the backend.

**A live frontend can be found [here](https://weather-app-six-phi-69.vercel.app/)**

**A live backend has been deployed to Heroku**

![image](https://github.com/IamJesseP/Weather-App/assets/108151191/0a244be3-85f8-4d5e-9fcb-7086f25efbc1)

#

### Technologies
* JSX
* React
* NodeJS
* ExpressJS
* DynamoDB
* Various APIs (Weather, Air Quality, News, Twilio, OpenAI)
* Vercel + Heroku

### Development Tools
* Visual Studio
* Git and GitHub
* NPM
* Postman
* Axios
* AWS SDK
* Geocode
* CRON

#### Notable Frontend Tools
* Spline 3D Designs
* React-scroll + Framer-motion
* Chart.js
* React-type-animation
* Material UI


## Functionality

### OpenAI Forecast Summary
* Integrate the openAI API to display a summary of the current city,state as well as a fun fact about the inputted city

### Forecast Data
* Provides real-time weather data and air quality data based on the user's city and state input
* Provides a 7 day weather forecast that includes the temperature and weather condition displayed by conditionally rendered weather icons
* APIs used: OpenMeteo


### News Data
* Shows latest news articles based on the user's city and state input.
* APIs used: NewsAPI


### Daily SMS Weather Notifications
* Created a 24hour daily sms notification system
* Users can subscribe or unsubscribe to weather notifications for a specific city, state
* API used: Twilio


#

### Security Packages
* helmet
* cors
* express-rate-limit


## What we learned

 **Full-Stack Development** 

  * Learned how to develop a full-stack application, working on both the backend and frontend. 
  The backend was developed using Node.js, while the frontend was developed using React.

  **API Integration**

  * Learned how to integrate various APIs to fetch real-time data, handle asynchronous operations, and manage responses and errors.
  
 **Database Management** 

 * Learned how to use AWS DynamoDB, a NoSQL database, to persistently store and manage data. This included creating, reading, updating, and deleting data (CRUD operations).
  
  **Data Formatting**

  * Learned to manage and format data effectively for display on the frontend.

  
 **Server-Client Communication** 

  * Developed an understanding of how the client and server communicate, using various HTTP methods like GET, POST, DELETE, and PATCH.
  
  
 **Error Handling and Debugging** 
  
  * Throughout the project, faced and resolved numerous errors, which improved our debugging skills and understanding of error handling.
  
  
 **Asynchronous JavaScript** 
  
  * Used asynchronous JavaScript (async/await) to handle asynchronous operations, gaining a deeper understanding of promises and asynchronous execution in JavaScript.
  
 **Deployment and Environment Management** 

  * Learned how to deploy your applications on Heroku and Vercel, and manage different environments for development, testing, and production.
  
  
  
 **Version Control with Git** 
   
  * Learned to manage changes in our project, especially in a group settings with merge conflicts.
  
 **Programming Best Practices**

