/*eslint-disable*/

export const displayMap = (location) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicHJhbmphbDcxIiwiYSI6ImNrb2J6YXp2OTNsYzcycG12cjhsZG56YTMifQ.fnutSnn02VQeZgZnzDf5Nw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pranjal71/ckoc4p09m017h18r0nyklefh4',
    scrollZoom: false,
    // center: [-118.113491, 34.111745], //[longitude,latitude]
    // zoom: 10,
    // interactive: false,
  });

  bounds = new mapboxgl.LngLatBounds();

  loc.forEach((loc) => {
    // create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add pop up
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    //extend the map bounds to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};

// Using MapBox
