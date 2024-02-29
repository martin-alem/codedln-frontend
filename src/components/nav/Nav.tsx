import { Popover } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "../../library/button";
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu, DropdownSeparator } from "../../library/dropdown";
import { Avatar, AvatarButton } from "../../library/avatar";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { getInitials } from "../../utils/helpers";
import { useState } from "react";
import CreateLinkDiaLog from "../create_link_dialog/CreateLinkDiaLog";
import { Link } from "../../library/link";

const userNavigation = [
  { name: "Your Profile", href: "profile" },
  { name: "Sign out", href: "logout" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.authUser.user);
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover as="header" className={({ open }) => classNames(open ? "fixed inset-0 z-40 overflow-y-auto" : "", "bg-white shadow-sm lg:static lg:overflow-y-visible")}>
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/dashboard">
                      <img className="h-12 w-auto" src="https://gemkox-spaces.nyc3.cdn.digitaloceanspaces.com/codedln/codedln.svg" alt="Codedln" />
                    </Link>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          id="search"
                          name="search"
                          className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="relative -mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4 lg:space-x-4">
                  <Button onClick={() => setIsOpen(true)} color="dark">
                    Create Short Link
                  </Button>
                  <Dropdown>
                    <DropdownButton className="size-8" as={AvatarButton} src={user?.picture} aria-label="Account options" initials={user ? getInitials(user?.firstname, user?.lastname) : undefined} />
                    <DropdownMenu anchor="bottom">
                      <DropdownItem href="profile">My profile</DropdownItem>
                      <DropdownSeparator />
                      <DropdownItem href="logout">Sign out</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="border-t border-gray-200 pb-3 pt-4">
                <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
                  <div className="flex-shrink-0">
                    <Avatar className="size-8" src={user?.picture} initials={user ? getInitials(user?.firstname, user?.lastname) : undefined} />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user?.firstname} {user?.lastname}
                    </div>
                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
                  {userNavigation.map((item) => (
                    <a key={item.name} href={item.href} className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      <CreateLinkDiaLog open={isOpen} onClose={setIsOpen} />
    </>
  );
};

export default Nav;
