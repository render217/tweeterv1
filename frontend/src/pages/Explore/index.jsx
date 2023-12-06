/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Nav from "../../components/Navs/Nav";
import PageWrapper from "../../components/PageWrapper";
import SearchInput from "../../components/SearchInput";
import { LoadingProgress } from "../../components/Loading";
import TweetFeed from "../../components/Tweet/TweetFeed";

import AllUsers from "../../components/Users/AllUsers";
import TweetExploreFeed from "../../components/Tweet/TweetExploreFeed";
import { useLocation } from "react-router-dom";

export default function Explore() {
  const options = [
    { id: 1, link: "Top" },
    { id: 2, link: "Latest" },
    { id: 3, link: "People" },
    { id: 4, link: "Media" },
  ];
  const location = useLocation();
  //
  const [selected, setSelected] = useState(location.state?.selected || 1);

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
          <div className={`my-1 ${loading ? "visible" : "invisible"}`}>
            <LoadingProgress />
          </div>

          {selected === 1 && (
            <TweetExploreFeed type={options[0].link} search={search} />
          )}
          {selected === 2 && (
            <TweetExploreFeed type={options[1].link} search={search} />
          )}
          {selected === 3 && (
            <AllUsers type={options[2].link} search={search} />
          )}
          {selected === 4 && (
            <TweetExploreFeed type={options[3].link} search={search} />
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
