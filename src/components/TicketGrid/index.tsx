import { useMemo } from "react";
import "./ticketGrid.css";
import Column from "../Column";
import { Ticket, User } from "../../types/interfaces";

function TicketGrid({
  ticketGroups,
  groupCriteria,
  usersData,
}: {
  ticketGroups: { [key: string]: Ticket[] };
  groupCriteria: string;
  usersData: { [key: string]: User };
}) {
  const groupKeys: string[] = useMemo(
    () => Object.keys(ticketGroups),
    [ticketGroups]
  );

  return (
    <div className="grid">
      {groupKeys.map((groupKey: string) => (
        <Column
          key={groupKey}
          ticketList={ticketGroups[groupKey] as Ticket[]}
          groupType={groupCriteria}
          groupLabel={groupKey}
          usersData={usersData}
        />
      ))}
    </div>
  );
}

export default TicketGrid;
