const nodeGeocoder = require('node-geocoder');
const options = {
  provider: 'openstreetmap'
};
const geoCoder = nodeGeocoder(options);

async function getGeocode(location) {
  try {
    const res = await geoCoder.geocode(location);
    console.log(res);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

getGeocode('San Diego, CA');
