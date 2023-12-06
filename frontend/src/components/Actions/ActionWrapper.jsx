/* eslint-disable react/prop-types */
export default function ActionWrapper({ children, ...props }) {
  return (
    <div
      {...props}
      className=" duration:300 flex w-28 cursor-pointer select-none items-center justify-center gap-2 rounded-lg py-2 text-xs text-clrDavyGrey transition-all hover:bg-clrFrenchGrey/30">
      {children}
    </div>
  );
}
