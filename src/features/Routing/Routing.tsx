import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import config from '../../config.json';

const createRoutineMachineLayer = (props: any) => {
  const instance = L.Routing.control({
    createMarker: () => {},
    waypoints: [
      L.latLng(props.hotel.latitude, props.hotel.longitude),
      L.latLng(config.filters.latitude, config.filters.longitude),
    ],
    show: false,
    addWaypoints: false,
    draggableWaypoints: false,
    showAlternatives: false,
  } as L.Routing.RoutingControlOptions);

  instance.on('routesfound', function (e) {
    var routes = e.routes;
    props.setDetailsRoute(routes[0]);
  });

  return instance;
};

export const Routing = createControlComponent(createRoutineMachineLayer);
