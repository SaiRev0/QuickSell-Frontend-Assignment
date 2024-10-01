import "./card.css";
import UserIcon from "../UserProfile";
import { Ticket, User } from "../../types/interfaces";
import { getStatusIcon, getPriorityIconFromNumber } from "../../utils/iconsSet";

function Card({
  ticket,
  userData,
  hideStatusIcon,
  hideProfileIcon,
  hidePriorityIcon,
}: {
  ticket: Ticket;
  userData: User;
  hideStatusIcon: boolean;
  hideProfileIcon: boolean;
  hidePriorityIcon: boolean;
}) {
  return (
    <div className="card">
      <div className="top-container">
        <div className="ticket-id">{ticket.id}</div>
        {hideProfileIcon ? null : (
          <UserIcon name={userData.name} available={userData.available} />
        )}
      </div>
      <div className="middle-container">
        {hideStatusIcon ? null : getStatusIcon(ticket.status)}
        <div className="title" title={ticket.title}>
          {ticket.title}
        </div>
      </div>
      <div className="bottom-container">
        {hidePriorityIcon ? null : (
          <div className="more-icon-container">
            {getPriorityIconFromNumber(ticket.priority)}
          </div>
        )}
        {ticket.tag.map((t: string) => (
          <div key={t} className="tag-container">
            <div className="tag-icon"></div>
            <div className="tag-text">{t}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
