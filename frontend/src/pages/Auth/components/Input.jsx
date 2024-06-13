/* eslint-disable react/prop-types */
export default function Input({ label, ...props }) {
  return (
    <div className=" flex flex-col gap-1">
      <label className="text-sm text-clrDavyGrey" htmlFor={label}>
        {label}
      </label>
      <input
        {...props}
        id={label}
        autoComplete="off"
        className="h-10 rounded-md border border-clrGunSmoke px-2 text-sm text-clrDavyGrey outline-none"
      />
    </div>
  );
}
