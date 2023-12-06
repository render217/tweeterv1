/* eslint-disable react/prop-types */
export default function PageWrapper({ children }) {
  return (
    <div className="custom-scroll mb-16  mt-[4.5rem] lg:mt-20">
      <div className="mx-auto max-w-7xl max-lg:max-w-4xl">
        <div className="font-Poppins px-[1%] max-lg:px-[3%]">{children}</div>;
      </div>
    </div>
  );
}
