import { createRef, PureComponent, ReactNode } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAP_ACCESS_TOKEN } from '@constants/map';
import rawBankLocations from '@data/MockBanks.json';
import { BankDetail } from '@typings/bank';
import { filterBanksLocations } from '@utils/filterBanksLocations';
import { getMapConfig } from '@utils/mapConfig';
import { MapWrapper } from './styled';

interface MapProps {
  filterCurrency: string;
}

export class Map extends PureComponent<MapProps, {}> {
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

    mapboxgl.accessToken = MAP_ACCESS_TOKEN;
    const mapConfig = getMapConfig();

    this.mapInstance = new mapboxgl.Map({
      container: this.mapContainerRef.current,
      ...mapConfig,
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

    const filteredLocations = filterBanksLocations(rawBankLocations, filterCurrency);

    filteredLocations.forEach((bank) => {
      const marker = this.createMarker(bank, map);
      this.markers.push(marker);
    });
  }

  createMarker(bank: BankDetail, map: mapboxgl.Map): mapboxgl.Marker {
    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <h4>${bank.name}</h4>
        <p>${bank.address}</p>
        <p><strong>Валюты:</strong> ${bank.currencies.join(', ')}</p>
      `);

    return new mapboxgl.Marker()
      .setLngLat([bank.coordinates.lng, bank.coordinates.lat])
      .setPopup(popup)
      .addTo(map);
  }

  render(): ReactNode {
    return <MapWrapper ref={this.mapContainerRef} />;
  }
}
