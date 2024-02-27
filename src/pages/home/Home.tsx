import ShortLink from "../../components/shorten_link/ShortLink";
import Signin from "../../components/signin/Signin";
import { UserType } from "../../utils/constant";

const Home = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-screen max-w-3xl">
          <Signin />
          <ShortLink userType={UserType.GUEST} />
        </div>
      </div>
    </>
  );
};

export default Home;
