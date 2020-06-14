import Geolocation from '@react-native-community/geolocation';

export const NetflixGeolocation = () => {
    Geolocation.getCurrentPosition(info => console.log(info));
};