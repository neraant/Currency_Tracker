import mapboxgl from 'mapbox-gl';
import { Component, createRef, ReactNode } from 'react';

import { MapWrapper } from './styled';

export class Map extends Component<{}, {}> {
  mapRefContainer = createRef<HTMLDivElement>();

  componentDidMount(): void {
    mapboxgl.accessToken = '';

    if (this.mapRefContainer.current) {
      const map = new mapboxgl.Map({
        container: this.mapRefContainer.current,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    }
  }

  componentWillUnmount(): void {
    if (this.mapRefContainer.current) {
      this.mapRefContainer.current.remove();
    }
  }

  render(): ReactNode {
    return <MapWrapper ref={this.mapRefContainer} />;
  }
}
