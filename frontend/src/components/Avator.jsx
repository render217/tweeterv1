/* eslint-disable react/prop-types */
export default function Avator({ img, ...props }) {
  return (
    <div {...props} className="h-10 w-10 overflow-hidden rounded-lg">
      <img className="h-full w-full object-fill" src={img} alt="" />
    </div>
  );
}
