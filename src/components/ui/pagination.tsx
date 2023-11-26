// import { Links, Meta } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import useUserListState from "@/composable/useUserListState";

// interface Props {
//   meta: Meta;
//   links: Links;
//   currentPage: number;
// }

function Pagination() {
  // const { meta, links, currentPage } = props;
  const { query, setQuery, users } = useUserListState();

  function handlePageChange(page: string) {
    if (users?.meta.current_page) {
      if (page === "prev") {
        setQuery({
          ...query,
          page: String(users?.meta?.current_page - 1),
        });
      } else if (page === "next") {
        setQuery({
          ...query,
          page: String(users?.meta?.current_page + 1),
        });
      } else {
        setQuery({
          ...query,
          page: page,
        });
      }
    }
  }
  return (
    <div className="flex lg:justify-end justify-center w-full">
      <nav>
        <ul className="flex items-center -space-x-px h-8 text-sm">
          {users?.meta?.links &&
            users?.meta?.links.map((link, idx) => {
              const isFirstIndex = idx === 0;
              const isLastIndex = idx === users?.meta?.links.length - 1;
              return (
                <div className="flex" key={idx}>
                  {isFirstIndex && (
                    <li>
                      <Button
                        disabled={link.url === null}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-none disabled:cursor-not-allowed"
                        onClick={() => handlePageChange("prev")}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    </li>
                  )}
                  {!isFirstIndex && !isLastIndex && (
                    <li>
                      <Button
                        variant={
                          String(users?.meta?.current_page) === link.label
                            ? "default"
                            : "outline"
                        }
                        type="button"
                        size="sm"
                        className="rounded-none"
                        onClick={() => {
                          handlePageChange(link.label);
                        }}
                      >
                        {link.label}
                      </Button>
                    </li>
                  )}
                  {isLastIndex && (
                    <li>
                      <Button
                        disabled={link.url === null}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-none disabled:cursor-not-allowed"
                        onClick={() => handlePageChange("next")}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </li>
                  )}
                </div>
              );
            })}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
