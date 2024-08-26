import Cookies from "js-cookie";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
export function checkImageValidity(type) {
  if (type === "image/jpeg" || type === "image/png" || type === "image/jpg") {
    return true;
  }
  return false;
}

export const CookieStorage = {
  setCookie: (key = "tw_token", payload) => {
    Cookies.set(key, payload);
  },
  getCookie: (key) => {
    const value = Cookies.get(key) ?? null;
    return value;
  },
  clearCookie: (key) => {
    return Cookies.remove(key);
  },
};

export function formatDateFromNow(time) {
  dayjs.extend(relativeTime);
  const formattedDate = dayjs(time).fromNow();
  return formattedDate;
}

export function filterForTagFromContent(content) {
  const regex = /#(\w+)/g;
  const matches = content.match(regex);

  if (matches) {
    return matches.map((tag) => tag.substring(1));
  } else {
    return [];
  }
}
