import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import Nav from "../../components/Navs/Nav";
import TweetFeed from "../../components/Tweet/TweetFeed";

export default function Bookmark() {
  const options = [
    { id: 1, link: "Tweets" },
    { id: 2, link: "Tweet & replies" },
    { id: 3, link: "Media" },
    { id: 4, link: "Likes" },
  ];
  const [selected, setSelected] = useState(1);
  const onSelect = (selectedId) => {
    setSelected(selectedId);
  };
  return (
    <PageWrapper>
      <div className="flex gap-8 max-lg:flex-col max-lg:gap-6">
        <div className="w-full lg:w-80">
          <Nav onSelect={onSelect} selected={selected} options={options} />
        </div>
        <div className="flex-1">
          <TweetFeed />
        </div>
      </div>
    </PageWrapper>
  );
}
