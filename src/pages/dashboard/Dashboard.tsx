/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IPaginatedUrl } from "../../utils/types";
import { useDeleteAllUrlMutation, useDeleteUrlMutation, useGetUrlQuery } from "../../api/url.api";
import { toast } from "react-toastify";
import { generateArrayInRange, handleServerError } from "../../utils/helpers";
import Shimmer from "../../components/shimmer/Shimmer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../library/table";
import { Pagination, PaginationPrevious, PaginationList, PaginationPage, PaginationNext, PaginationGap } from "../../library/pagination";
import { format } from "date-fns";
import { Link } from "../../library/link";
import Nav from "../../components/nav/Nav";
import { Dropdown, DropdownButton, DropdownItem, DropdownLabel, DropdownMenu } from "../../library/dropdown";
import { ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Alert, AlertTitle, AlertDescription, AlertActions } from "../../library/alert";
import { Button } from "../../library/button";
import { useLocation } from "react-router-dom";
import EmptyState from "../../components/empty_state/EmptyState";
import { Checkbox, CheckboxField } from "../../library/checkbox";
import { Label } from "../../library/fieldset";

const Dashboard = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState<string>("");
  const [links, setLinks] = useState<IPaginatedUrl | null>(null);
  const [query, setQuery] = useState<string>("");
  const [linksToDelete, setLinksToDelete] = useState<string[]>([]);
  const [sort, setSort] = useState<number>(-1);
  const [skip, setSkip] = useState<number>(0);

  const [totalPages, setTotalPages] = useState<number>(0);
  const [minPage, setMinPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data, error, isError, isSuccess, isLoading, isFetching, refetch } = useGetUrlQuery({
    limit: 10,
    skip: skip,
    query: query,
    sort: sort,
  });
  const [deleteUrl, { isLoading: deleteUrlLoading, isSuccess: deleteUrlSuccess, isError: deleteUrlIsError, error: deleteUrlError }] = useDeleteUrlMutation();
  const [deleteAllUrl, { isLoading: deleteAllUrlLoading, isSuccess: deleteAllUrlSuccess, isError: deleteAllUrlIsError, error: deleteAllUrlError }] = useDeleteAllUrlMutation();
  useEffect(() => {
    if (isSuccess) {
      setLinks(data.data);
      const totalPages = Math.ceil(data.data.total / 10) - 1;
      setTotalPages(totalPages);
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

  useEffect(() => {
    if (deleteAllUrlSuccess) {
      setLinksToDelete([]);
      toast.success("Links were successfully deleted", { position: "top-right" });
      refetch();
    }
  }, [deleteAllUrlSuccess, refetch]);

  useEffect(() => {
    if (deleteAllUrlIsError && deleteAllUrlError) {
      const { message } = handleServerError(deleteAllUrlError);
      toast.error(message, { position: "top-center" });
    }
  }, [deleteAllUrlIsError, deleteAllUrlError]);

  const handleDeleteUrl = (url: string) => {
    setIsOpen(true);
    setCurrentLink(url);
  };

  const handleDeleteAllUrl = () => {
    const payload = linksToDelete.join(",");
    deleteAllUrl(payload);
  };

  const handleCreateUrl = () => {
    refetch();
  };

  const handleQueryParamChange = () => {
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get("page");
    const next = queryParams.get("next");
    const previous = queryParams.get("prev");

    if (page !== null) {
      const pageInt = parseInt(page, 10);
      handlePage(pageInt);
    }
    if (next !== null) {
      const nextInt = parseInt(next, 10);
      handleNextPage(nextInt);
    }
    if (previous !== null) {
      const previousInt = parseInt(previous, 10);
      handlePrevPage(previousInt);
    }
  };

  useEffect(() => {
    handleQueryParamChange();
  }, [location.search]);

  const handleNextPage = (next: number) => {
    setSkip(next);
    setCurrentPage(next);
    if (next == maxPage) {
      setMinPage((prev) => prev + 1);
      setMaxPage((next) => next + 1);
      setCurrentPage(next);
    }
  };

  const handlePrevPage = (previous: number) => {
    setSkip(previous);
    setCurrentPage(previous);
    if (previous > 0 && previous == minPage - 1) {
      setMinPage((prev) => prev - 1);
      setMaxPage((next) => next - 1);
      setCurrentPage(previous);
    }
  };

  const handlePage = (page: number) => {
    setSkip(page);
    setCurrentPage(page);
  };
  return (
    <>
      <Nav setQuery={setQuery} onCreateLink={handleCreateUrl} />
      {links?.data && links.data.length > 0 ? (
        <div className="mx-auto mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center gap-4">
              <CheckboxField>
                <Checkbox
                  name="allow_embedding"
                  checked={linksToDelete.length > 0}
                  indeterminate={linksToDelete.length !== links.data.length}
                  onChange={(checked) => setLinksToDelete(checked ? links.data.map((link) => link._id) : [])}
                />
                <Label>Select all</Label>
              </CheckboxField>
              {linksToDelete.length > 0 && (
                <Button disabled={deleteAllUrlLoading} onClick={handleDeleteAllUrl} type="button" plain className="cursor-pointer">
                  <TrashIcon className="w-4" />
                  Delete
                </Button>
              )}
            </div>
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
          <div className="mx-auto mt-4 max-w-7xl">
            {isLoading || isFetching ? (
              <Shimmer />
            ) : (
              links && (
                <>
                  <Table bleed className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]">
                    <TableHead>
                      <TableRow>
                        <TableHeader></TableHeader>
                        <TableHeader>Original Url</TableHeader>
                        <TableHeader>Short Url</TableHeader>
                        <TableHeader>Date</TableHeader>
                        <TableHeader></TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {links.data.map((link) => (
                        <TableRow key={link._id}>
                          <TableCell>
                            <Checkbox
                              aria-label="Allow embedding"
                              name="allow_embedding"
                              checked={linksToDelete.includes(link._id)}
                              onChange={(checked) => {
                                return setLinksToDelete((pending) => {
                                  return checked ? [...pending, link._id] : pending.filter((item) => item !== link._id);
                                });
                              }}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="w-96 truncate">{link.originalUrl}</div>
                          </TableCell>
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
                  {totalPages > 0 && (
                    <Pagination className="mt-6">
                      {currentPage > 0 ? <PaginationPrevious href={`?prev=${currentPage - 1}`} /> : <PaginationPrevious />}
                      <PaginationList>
                        {generateArrayInRange(minPage, maxPage).map((index) => (
                          <PaginationPage current={currentPage == index - 1} key={index} href={`?page=${index - 1}`}>
                            {`${index}`}
                          </PaginationPage>
                        ))}
                        {maxPage < totalPages ? (
                          <>
                            <PaginationGap />
                            <PaginationPage current={currentPage == totalPages - 1} href={`?page=${totalPages - 1}`}>{`${totalPages}`}</PaginationPage>
                          </>
                        ) : null}
                      </PaginationList>
                      {currentPage + 1 < totalPages ? <PaginationNext href={`?next=${currentPage + 1}`} /> : <PaginationNext />}
                    </Pagination>
                  )}
                </>
              )
            )}
          </div>
        </div>
      ) : (
        <EmptyState />
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
