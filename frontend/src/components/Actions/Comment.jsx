/* eslint-disable react/prop-types */
import ActionWrapper from "./ActionWrapper";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Comment({ onClick }) {
  return (
    <ActionWrapper onClick={onClick}>
      <FontAwesomeIcon icon={faComment} />
      <p className="hidden xs:block">Comment</p>
    </ActionWrapper>
  );
}
