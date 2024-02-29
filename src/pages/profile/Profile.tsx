import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Avatar } from "../../library/avatar";
import { getInitials } from "../../utils/helpers";
import Nav from "../../components/nav/Nav";

const Profile = () => {
  const user = useSelector((state: RootState) => state.authUser.user);
  return (
    <>
      <Nav setQuery={() => null} onCreateLink={() => null} />
      <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
              <div>
                <Avatar className="size-24" src={user?.picture} initials={user ? getInitials(user?.firstname, user?.lastname) : undefined} />
                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Full name</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">
                        {user?.firstname} {user?.lastname}
                      </div>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{user?.email}</div>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Verified</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{user && user.verified ? <CheckBadgeIcon className="text-blue-500 w-6" /> : <XMarkIcon className="text-red-500 w-6" />}</div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Profile;
