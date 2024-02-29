import ShortLink from "../../components/shorten_link/ShortLink";
import Signin from "../../components/signin/Signin";

const Index = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-screen max-w-3xl">
          <Signin />
          <ShortLink />
        </div>
      </div>
    </>
  );
};

export default Index;
