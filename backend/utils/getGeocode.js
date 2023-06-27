// geocode package
const nodeGeocoder = require('node-geocoder');
const options = {
  provider: 'openstreetmap'
};
const geoCoder = nodeGeocoder(options);

async function getGeocode(location) {
  try {
    const res = await geoCoder.geocode(location);
    return res[0];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { getGeocode };
