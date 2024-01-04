import {
  Avatar,
  Button,
  Divider,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import logo from "./logo.svg";
import UserChat from "./userChat";
import BotResponse from "./botResponse";
const { useState } = require("react");

function ChatPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listOfMessages, setListOfMessages] = useState([]);
  const [message, setMessage] = useState("");
  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: "localhost:3000",
        "Allow-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: message,
      }),
    };
    fetch("http://localhost:3000/tasks", options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setListOfMessages([
          ...listOfMessages,
          { data: message, type: "human", time: new Date().toLocaleString() },
          {data:data.data, type: "Bot", time: new Date().toLocaleString()},
        ]);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        // setMessage("");
        setIsLoading(false);
      });
  };

  return (
    <div>
      {!isLoading && (
        <Stack direction="column" spacing={2} sx={{ margin: "16px" }}>
          <Stack direction="row" spacing={2}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Typography variant="h6">Remy Sharp</Typography>
          </Stack>
          <Divider variant="middle" />
          <Stack direction="column" spacing={2} divider={<Divider flexItem />}>
            {listOfMessages.map((message) => {
              if (message.type === "human") {
                return (
                  <UserChat
                    message={message.data}
                    time={message.time}
                    user="Remy Sharp"
                  />
                );
              } else {
                return (
                  <BotResponse
                    message={message.data}
                    time={message.time}
                    user="Remy Sharp"
                  />
                );
              }
            })}
          </Stack>

          <Divider variant="middle" />
          <Stack
            direction="row"
            spacing={2}
            sx={{ position: "fixed", bottom: "0px", width: "95%" }}
          >
            <TextField
              label="How can I help you?"
              variant="outlined"
              placeholder="Type your message here"
              fullWidth
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              InputLabelProps={{
                style: {
                  color: "#cdab6cA0",
                  borderColor: "#cdab6cA0",
                },
              }}
              InputProps={{
                style: {
                  color: "#cdab6c",
                  borderColor: "#cdab6cA0",
                },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#cdab6c",
                  }
                }
              }}
              style={{
                borderColor: "#cdab6cA0",
                color: "#cdab6cA0",
                input: {
                  color: "#cdab6cA0",
                },
              }}
            />
            <Button
              variant="contained"
              disabled={message.length === 0}
              onClick={() => {
                setListOfMessages([...listOfMessages, message]);
                sendRequest();
              }}
              sx={{
                "&.Mui-disabled": {
                  backgroundColor: "#cdab6cA0",
                  color: "#1d2122",
                },
                backgroundColor: "#cdab6c",
                color: "#1d2122",
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      )}
      {isLoading && <img src={logo} className="App-logo" alt="logo" />}
    </div>
  );
}

export default ChatPage;
