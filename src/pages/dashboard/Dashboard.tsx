import { useEffect, useState } from "react";
import { IUrl } from "../../utils/types";
import { useDeleteUrlMutation, useGetUrlQuery } from "../../api/url.api";
import { toast } from "react-toastify";
import { handleServerError } from "../../utils/helpers";
import Shimmer from "../../components/shimmer/Shimmer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../library/table";
import { Pagination, PaginationPrevious, PaginationList, PaginationPage, PaginationGap, PaginationNext } from "../../library/pagination";
import { format } from "date-fns";
import { Link } from "../../library/link";
import Nav from "../../components/nav/Nav";
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu } from "../../library/dropdown";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Alert, AlertTitle, AlertDescription, AlertActions } from "../../library/alert";
import { Button } from "../../library/button";
import EmptyState from "../../components/empty_state/EmptyState";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<string>("");
  const [links, setLinks] = useState<IUrl[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [sort, setSort] = useState<number>(-1);
  const { data, error, isError, isSuccess, isLoading, isFetching, refetch } = useGetUrlQuery({ limit: 10, query: query, sort: sort });
  const [deleteUrl, { isLoading: deleteUrlLoading, isSuccess: deleteUrlSuccess, isError: deleteUrlIsError, error: deleteUrlError }] = useDeleteUrlMutation();

  useEffect(() => {
    if (isSuccess) {
      setLinks(data.data.data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError && error) {
      const { message } = handleServerError(error);
      toast.error(message, { position: "top-center" });
    }
  }, [isError, error]);

  useEffect(() => {
    if (deleteUrlSuccess) {
      setIsOpen(false);
      setCurrentLink("");
      toast.success("Link was successfully deleted", { position: "top-right" });
      refetch();
    }
  }, [deleteUrlSuccess, refetch]);

  useEffect(() => {
    if (deleteUrlIsError && deleteUrlError) {
      const { message } = handleServerError(deleteUrlError);
      toast.error(message, { position: "top-center" });
    }
  }, [deleteUrlIsError, deleteUrlError]);

  const handleDeleteUrl = (url: string) => {
    setIsOpen(true);
    setCurrentLink(url);
  };

  const handleCreateUrl = () => {
    refetch();
  };
  return (
    <>
      <Nav setQuery={setQuery} onCreateLink={handleCreateUrl}/>
      {!links || links.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full flex items-center justify-between">
            <Dropdown>
              <DropdownButton outline>
                Sort
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu>
                <DropdownItem onClick={() => setSort(-1)}>
                  <DropdownLabel>Newest</DropdownLabel>
                </DropdownItem>
                <DropdownItem onClick={() => setSort(1)}>
                  <DropdownLabel>Oldest</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="mx-auto max-w-7xl">
            {isLoading || isFetching ? (
              <Shimmer />
            ) : (
              links && (
                <>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeader>Original Url</TableHeader>
                        <TableHeader>Short Url</TableHeader>
                        <TableHeader>Date</TableHeader>
                        <TableHeader></TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {links.map((link) => (
                        <TableRow key={link._id}>
                          <TableCell className="font-medium">{link.originalUrl}</TableCell>
                          <TableCell>
                            <Link className="text-green-500 underline" href={`https://codedln.com/${link.alias}`}>{`https://codedln.com/${link.alias}`}</Link>
                          </TableCell>
                          <TableCell className="text-zinc-500"> {format(new Date(link.createdAt), "MM/dd/yyyy HH:mm:ss")}</TableCell>
                          <TableCell className="text-zinc-500">
                            <TrashIcon onClick={() => handleDeleteUrl(link._id)} className="w-4 text-red-500 cursor-pointer" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Pagination className="mt-6">
                    <PaginationPrevious href="?page=2" />
                    <PaginationList>
                      <PaginationPage href="?page=1">1</PaginationPage>
                      <PaginationPage href="?page=2">2</PaginationPage>
                      <PaginationPage href="?page=3" current>
                        3
                      </PaginationPage>
                      <PaginationPage href="?page=4">4</PaginationPage>
                      <PaginationGap />
                      <PaginationPage href="?page=65">65</PaginationPage>
                      <PaginationPage href="?page=66">66</PaginationPage>
                    </PaginationList>
                    <PaginationNext href="?page=4" />
                  </Pagination>
                </>
              )
            )}
          </div>
        </div>
      )}

      <Alert open={isOpen} onClose={setIsOpen}>
        <AlertTitle>Confirm Link Deletion</AlertTitle>
        <AlertDescription>Deleting this link is permanent and cannot be reversed. Proceed to remove the link?</AlertDescription>
        <AlertActions>
          <Button disabled={deleteUrlLoading} type="button" plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button disabled={deleteUrlLoading} color="red" onClick={() => deleteUrl(currentLink)}>
            Delete
          </Button>
        </AlertActions>
      </Alert>
    </>
  );
};

export default Dashboard;
