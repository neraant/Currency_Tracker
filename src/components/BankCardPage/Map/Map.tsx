import { createRef, PureComponent, ReactNode } from 'react';
import mapboxgl from 'mapbox-gl';
import bankIcon from '@assets/icons/bank_icon.svg';
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
    let workingHoursHtml = '';

    if (bank.workingHours) {
      const hoursList = Object.entries(bank.workingHours)
        .map(([day, hours]) => `<li>${day}: ${hours}</li>`)
        .join('');
      workingHoursHtml = `
      <p><strong>График работы:</strong></p>
      <ul>${hoursList}</ul>
    `;
    }

    const popupHtml = `
    <div>
      <h4>${bank.name}</h4>
      <p>${bank.address}</p>
      <p><strong>Валюты:</strong> ${bank.currencies.join(', ')}</p>
      ${bank.phone ? `<p><strong>Тел.:</strong> ${bank.phone}</p>` : ''}
      ${workingHoursHtml}
    </div>
  `;

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHtml);

    const el = document.createElement('div');
    el.className = 'custom-marker';
    el.innerHTML = `<img src="${bankIcon}" alt="bank" style="width: 20px; height: 20px;" />`;

    return new mapboxgl.Marker(el)
      .setLngLat([bank.coordinates.lng, bank.coordinates.lat])
      .setPopup(popup)
      .addTo(map);
  }

  render(): ReactNode {
    return <MapWrapper ref={this.mapContainerRef} />;
  }
}
