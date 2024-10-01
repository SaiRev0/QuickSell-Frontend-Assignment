import { Ticket, User } from "../types/interfaces";

const groupTickets = (
  tickets: Ticket[],
  keyFn: (t: Ticket) => string,
  initialGroups: Record<string, Ticket[]> = {}
) => {
  return tickets.reduce((groups, ticket) => {
    const key = keyFn(ticket);
    (groups[key] = groups[key] || []).push(ticket);
    return groups;
  }, initialGroups);
};

export const groupTicketsByStatus = (tickets: Ticket[]) =>
  groupTickets(tickets, (t) => t.status, {
    Backlog: [],
    Todo: [],
    "In progress": [],
    Done: [],
    Canceled: [],
  });

export const groupTicketsByPriority = (tickets: Ticket[]) =>
  groupTickets(tickets, (t) => getPriorityLabel(t.priority), {
    "No priority": [],
    Urgent: [],
    High: [],
    Medium: [],
    Low: [],
  });

export const groupTicketsByUserId = (tickets: Ticket[]) =>
  groupTickets(tickets, (t) => t.userId);

export const mapUsersByUserId = (users: User[]) =>
  users.reduce((acc, user) => ({ ...acc, [user.id]: user }), {});

const getPriorityLabel = (priority: number) =>
  ["No priority", "Urgent", "High", "Medium", "Low"][priority] || "NA";

const orderTickets = (
  tickets: Ticket[],
  orderFn: (a: Ticket, b: Ticket) => number
) => [...tickets].sort(orderFn);

const orderByPriority = (a: Ticket, b: Ticket) => b.priority - a.priority;
const orderByTitle = (a: Ticket, b: Ticket) => a.title.localeCompare(b.title);

export const loadGrid = (
  tickets: Ticket[],
  grouping: string,
  ordering: string
) => {
  const orderedTickets = orderTickets(
    tickets,
    ordering === "priority" ? orderByPriority : orderByTitle
  );
  const groupFn =
    {
      status: groupTicketsByStatus,
      priority: groupTicketsByPriority,
      user: groupTicketsByUserId,
    }[grouping] || groupTicketsByUserId;

  return groupFn(orderedTickets);
};
