import { INITIAL_LAT, INITIAL_LNG, INITIAL_ZOOM } from '@constants/map';
import { MapConfig } from '@typings/bank';

export const getMapConfig = (): MapConfig => ({
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [INITIAL_LNG, INITIAL_LAT],
  zoom: INITIAL_ZOOM,
});
