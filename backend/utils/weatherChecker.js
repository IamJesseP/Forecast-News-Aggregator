const weatherChecker = (weatherData) => {
  // Cloudy Checker
  let cloudWeather;
  let cloudCoverArray = weatherData?.weatherData?.hourly?.cloudcover.slice(0, 24);
  let cloudSum = cloudCoverArray.reduce((a, b) => a + b, 0);
  let cloudAvg = cloudSum / cloudCoverArray.length;
  // not an actual metric right here:
  if (cloudAvg <= 15) {
    cloudWeather = false;
  } else {
    cloudWeather = true;
  }

  // Rainy Checker
  let rainWeather;
  let rainCover = weatherData?.weatherData?.daily?.rain_sum[0];
  // not an actual metric right here:
  if (rainCover <= 0.004) {
    rainWeather = false;
  } else {
    rainWeather = true;
  }

  // Snowy Checker
  let snowWeather;
  let snowCover = weatherData?.weatherData?.daily?.snowfall_sum[0];
  // not an actual metric right here:
  if (snowCover <= 15) {
    snowWeather = false;
  } else {
    snowWeather = true;
  }
  return [cloudWeather, rainWeather, snowWeather];
};

module.exports.weatherChecker = weatherChecker;
