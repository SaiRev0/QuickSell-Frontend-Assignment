import noPriority from "../assets/No-priority.svg";
import lowPriority from "../assets/Img - Low Priority.svg";
import mediumPriority from "../assets/Img - Medium Priority.svg";
import highPriority from "../assets/Img - High Priority.svg";
import urgentPriority from "../assets/SVG - Urgent Priority colour.svg";
import urgentPriorityGrey from "../assets/SVG - Urgent Priority grey.svg";

import backlog from "../assets/Backlog.svg";
import todo from "../assets/To-do.svg";
import inProgress from "../assets/in-progress.svg";
import done from "../assets/Done.svg";
import canceled from "../assets/Cancelled.svg";

export const getPriorityIcon = (priority: string) => {
  switch (priority) {
    case "No priority":
      return <img src={noPriority} alt="No priority" />;
    case "Low":
      return <img src={lowPriority} alt="Low" />;
    case "Medium":
      return <img src={mediumPriority} alt="Medium" />;
    case "High":
      return <img src={highPriority} alt="High" />;
    case "Urgent":
      return <img src={urgentPriority} alt="Urgent" />;
    default:
      return <img src={noPriority} alt="No priority" />;
  }
};

export const getPriorityIconFromNumber = (priority: number) => {
  switch (priority) {
    case 0:
      return <img src={noPriority} alt="No priority" />;
    case 1:
      return <img src={lowPriority} alt="Low" />;
    case 2:
      return <img src={mediumPriority} alt="Medium" />;
    case 3:
      return <img src={highPriority} alt="High" />;
    case 4:
      return <img src={urgentPriorityGrey} alt="Urgent" />;
    default:
      return <img src={noPriority} alt="No priority" />;
  }
};

export const getStatusIcon = (priority: string) => {
  switch (priority) {
    case "Backlog":
      return <img src={backlog} alt="backlog" />;
    case "Todo":
      return <img src={todo} alt="todo" />;
    case "In progress":
      return <img src={inProgress} alt="in progress" />;
    case "Done":
      return <img src={done} alt="done" />;
    case "Canceled":
      return <img src={canceled} alt="canceled" />;
    default:
      return <img src={todo} alt="todo" />;
  }
};
