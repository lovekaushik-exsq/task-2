import {
  BASE_URL,
  URL_EXTENSION,
  RENDER_ID,
  ADD_BTN_ID,
  MAP_ID,
  getPage,
  getResult,
} from "./src/constants.js";
import { getTemplate } from "./utilities/userTemplate.js";
import { renderData } from "./utilities/render.js";
import { fetchData } from "./utilities/fetch.js";
import { addUser } from "./src/addUser.js";
import { sortUserByName } from "./utilities/sort.js";

let map;
let markers = [];
var prev_info_window;
async function initMap() {
  map = new google.maps.Map(document.querySelector(MAP_ID), {
    center: { lat: 12.9716, lng: 77.5946 },
    zoom: 3,
  });

  const first_user = await addUser();
  markLocation(
    {
      place: {
        lat: Number(first_user.location.coordinates.latitude),
        lng: Number(first_user.location.coordinates.longitude),
      },
      user: first_user,
    },
    map
  );
  markers.push({
    lat: Number(first_user.location.coordinates.latitude),
    lng: Number(first_user.location.coordinates.longitude),
  });
}

function markLocation(prop, map) {
  const marker = new google.maps.Marker({
    position: prop.place,
    map: map,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: getTemplate(prop.user),
  });
  marker.addListener("click", function () {
    if (prev_info_window) {
      prev_info_window.close();
    }
    prev_info_window = infoWindow;
    infoWindow.open(map, marker);
  });

  var bounds = new google.maps.LatLngBounds();
  for (let i = 0; i < markers.length; i++) {
    bounds.extend(markers[i]);
  }
  if (markers.length > 1) {
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);
    map.setZoom(map.getZoom() - 1);
    if (map.getZoom() > 15) {
      map.setZoom(15);
    }
  }
}

window.initMap = initMap;

window.addEventListener("load", async function () {
  let users_array = [];
  //initial user
  let url = `${BASE_URL}results=${getResult()}&page=${getPage()}&${URL_EXTENSION}`;
  users_array.push((await fetchData(url))[0]);
  users_array = sortUserByName(users_array);
  renderData(users_array, RENDER_ID);

  //add btn
  document.querySelector(ADD_BTN_ID).addEventListener("click", async () => {
    let new_user = await addUser();
    users_array.push(new_user);
    users_array = sortUserByName(users_array);
    renderData(users_array, RENDER_ID);
    markers.push({
      lat: Number(new_user.location.coordinates.latitude),
      lng: Number(new_user.location.coordinates.longitude),
    });

    //mark location on map
    markLocation(
      {
        place: {
          lat: Number(new_user.location.coordinates.latitude),
          lng: Number(new_user.location.coordinates.longitude),
        },
        user: new_user,
      },
      map
    );

    // var bounds = new google.maps.LatLngBounds();
    // for (let i = 0; i < markers.length; i++) {
    //   // markLocation(markers[i])
    //   console.log(typeof markers[i]);
    //   bounds.extend(markers[i]);
    // }

    // map.fitBounds(bounds);
  });
});
