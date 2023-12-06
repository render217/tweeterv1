/* eslint-disable no-unused-vars */
import { useState } from "react";
import Nav from "../../components/Navs/Nav";
import PageWrapper from "../../components/PageWrapper";
import SearchInput from "../../components/SearchInput";
import { LoadingProgress } from "../../components/Loading";
import TweetFeed from "../../components/Tweet/TweetFeed";

import AllUsers from "../../components/Users/AllUsers";

export default function Explore() {
  const options = [
    { id: 1, link: "Top" },
    { id: 2, link: "Latest" },
    { id: 3, link: "People" },
    { id: 4, link: "Media" },
  ];
  const [selected, setSelected] = useState(1);
  const onSelect = (selectedId) => {
    setSelected(selectedId);
  };
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = async (e) => {
    e.preventDefault();
  };
  return (
    <PageWrapper>
      <div className="flex gap-8 max-lg:flex-col max-lg:gap-6">
        <div className="w-full lg:w-80">
          <Nav onSelect={onSelect} selected={selected} options={options} />
        </div>
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onSubmit={handleSearch}
          />
          <div className={`my-2 ${loading ? "visible" : "invisible"}`}>
            <LoadingProgress />
          </div>

          {selected === 1 && <TweetFeed />}
          {selected === 2 && <TweetFeed />}
          {selected === 4 && <TweetFeed />}
          {selected === 3 && <AllUsers />}
        </div>
      </div>
    </PageWrapper>
  );
}
