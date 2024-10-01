import { useMemo } from "react";
import Card from "../Card";
import "./column.css";
import add from "../../assets/add.svg";
import threeDots from "../../assets/3 dot menu.svg";
import { Ticket, User } from "../../types/interfaces";
import { getPriorityIcon, getStatusIcon } from "../../utils/iconsSet";
import UserProfile from "../UserProfile";

function Column({
  tickets,
  grouping,
  groupBy,
  userIdToData,
}: {
  tickets: Ticket[];
  grouping: string;
  groupBy: string;
  userIdToData: Record<string, User>;
}) {
  const title = useMemo(() => {
    if (grouping === "status" || grouping === "priority") return groupBy;
    if (grouping === "user") return userIdToData[groupBy].name;
  }, [grouping, groupBy, userIdToData]);

  const icon = useMemo(() => {
    if (grouping === "status") return getStatusIcon(groupBy);
    if (grouping === "priority") return getPriorityIcon(groupBy);
    if (grouping === "user")
      return (
        <UserProfile
          name={userIdToData[groupBy].name}
          available={userIdToData[groupBy].available}
        />
      );
  }, [grouping, groupBy, userIdToData]);

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-header-left-container">
          {icon}
          <div className="column-title">
            {title}
            <span className="count">{tickets.length}</span>
          </div>
        </div>
        <div className="column-header-right-container">
          <img src={add} alt="add" />
          <img src={threeDots} alt="3 Dots" />
        </div>
      </div>
      <div className="cards-container">
        {tickets.map((ticket: Ticket) => (
          <Card
            key={ticket.id}
            ticket={ticket}
            userData={userIdToData[ticket.userId]}
            hideStatusIcon={grouping === "status"}
            hideProfileIcon={grouping === "user"}
            hidePriorityIcon={grouping === "priority"}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
