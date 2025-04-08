import React, { useState } from "react";
import classes from "./Chat.module.css";
import { useTheme } from "../../useContext";

const Chat = () => {
  const { theme } = useTheme();
  interface chatMessage {
    id: number;
    sender: string;
    receiver: string;
    message: string;
  }

  interface chatProps {
    id: number;
    name: string;
    messages: chatMessage[];
  }
  const peopleList: chatProps[] = [
    {
      id: 1,
      name: "MohMohAung",
      messages: [],
    },
    {
      id: 2,
      name: "MgMg",
      messages: [],
    },
    {
      id: 3,
      name: "MaMa",
      messages: [],
    },
    {
      id: 4,
      name: "PaPa",
      messages: [],
    },
    {
      id: 5,
      name: "MoM",
      messages: [],
    },
  ];

  const [people, setPeople] = useState<chatProps[]>(peopleList);
  const [activeUser, setActiveUser] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [show, setShow] = useState(false);
  const adminName = "Admin";

  const handleClose = () => {
    setShow(false);
    setActiveUser(null);
  };
  const handleSendMessage = () => {
    if (activeUser === null || newMessage.trim() === "") return;
    const newChat: chatMessage = {
      id: Date.now(),
      sender: adminName,
      receiver: people.find((user) => user.id === activeUser)?.name || "",
      message: newMessage,
    };

    setPeople((prv) =>
      prv.map((user) =>
        user.id === activeUser
          ? { ...user, messages: [...user.messages, newChat] }
          : user
      )
    );

    setNewMessage("");
  };

  return (
    <div className={classes.chatCol}>
      <div className={classes.chatCol1}>
        <h1 className={classes.title}>Chat List</h1>
        <div className={classes.chatCol2}>
          {people.map((item, index) => (
            <div key={index} className={classes.chatCol3}>
              <p
                onClick={() => {
                  setActiveUser(item.id);
                  setShow(true);
                }}
              >
                {item.name}
              </p>{" "}
            </div>
          ))}
        </div>
        {show && (
          <div className={classes.chatCol4}>
            {activeUser !== null && (
              <div
                className={classes.chatCol5}
                style={{ background: theme.primaryColor }}
              >
                <div className={classes.chatCol6}>
                  <h1
                    className={classes.chatTitle}
                    style={{ color: theme.textColor }}
                  >
                    {people.find((p) => p.id === activeUser)?.name}
                  </h1>
                  <button onClick={handleClose} className={classes.closeButton}>
                    Close
                  </button>
                </div>

                <div className={classes.messageContainer}>
                  {people
                    .find((p) => p.id === activeUser)
                    ?.messages.map((msg) => (
                      <div className={classes.message}>
                        <strong style={{ color: theme.textColor }}>
                          {msg.sender}
                        </strong>
                        <p
                          className={classes.textMessage}
                          style={{ color: theme.textColor }}
                        >
                          {" "}
                          {msg.message}
                        </p>
                      </div>
                    ))}
                </div>
                <div className={classes.sendList}>
                  {" "}
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button
                    onClick={handleSendMessage}
                    className={classes.sendButton}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
