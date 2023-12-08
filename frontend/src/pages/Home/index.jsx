import PageWrapper from "../../components/PageWrapper";
import CreateTweet from "../../components/Tweet/CreateTweet";
import TweetFeed from "../../components/Tweet/TweetFeed";
import TweetTrend from "../../components/Tweet/TweetTrend";
import UserSuggestions from "../../components/Users/UserSuggestions";

export default function Home() {
  return (
    <>
      <PageWrapper>
        <div className="flex flex-col  gap-5 lg:flex-row lg:gap-8">
          <div className="flex flex-1 flex-col gap-3  lg:gap-6">
            <CreateTweet />
            <TweetFeed />
          </div>
          <div className="flex flex-col gap-5 lg:w-96 lg:gap-8">
            <TweetTrend />
            <UserSuggestions />
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

//  <div className="grid  gap-8 pt-2 lg:grid-cols-3">
//    <div className=" lg:col-start-1 lg:col-end-3">
//      <CreateTweet />
//    </div>
//    <div className="lg:col-start-1 lg:col-end-3 lg:row-start-2">
//      <TweetFeed />
//    </div>
//    <div className=" lg:col-start-3 lg:col-end-4 lg:row-start-1 ">
//      <TweetTrend />
//    </div>
//    <div className="lg:col-start-3 lg:col-end-4">
//      <UserSuggestions />
//    </div>
//  </div>;
