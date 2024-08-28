import { ClipLoader } from "react-spinners";

export default function ActionLoader() {
  return (
    <div className="absolute inset-0 grid place-content-center rounded-lg  bg-clrFrenchGrey/20 text-clrDavyGrey">
      <ClipLoader size={10} />
    </div>
  );
}
