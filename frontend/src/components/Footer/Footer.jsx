import {
  faBookmark,
  faCompass,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { NavIcon } from "./components/NavIcon";

export default function Footer() {
  return (
    <div className="bg-white px-2">
      <div className="flex items-center justify-between">
        <NavIcon to={"/home"} icon={faHouse} />
        <NavIcon to={"/explore"} icon={faCompass} />
        <NavIcon to={"/bookmark"} icon={faBookmark} />
      </div>
    </div>
  );
}
