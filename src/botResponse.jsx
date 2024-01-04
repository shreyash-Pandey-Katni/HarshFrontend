import { SmartToy } from "@mui/icons-material";
import { Avatar, Icon, Stack, Typography } from "@mui/material";

function BotResponse({ message, time, user }) {
  return (
    <Stack direction="row" spacing={2} justifyContent="right">
      <Typography variant="caption">{time.split(",")[1]}</Typography>
      <Typography variant="h6">{message}</Typography>
      <Avatar alt="Bot" src="/static/images/avatar/1.jpg" sx={{
        backgroundColor:"#00000000"
      }}>
        <Icon>
            <SmartToy />
            </Icon>
            </Avatar>
    </Stack>
  );
}
export default BotResponse;
