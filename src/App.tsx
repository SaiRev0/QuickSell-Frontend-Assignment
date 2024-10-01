import { useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import { QUICK_SELL_API } from "./utils/API";
import { loadGrid, mapUsersByUserId } from "./utils/sortGroup";
import { Ticket, User } from "./types/interfaces";
import Spinner from "./components/Spinner";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [userData, setUserData] = useState<Record<string, User>>({});
  const [gridData, setGridData] = useState<Record<string, Ticket[]>>({});
  const [grouping, setGrouping] = useState<string>("status");
  const [ordering, setOrdering] = useState<string>("priority");
  const [loading, setLoading] = useState(true);

  const saveFilters = useCallback((data: Record<string, string>) => {
    for (let key in data) localStorage.setItem(key, data[key]);
  }, []);

  const loadFilters = useCallback(() => {
    setGrouping(localStorage.getItem("grouping") || "status");
    setOrdering(localStorage.getItem("ordering") || "priority");
  }, []);

  useEffect(() => {
    loadFilters();
    fetch(QUICK_SELL_API)
      .then((resp) => resp.json())
      .then((res) => {
        const { tickets, users } = res;
        setTickets(tickets);
        setUserData(mapUsersByUserId(users));
      })
      .catch((err) => {
        console.log(err, "Error fetching data");
      });
  }, [loadFilters]);

  useEffect(() => {
    if (!tickets.length) return;
    setGridData(loadGrid(tickets, grouping, ordering));
    setLoading(false);
  }, [grouping, ordering, tickets]);

  const onSetGrouping = useCallback(
    (value: string) => {
      setLoading(true);
      setGrouping(value);
      saveFilters({ grouping: value });
    },
    [saveFilters]
  );

  const onSetOrdering = useCallback(
    (value: string) => {
      setLoading(true);
      setOrdering(value);
      saveFilters({ ordering: value });
    },
    [saveFilters]
  );

  return (
    <>
      <Navbar
        grouping={grouping}
        setGrouping={onSetGrouping}
        ordering={ordering}
        setOrdering={onSetOrdering}
      />
      {loading ? (
        <Spinner />
      ) : (
        <Grid gridData={gridData} grouping={grouping} userIdToData={userData} />
      )}
    </>
  );
}

export default App;
