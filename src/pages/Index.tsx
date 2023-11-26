import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Title from "@/components/ui/title";
import useUserListState from "@/composable/useUserListState";
import {
  ArrowDownToLine,
  ArrowDownUp,
  ArrowUpToLine,
  Pencil,
  Trash,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Index() {
  const { users, loading, query, setQuery, handleSortOrder } =
    useUserListState();
  return (
    <>
      <div>
        <Title className="text-slate-900 dark:text-slate-50 font-bold text-center text-2xl">
          List of Users
        </Title>
        <div className="flex justify-end">
          <Button asChild variant="outline">
            <Link to="/create">Create User</Link>
          </Button>
        </div>
        <div className="flex md:flex-row flex-col md:justify-between justify-end items-end md:items-center my-6 space-y-4 md:space-y-0">
          <div className="flex lg:w-1/3 sm:w-1/2 w-full space-x-4">
            <Input
              type="text"
              placeholder="Search by name or email"
              value={query.search || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery({
                  ...query,
                  page: "1",
                  search: e.target.value,
                })
              }
            />
          </div>

          <div className="flex items-center space-x-2">
            <Select
              onValueChange={(val) => {
                setQuery({
                  ...query,
                  page: "1",
                  per_page: val,
                });
              }}
              defaultValue="10"
              value={query.per_page ? query.per_page : "10"}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Show Page Count" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select page count</SelectLabel>
                  <SelectItem value="10">Show 10</SelectItem>
                  <SelectItem value="20">Show 20</SelectItem>
                  <SelectItem value="50">Show 50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setQuery({
                  page: undefined,
                  search: undefined,
                  order: undefined,
                  per_page: undefined,
                  sort: undefined,
                });
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-slate-900 dark:text-slate-50 font-medium text-sm">
          Show {users?.data.length ?? "0"} data of {users?.meta.total ?? "0"}
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <a
                role="button"
                className="flex items-center space-x-1"
                onClick={() => handleSortOrder("id")}
              >
                <span>Id</span>
                {(() => {
                  if (query.sort === "id" && query.order === "asc") {
                    return <ArrowUpToLine className="h-4 w-4" />;
                  } else if (query.sort === "id" && query.order === "desc") {
                    return <ArrowDownToLine className="h-4 w-4" />;
                  } else {
                    return <ArrowDownUp className="h-4 w-4" />;
                  }
                })()}
              </a>
            </TableHead>
            <TableHead>
              <a
                role="button"
                className="flex items-center space-x-1"
                onClick={() => handleSortOrder("name")}
              >
                <span>Name</span>
                {(() => {
                  if (query.sort === "name" && query.order === "asc") {
                    return <ArrowUpToLine className="h-4 w-4" />;
                  } else if (query.sort === "name" && query.order === "desc") {
                    return <ArrowDownToLine className="h-4 w-4" />;
                  } else {
                    return <ArrowDownUp className="h-4 w-4" />;
                  }
                })()}
              </a>
            </TableHead>
            <TableHead>
              <a
                role="button"
                className="flex items-center space-x-1"
                onClick={() => handleSortOrder("email")}
              >
                <span>Email</span>
                {(() => {
                  if (query.sort === "email" && query.order === "asc") {
                    return <ArrowUpToLine className="h-4 w-4" />;
                  } else if (query.sort === "email" && query.order === "desc") {
                    return <ArrowDownToLine className="h-4 w-4" />;
                  } else {
                    return <ArrowDownUp className="h-4 w-4" />;
                  }
                })()}
              </a>
            </TableHead>
            <TableHead>
              <a
                role="button"
                className="flex items-center space-x-1"
                onClick={() => handleSortOrder("created_at")}
              >
                <span>Created At</span>
                {(() => {
                  if (query.sort === "created_at" && query.order === "asc") {
                    return <ArrowUpToLine className="h-4 w-4" />;
                  } else if (
                    query.sort === "created_at" &&
                    query.order === "desc"
                  ) {
                    return <ArrowDownToLine className="h-4 w-4" />;
                  } else {
                    return <ArrowDownUp className="h-4 w-4" />;
                  }
                })()}
              </a>
            </TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Show Loading */}
          {loading && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          )}
          {/* Show Data */}
          {!loading &&
            users?.data.map((user, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {dayjs(user.created_at).format("DD MMMM YYYY")}
                </TableCell>
                <TableCell className="text-right flex items-center space-x-2 justify-end">
                  <Button variant="outline" size="icon" asChild>
                    <Link to={`/edit/${user.id}`}>
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          {/* Show not found data */}
          {!loading && users?.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Pagination */}
      <hr className="border-t border-slate-900 dark:border-slate-50 my-5" />
      {users?.data && users?.data?.length > 0 && <Pagination />}
    </>
  );
}

export default Index;
