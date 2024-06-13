/* eslint-disable react/prop-types */
export default function SocialLogin({ onClick, label, logoImg }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 rounded-md border border-clrGunSmoke/60 py-2  hover:bg-black/5 ">
      <img className="w-[25px]" src={logoImg} alt={label} />
      <p className="text-sm">{label} </p>
    </button>
  );
}
