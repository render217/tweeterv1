import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import Nav from "../../components/Navs/Nav";

import TweetBookmarkFeed from "../../components/Tweet/TweetBookmarkFeed";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Bookmark() {
  const options = [
    { id: 1, link: "Tweets" },
    { id: 2, link: "TweetsAndReplies" },
    { id: 3, link: "Media" },
    { id: 4, link: "Likes" },
  ];
  const [selected, setSelected] = useState(1);
  const onSelect = (selectedId) => {
    setSelected(selectedId);
  };
  let userId = "";
  const { user } = useAuth();

  const location = useLocation();

  if (location.pathname === "/bookmark") {
    userId = user._id;
  }

  return (
    <PageWrapper>
      <div className="flex gap-8 max-lg:flex-col max-lg:gap-6">
        <div className="w-full lg:w-80">
          <Nav onSelect={onSelect} selected={selected} options={options} />
        </div>
        <div className="flex-1">
          {selected === 1 && (
            <TweetBookmarkFeed userId={userId} type={options[0].link} />
          )}
          {selected === 2 && (
            <TweetBookmarkFeed userId={userId} type={options[1].link} />
          )}
          {selected === 3 && (
            <TweetBookmarkFeed userId={userId} type={options[2].link} />
          )}
          {selected === 4 && (
            <TweetBookmarkFeed userId={userId} type={options[3].link} />
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
