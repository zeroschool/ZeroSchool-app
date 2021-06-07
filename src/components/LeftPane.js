import React from "react";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button
} from "@material-ui/core";

export default function LeftPane(props) {
  const open = props.open;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Drawer
      container={container}
      variant="temporary"
      anchor="left"
      open={open}
      onClose=""
    >
      <div>
        <div />
        <Divider />
        <div></div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon></ListItemIcon>
            <ListItemText></ListItemText>
          </ListItem>
        </List>
        <Divider />
        <Button variant="filled">Create Post</Button>
      </div>
    </Drawer>
  );
}
