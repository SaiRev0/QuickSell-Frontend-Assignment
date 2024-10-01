import "./card.css";
import UserProfile from "../UserProfile";
import { Ticket, User } from "../../types/interfaces";
import { getStatusIcon, getPriorityIconFromNumber } from "../../utils/iconsSet";

function TicketCard({
  ticketDetails,
  assignedUser,
  hideStatusIcon,
  hideUserProfile,
  hidePriorityIcon,
}: {
  ticketDetails: Ticket;
  assignedUser: User;
  hideStatusIcon: boolean;
  hideUserProfile: boolean;
  hidePriorityIcon: boolean;
}) {
  return (
    <div className="card">
      <div className="top-container">
        <div className="ticket-id">{ticketDetails.id}</div>
        {!hideUserProfile && (
          <UserProfile
            userName={assignedUser.name}
            isAvailable={assignedUser.available}
          />
        )}
      </div>
      <div className="middle-container">
        {!hideStatusIcon && getStatusIcon(ticketDetails.status)}
        <div className="title" title={ticketDetails.title}>
          {ticketDetails.title}
        </div>
      </div>
      <div className="bottom-container">
        {!hidePriorityIcon && (
          <div className="more-icon-container">
            {getPriorityIconFromNumber(ticketDetails.priority)}
          </div>
        )}
        {ticketDetails.tag.map((ticketTag: string) => (
          <div key={ticketTag} className="tag-container">
            <div className="tag-icon"></div>
            <div className="tag-text">{ticketTag}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TicketCard;
