import { Avatar, Stack, Typography } from "@mui/material";

function UserChat({ message, time, user }) {
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={user} src="/static/images/avatar/1.jpg" sx={{
      backgroundColor:"#00000000",
      }}/>
      <Typography variant="h6">{message}</Typography>
      <Typography variant="caption">{time.split(",")[1]}</Typography>
    </Stack>
  );
}
export default UserChat;
