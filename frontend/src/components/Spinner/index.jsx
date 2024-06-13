/* eslint-disable react/prop-types */
import RingLoader from "react-spinners/RingLoader";
import ClipLoader from "react-spinners/ClipLoader";
import BarLoader from "react-spinners/BarLoader";
import BounceLoader from "react-spinners/BounceLoader";
import ClockLoader from "react-spinners/ClockLoader";
import DotLoader from "react-spinners/DotLoader";
import PulseLoader from "react-spinners/PulseLoader";
import BeatLoader from "react-spinners/BeatLoader";

export default function Spinner({
  type = "clip",
  size = "30px",
  color = "white",
}) {
  let content;

  switch (type) {
    case "clip":
      content = <ClipLoader size={size} color={color} />;
      break;
    case "ring":
      content = <RingLoader size={size} color={color} />;
      break;
    case "bar":
      content = <BarLoader size={size} color={color} />;
      break;
    case "bounce":
      content = <BounceLoader size={size} color={color} />;
      break;
    case "clock":
      content = <ClockLoader size={size} color={color} />;
      break;
    case "dot":
      content = <DotLoader size={size} color={color} />;
      break;
    case "pulse":
      content = <PulseLoader size={size} color={color} />;
      break;
    case "beat":
      content = <BeatLoader size={size} color={color} />;
      break;
    default:
      content = <RingLoader size={size} color={color} />;
  }
  return (
    <div
      style={{
        marginTop: "",
        display: "flex",
        justifyContent: "center",
      }}>
      {content}
    </div>
  );
}
