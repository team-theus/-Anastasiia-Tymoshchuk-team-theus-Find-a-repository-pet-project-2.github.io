import "./App.css";
import * as Unicons from "@iconscout/react-unicons";
import { useState } from "react";

function App() {
  const [tickets, setTickets] = useState([]);

  function onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.title;
    const newTickObj = {
      id: tickets.length + 1,
      title: input.value,
      done: false,
      list: [],
    };
    const newTicket = [...tickets, newTickObj];
    setTickets(newTicket);
    form.reset();
  }

  const [items, setItems] = useState([]);

  const addItem = (index) => (event) => {
    event.preventDefault();
    const form = event.target;
    const input = form.item;
    const newTickItem = {
      id: items.length + 1,
      item: input.value,
      it_done: false,
    };
    setItems([...items, newTickItem]);
    form.reset();
    tickets[index].list.push(newTickItem);
  };

  const markDone = (index) => {
    let newTicket = tickets.map((ticket) => {
      if (ticket.id === index) {
        return { ...ticket, done: !ticket.done };
      }
      return ticket;
    });
    setTickets(newTicket);
  };

  const deleteTicket = (index) => {
    let newTicket = tickets.filter((ticket) => ticket.id !== index);
    setTickets(newTicket);
  };

  const deleteTask = (idTicket, idTask) => {
    let objIndex = tickets.findIndex((ticket) => ticket.id === idTicket);

    const newList = tickets[objIndex].list.filter((obj) => {
      return obj.id !== idTask;
    });

    setTickets(
      tickets.map((ticket) =>
        ticket.id === idTicket ? { ...ticket, list: newList } : ticket
      )
    );
  };

  return (
    <div className="block min-h-screen blue_bg p-10">
      <div className="flex justify-center ">
        <form onSubmit={onSubmit} className="flex justify-center ">
          <input
            className="p-3 text-gray-800 rounded-lg w-64 outline-none shadow-sm"
            type="text"
            name="title"
            placeholder="Add new ticket"
            required
          />
          <button className="-ml-9 p-1 cursor-pointer">
            <Unicons.UilPlus size="22" color="#4285f4" />
          </button>
        </form>
      </div>
      <div className="grid sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-6 pt-9 ">
        {tickets
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((ticket, index) => (
            <div className="bg-white p-4 mb-8 block max-w-sm relative rounded-lg shadow-lg">
              <h2 className="pb-2 ticket_title">{ticket.title}</h2>

              {ticket.done ? null : (
                <form
                  className="flex justify-between content-center mt-2"
                  onSubmit={addItem(index)}
                >
                  <button className="cursor-pointer">
                    <Unicons.UilPlus size="22" color="#4285f4" />
                  </button>
                  <input
                    className="block p-1 ml-2 w-full add_task outline-none "
                    type="text"
                    name="item"
                    placeholder="Add a task"
                    required
                  />
                </form>
              )}
              {ticket.list.length === 0 ? (
                <p className="flex justify-center pt-2 text-gray-400">
                  The list is empty...
                </p>
              ) : (
                <br />
              )}
              <ul>
                {ticket.list.map((task) => (
                  <li className="flex justify-between list_item pl-3">
                    <span className="task_name">{task.item}</span>
                    <button
                      onClick={() => deleteTask(ticket.id, task.id)}
                      className="delete cursor-pointer"
                    >
                      <Unicons.UilTimes size="20" color="#62656a" />
                    </button>
                  </li>
                ))}
              </ul>
              <br />
              <br />
              <div className="flex justify-end absolute bottom-4 right-4 ">
                <button
                  onClick={() => deleteTicket(ticket.id)}
                  className="hover:bg-gray-200 rounded-md"
                >
                  <Unicons.UilTrashAlt size="22" color="#62656a" />
                </button>

                {ticket.done === false ? (
                  <button
                    onClick={() => markDone(ticket.id)}
                    className="ml-2 hover:bg-gray-200 rounded-md"
                  >
                    <Unicons.UilCheck size="26" color="#4285f4" />
                  </button>
                ) : (
                  <button
                    onClick={() => markDone(ticket.id)}
                    className="ml-2 hover:bg-gray-200  rounded-md"
                  >
                    <Unicons.UilPen size="22" color="#62656a" />
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
