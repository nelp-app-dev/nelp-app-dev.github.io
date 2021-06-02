import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';
import 'leaflet-routing-machine';
import config from '../../config.json';

const createRoutineMachineLayer = (props: any) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(props.hotel.latitude, props.hotel.longitude),
      L.latLng(config.filters.latitude, config.filters.longitude),
    ],
    show: false,
  } as L.Routing.RoutingControlOptions);

  instance.on('routesfound', function (e) {
    var routes = e.routes;
    console.log(routes);
    // var summary = routes[0].summary;
    // // alert distance and time in km and minutes
    // alert(
    //   'Total distance is ' +
    //     summary.totalDistance / 1000 +
    //     ' km and total time is ' +
    //     Math.round((summary.totalTime % 3600) / 60) +
    //     ' minutes',
    // );
  });

  return instance;
};

export const Routing = createControlComponent(createRoutineMachineLayer);
