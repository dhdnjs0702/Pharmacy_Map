import { Link } from "react-router-dom";
import { useKakaoStore } from "../../zustand/dragon";

const PlacesList = () => {
  const { places } = useKakaoStore();
  return (
    <ul id="placesList">
      {places.map((place, i) => (
        <Link
          key={i}
          to={`/detail?place_name=${place.place_name}&road_address_name=${
            place.road_address_name || place.address_name || ""
          }&pharm_id=${place.pharm_id}`}
        >
          <li className="item">
            <span className={`markerbg marker_${i + 1}`}></span>
            <div className="info">
              <h5>{place.place_name}</h5>
              {place.road_address_name ? (
                <>
                  <span>{place.road_address_name}</span>
                  <span className="jibun gray">{place.address_name}</span>
                </>
              ) : (
                <span>{place.address_name}</span>
              )}
              <span className="tel">{place.phone}</span>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default PlacesList;
