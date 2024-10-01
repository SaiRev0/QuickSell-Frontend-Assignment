import { useMemo } from "react";
import Card from "../Card";
import "./column.css";
import addIcon from "../../assets/add.svg";
import menuIcon from "../../assets/3 dot menu.svg";
import { Ticket, User } from "../../types/interfaces";
import { getPriorityIcon, getStatusIcon } from "../../utils/iconsSet";
import UserProfile from "../UserProfile";

function Column({
  ticketList,
  groupType,
  groupLabel,
  usersData,
}: {
  ticketList: Ticket[];
  groupType: string;
  groupLabel: string;
  usersData: { [key: string]: User };
}) {
  const columnTitle = useMemo(() => {
    if (groupType === "status" || groupType === "priority") return groupLabel;
    if (groupType === "user") return usersData[groupLabel].name;
  }, [groupType, groupLabel, usersData]);

  const columnIcon = useMemo(() => {
    if (groupType === "status") return getStatusIcon(groupLabel);
    if (groupType === "priority") return getPriorityIcon(groupLabel);
    if (groupType === "user")
      return (
        <UserProfile
          userName={usersData[groupLabel].name}
          isAvailable={usersData[groupLabel].available}
        />
      );
  }, [groupType, groupLabel, usersData]);

  return (
    <div className="column">
      <div className="column-header">
        <div className="column-header-left-container">
          {columnIcon}
          <div className="column-title">
            {columnTitle}
            <span className="count">{ticketList.length}</span>
          </div>
        </div>
        <div className="column-header-right-container">
          <img src={addIcon} alt="Add" />
          <img src={menuIcon} alt="Menu" />
        </div>
      </div>
      <div className="cards-container">
        {ticketList.map((ticket: Ticket) => (
          <Card
            key={ticket.id}
            ticketDetails={ticket}
            assignedUser={usersData[ticket.userId]}
            hideStatusIcon={groupType === "status"}
            hideUserProfile={groupType === "user"}
            hidePriorityIcon={groupType === "priority"}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
