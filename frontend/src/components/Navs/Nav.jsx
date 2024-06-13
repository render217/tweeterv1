/* eslint-disable react/prop-types */
export default function Nav({ options, selected, onSelect }) {
  return (
    <div className="rounded-md bg-white py-5">
      {options.map((option) => (
        <Item
          onClick={() => onSelect(option.id)}
          selected={selected}
          id={option.id}
          key={option.id}>
          {option.link}
        </Item>
      ))}
    </div>
  );
}

function Item({ selected, id, children, onClick }) {
  return (
    <div
      className={` ${
        selected === id
          ? "border-l-clrClearBlue text-clrClearBlue"
          : "border-l-transparent"
      }  hover:text-clrClearBlue  my-2  border-l-4 px-2 py-2 font-semibold`}>
      <p
        onClick={onClick}
        className="max-xs:text-xs w-fit cursor-pointer max-sm:text-sm">
        {children}
      </p>
    </div>
  );
}
