import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import TicketGrid from "./components/TicketGrid";
import { QUICK_SELL_API } from "./utils/API";
import { loadGrid, mapUsersByUserId } from "./utils/sortGroup";
import { Ticket, User } from "./types/interfaces";
import LoadingSpinner from "./components/Spinner";
import "./App.css";

function App() {
  const [ticketList, setTicketList] = useState<Ticket[]>([]);
  const [userMap, setUserMap] = useState<{ [key: string]: User }>({});
  const [gridLayout, setGridLayout] = useState<{ [key: string]: Ticket[] }>({});
  const [groupType, setGroupType] = useState<string>("status");
  const [sortOrder, setSortOrder] = useState<string>("priority");
  const [isLoading, setIsLoading] = useState(true);

  // Save the current filter settings in local storage
  const persistFilters = useCallback(
    (filterData: { [key: string]: string }) => {
      for (let key in filterData) localStorage.setItem(key, filterData[key]);
    },
    []
  );

  // Load filter settings from local storage
  const retrieveFilters = useCallback(() => {
    setGroupType(localStorage.getItem("grouping") || "status");
    setSortOrder(localStorage.getItem("ordering") || "priority");
  }, []);

  useEffect(() => {
    retrieveFilters();
    if (QUICK_SELL_API) {
      fetch(QUICK_SELL_API)
        .then((response) => response.json())
        .then((result) => {
          const { tickets, users } = result;
          setTicketList(tickets);
          setUserMap(mapUsersByUserId(users));
        })
        .catch((error) => {
          console.log(error, "Error fetching data");
        });
    }
  }, [retrieveFilters]);

  useEffect(() => {
    if (!ticketList.length) return;
    setGridLayout(loadGrid(ticketList, groupType, sortOrder));
    setIsLoading(false);
  }, [groupType, sortOrder, ticketList]);

  const updateGroupType = useCallback(
    (value: string) => {
      setIsLoading(true);
      setGroupType(value);
      persistFilters({ grouping: value });
    },
    [persistFilters]
  );

  const updateSortOrder = useCallback(
    (value: string) => {
      setIsLoading(true);
      setSortOrder(value);
      persistFilters({ ordering: value });
    },
    [persistFilters]
  );

  return (
    <>
      <Navbar
        groupType={groupType}
        setGroupType={updateGroupType}
        sortOrder={sortOrder}
        setSortOrder={updateSortOrder}
      />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <TicketGrid
          ticketGroups={gridLayout}
          groupCriteria={groupType}
          usersData={userMap}
        />
      )}
    </>
  );
}

export default App;
