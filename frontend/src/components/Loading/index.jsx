import CircleLoader from "react-spinners/CircleLoader";
export function LoadingProgress() {
  return (
    <div className="h-1 w-full overflow-hidden bg-clrClearBlue/30">
      <div className="left-right progress h-full w-full bg-clrClearBlue/70"></div>
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div>
      <CircleLoader />
    </div>
  );
}
