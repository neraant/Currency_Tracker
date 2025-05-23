import { Component, createRef, ReactNode } from 'react';
import mapboxgl from 'mapbox-gl';
import { INITIAL_LAT, INITIAL_LNG, INITIAL_ZOOM } from '@constants/chart';
import bankLocations from '@data/MockBanks.json';
import { ENV } from '@utils/env';
import { MapWrapper } from './styled';

interface MapProps {
  filterCurrency: string;
}

export class Map extends Component<MapProps, {}> {
  mapContainerRef = createRef<HTMLDivElement>();
  mapInstance: mapboxgl.Map | null = null;
  markers: mapboxgl.Marker[] = [];

  componentDidMount(): void {
    this.initMap();
  }

  componentDidUpdate(prevProps: MapProps): void {
    if (prevProps.filterCurrency !== this.props.filterCurrency) {
      this.updateMarkers();
    }
  }

  componentWillUnmount(): void {
    if (this.mapInstance) {
      this.mapInstance.remove();
    }
  }

  initMap() {
    if (!this.mapContainerRef.current) return;

    mapboxgl.accessToken = ENV.MAPBOXGL_ACCESS_TOKEN;
    this.mapInstance = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [INITIAL_LNG, INITIAL_LAT],
      zoom: INITIAL_ZOOM,
    });

    this.mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-left');
    this.updateMarkers();
  }

  updateMarkers() {
    const { filterCurrency } = this.props;
    const map = this.mapInstance;
    if (!map) return;

    this.markers.forEach((marker) => marker.remove());
    this.markers = [];

    const filtered = bankLocations.filter((bank) =>
      bank.currencies.some((c: string) => c.toLowerCase().includes(filterCurrency.toLowerCase()))
    );

    filtered.forEach((bank) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <h4>${bank.name}</h4>
        <p>${bank.address}</p>
        <p><strong>Валюты:</strong> ${bank.currencies.join(', ')}</p>
      `);

      const marker = new mapboxgl.Marker()
        .setLngLat([bank.coordinates.lng, bank.coordinates.lat])
        .setPopup(popup)
        .addTo(map);

      this.markers.push(marker);
    });
  }

  render(): ReactNode {
    return <MapWrapper ref={this.mapContainerRef} />;
  }
}
