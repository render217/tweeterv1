/* eslint-disable react/prop-types */
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SearchInput({ value, onChange, onSubmit }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap items-center gap-2 rounded-md bg-white px-2 py-1 shadow-sm">
          <div className="flex flex-1 items-center gap-2">
            <FontAwesomeIcon icon={faSearch} className="text-clrGunSmoke" />
            <input
              type="text"
              value={value}
              onChange={onChange}
              className="text-clrGunSmoke w-full min-w-[100px]  outline-none"
            />
          </div>
          <button className="bg-clrClearBlue rounded-md  px-4 py-2 text-xs text-white">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
