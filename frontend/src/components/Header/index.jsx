import { NavItem } from "./components/NavItem";
import { Setting } from "./components/Setting";

export default function Header() {
  return (
    <>
      <header className="flex items-center px-3">
        <div className=" xs:min-w-[120px] cursor-pointer">
          <img src="/images/tweeter.svg" alt="" />
          {/* <img
              className="max-xs:block hidden"
              src="./images/tweeter-small.svg"
              alt=""
            />  */}
        </div>
        <div className="font-Poppins hidden flex-1 justify-center gap-4 sm:flex">
          <NavItem to={"/home"} text="Home" />
          <NavItem to={"/explore"} text="Explore" />
          <NavItem to={"/bookmark"} text="Bookmark" />
        </div>
        <div className=" max-sm:ml-auto">
          <Setting />
        </div>
      </header>
    </>
  );
}
