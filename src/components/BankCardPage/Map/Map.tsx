import mapboxgl from 'mapbox-gl';
import { Component, createRef, ReactNode } from 'react';

import bankLocations from '@data/MockBanks.json';
import { ENV } from '@utils/env';

import { MapWrapper } from './styled';

export class Map extends Component<{}, {}> {
  mapContainerRef = createRef<HTMLDivElement>();
  mapInstance: mapboxgl.Map | null = null;

  componentDidMount(): void {
    mapboxgl.accessToken = ENV.MAPBOXGL_ACCESS_TOKEN;

    if (this.mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: this.mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [27.561481, 53.902496],
        zoom: 11,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-left');

      this.mapInstance = map;

      bankLocations.forEach((bank) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <h4>${bank.name}</h4>
          <p>${bank.address}</p>
          <p><strong>Валюты:</strong> ${bank.currencies.join(', ')}</p>
        `);

        new mapboxgl.Marker()
          .setLngLat([bank.coordinates.lng, bank.coordinates.lat])
          .setPopup(popup)
          .addTo(map);
      });
    }
  }

  componentWillUnmount(): void {
    if (this.mapInstance) {
      this.mapInstance.remove();
    }
  }

  render(): ReactNode {
    return <MapWrapper ref={this.mapContainerRef} />;
  }
}
