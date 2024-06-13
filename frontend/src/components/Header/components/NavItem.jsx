/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";

export function NavItem({ to, text }) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${
          isActive
            ? `border-clrClearBlue `
            : ` hover:text-clrClearBlue hover:bg-clrFrenchGrey/20  border-transparent `
        }
        w-20  border-b-4 py-4 text-center text-sm transition-all duration-300 ease-in-out
        `
      }
      to={to}>
      {text}
    </NavLink>
  );
}
