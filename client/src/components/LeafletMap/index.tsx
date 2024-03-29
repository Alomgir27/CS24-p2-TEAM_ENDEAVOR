import LeafletMapLoader, { Init } from "../../base-components/LeafletMapLoader";
import { getColor } from "../../utils/colors";
import { selectDarkMode } from "../../stores/darkModeSlice";
import { useAppSelector } from "../../stores/hooks";
import location from "../../assets/json/location.json";
import { selectColorScheme } from "../../stores/colorSchemeSlice";

type MainProps = React.ComponentPropsWithoutRef<"div"> & {
  locations: {
    lat: number;
    lng: number;
  }[];
};

function Main(props: MainProps) {
  const darkMode = useAppSelector(selectDarkMode);
  const colorScheme = useAppSelector(selectColorScheme);
  const locations = props.locations;
  const init: Init = async (initializeMap) => {
    const mapInstance = await initializeMap({
      config: {
        //dhaka
        center: [23.8103, 90.4125],
        zoom: 13,
      },
    });

    if (mapInstance) {
      const apiKey = "1e86fd5a7f60486a8e899411776f60d5";
      const { map, leaflet } = mapInstance;

      leaflet
        .tileLayer(
          `https://tile.thunderforest.com/atlas/{z}/{x}/{y}@2x.png?apikey=${apiKey}`,
          {
            attribution:
              "Waste Management System © 2024. All rights reserved.",
          }
        )
        .addTo(map);
      
      locations.forEach((location) => {
        leaflet
          .marker([location.lat, location.lng], {
            icon: leaflet.icon({
              iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            }),
          })
          .addTo(map);
      });

      return mapInstance;
    }
  }

    


      
  return (
    <LeafletMapLoader
      init={init}
      darkMode={darkMode}
      className={props.className}
      locations={locations}
    />
  );
}

Main.defaultProps = {
  width: 0,
  height: 0,
  className: "",
};

export default Main;
