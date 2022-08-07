import { getTemplate } from "../utilities/userTemplate.js";
// var prev_info_window;
export function markLocation(prop, map, prev_info_window) {
  const marker = new google.maps.Marker({
    position: prop.place,
    map: map,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: getTemplate(prop.user),
  });

  marker.addListener("click", function () {
    // infoWindow.close();
    if (prev_info_window) {
      prev_info_window.close();
    }
    prev_info_window = infoWindow;
    infoWindow.open(map, marker);
  });
}
