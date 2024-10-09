import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import {
  Logout,
  MenuBook,
  History,
  RestaurantMenu,
  Analytics,
} from "@mui/icons-material";
import logo from "../assets/image/logo_dashboard.png";
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import grabfood from "../assets/image/grabfood.png";

interface SidebarProps {
  children: ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const location = useLocation();
  const menuItems = [
    { text: "Menu", icon: <RestaurantMenu />, path: "/" },
    { text: "My Order", icon: <MenuBook />, path: "/my-order" },
    { text: "History Order", icon: <History />, path: "/history-order" },
    { text: "Statistic", icon: <Analytics />, path: "/statistic" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#00B14F",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <Toolbar
            sx={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={logo} alt="grab" style={{ width: 100 }} />
          </Toolbar>
          <List>
            {menuItems.map((item, index) => (
              <ListItem
                component={Link}
                to={item.path}
                key={index}
                sx={{
                  backgroundColor:
                    location.pathname === item.path ? "#002E27" : "transparent",
                  border: "none",
                  color: "white",
                  ":hover": { backgroundColor: "#002E27" },
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <List>
            <ListItem
              component="button"
              sx={{
                backgroundColor: "transparent",
                border: "none",
                color: "white",
                ":hover": { backgroundColor: "#002E27" },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <img src={grabfood} alt="grabfood" style={{ width: 200 }} />
          </Box>
        </Toolbar>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
