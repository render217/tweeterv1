/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

export function NavIcon({ to, icon }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive
            ? `border-clrClearBlue text-clrClearBlue `
            : ` hover:text-clrClearBlue hover:bg-clrFrenchGrey/40 border-transparent `
        }
        text-clrGunSmoke  w-16 flex-1 border-b-8 py-2 text-center text-xl transition-all duration-300 ease-in-out
        
        `
      }
      to={to}>
      <FontAwesomeIcon icon={icon} />
    </NavLink>
  );
}
