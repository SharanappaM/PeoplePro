import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import { Link,  Outlet, useNavigate } from 'react-router-dom';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import {  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Toolbar, Box, AppBar, Drawer,  Tooltip, Avatar,  styled } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
const drawerWidth = 270;
import logo from "../../assets/Logo.png"
import { CalendarMonthOutlined, Logout } from '@mui/icons-material';
import "./../../App.css"
import "./../../index.css"
import axios from 'axios';



function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [role1, setRole1] = React.useState(null)
    const [email, setEmail] = React.useState(null)

    axios.defaults.withCredentials = true

    const navigate = useNavigate()




    

    React.useEffect(() => {
        const role11 = localStorage.getItem("role")
        const email1 = localStorage.getItem("email")
        setRole1(role11)
        setEmail(email1)

    }, [])

    const handleLogout = ()=>{
        axios.get(`${import.meta.env.VITE_APP_SERVER_URL}/auth/logout`)
        .then(res=>{
           
          if(res.data.Status){
            localStorage.removeItem("valid")
         
            navigate("/")

    
          }
         
          
        }).catch(err=>{
          console.log(err);
          
        })
      }


    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const [openSubMenu, setOpenSubMenu] = React.useState(null);

    const handleSubMenuToggle = (menu) => {
        // Toggle the submenu: open the clicked one or close it if it's already open
        setOpenSubMenu((prevState) => (prevState === menu ? null : menu));
    };


    // State for active menu item
    const [activeMenu, setActiveMenu] = React.useState("");

    // Handle active menu item
    const handleMenuClick = (menuName) => {
        setActiveMenu(menuName);
    };


    const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
        borderRadius: active ? "12px" : "0px",
        backgroundColor: active ? theme.palette.secondary.main : "transparent",
        color: active ? "white" : theme.palette.text.primary,
        transition: "all 0.3s ease-in-out",
        "&:hover": {
            backgroundColor: active ? theme.palette.secondary.dark : theme.palette.action.hover,
        },
    }));

    const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
        color: active ? "white" : theme.palette.text.primary,
    }));


    const drawer = (




        <Box height="100vh" bgcolor="primary.main" p={1}>
            {/* <Typography fontWeight="bold" ml={9} mt={3} color='#333'>TalentHub</Typography> */}
            <img width={200} style={{ marginLeft: 30 }} src={logo} alt="" />

            {
                role1 === "admin" && (
                    <Box >

                        <ListItem disablePadding>
                            <StyledListItemButton
                                onClick={() => handleMenuClick("home")}
                                active={activeMenu === "home" ? 1 : 0}
                                component={Link}
                                to=""
                            >
                                <StyledListItemIcon active={activeMenu === "home" ? 1 : 0}>
                                    <HomeIcon />
                                </StyledListItemIcon>
                                <ListItemText primary="Home" />
                            </StyledListItemButton>
                        </ListItem>

                        <ListItem disablePadding>


                            <StyledListItemButton
                                onClick={() => handleMenuClick("employees")}
                                active={activeMenu === "employees" ? 1 : 0}
                                component={Link}
                                to="employees"
                            >
                                <StyledListItemIcon active={activeMenu === "employees" ? 1 : 0}>
                                    <GroupIcon />
                                </StyledListItemIcon>
                                <ListItemText primary="Employees" />
                            </StyledListItemButton>
                        </ListItem>


                        {/* Core HR Submenu */}

                        <ListItemButton onClick={() => handleSubMenuToggle('coreHR')}>
                            <ListItemIcon>
                                <LaptopChromebookIcon />
                            </ListItemIcon>
                            <ListItemText primary="Core HR" />
                            {openSubMenu === 'coreHR' ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openSubMenu === 'coreHR'} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>


                                <StyledListItemButton
                                    onClick={() => handleMenuClick("core-hr/department")}
                                    active={activeMenu === "core-hr/department" ? 1 : 0}
                                    component={Link}
                                    to="core-hr/department"
                                >
                                    <StyledListItemIcon active={activeMenu === "core-hr/department" ? 1 : 0}>

                                    </StyledListItemIcon>
                                    <ListItemText primary="Department" />
                                </StyledListItemButton>

                                <StyledListItemButton
                                    onClick={() => handleMenuClick("core-hr/designation")}
                                    active={activeMenu === "core-hr/designation" ? 1 : 0}
                                    component={Link}
                                    to="core-hr/designation"
                                >
                                    <StyledListItemIcon active={activeMenu === "core-hr/designation" ? 1 : 0}>

                                    </StyledListItemIcon>
                                    <ListItemText primary="Designation" />
                                </StyledListItemButton>
                                <StyledListItemButton
                                    onClick={() => handleMenuClick("core-hr/org-chart")}
                                    active={activeMenu === "core-hr/org-chart" ? 1 : 0}
                                    component={Link}
                                    to="core-hr/org-chart"
                                >
                                    <StyledListItemIcon active={activeMenu === "core-hr/org-chart" ? 1 : 0}>

                                    </StyledListItemIcon>
                                    <ListItemText primary="Organization Chart" />
                                </StyledListItemButton>


                            </List>
                        </Collapse>




                        <ListItem disablePadding>

                            <StyledListItemButton
                                onClick={() => handleMenuClick("attendance/manual")}
                                active={activeMenu === "attendance/manual" ? 1 : 0}
                                component={Link}
                                to="attendance/manual"
                            >
                                <StyledListItemIcon active={activeMenu === "attendance/manual" ? 1 : 0}>
                                    <EventAvailableIcon />
                                </StyledListItemIcon>
                                <ListItemText primary="Attendance" />
                            </StyledListItemButton>
                        </ListItem>

                        <ListItem disablePadding>



                            <StyledListItemButton
                                onClick={() => handleMenuClick("tasks")}
                                active={activeMenu === "tasks" ? 1 : 0}
                                component={Link}
                                to="tasks"
                            >
                                <StyledListItemIcon active={activeMenu === "tasks" ? 1 : 0}>
                                    <AssignmentIcon />
                                </StyledListItemIcon>
                                <ListItemText primary="Tasks" />
                            </StyledListItemButton>
                        </ListItem>


                        <ListItem disablePadding>

                            <StyledListItemButton
                                onClick={() => handleMenuClick("projects")}
                                active={activeMenu === "projects" ? 1 : 0}
                                component={Link}
                                to="projects"
                            >
                                <StyledListItemIcon active={activeMenu === "projects" ? 1 : 0}>
                                    <AccountTreeIcon />
                                </StyledListItemIcon>
                                <ListItemText primary="Projects" />
                            </StyledListItemButton>
                        </ListItem>



                        <ListItem disablePadding>


                            <StyledListItemButton
                                onClick={() => handleMenuClick("manageClinets")}
                                active={activeMenu === "manageClinets" ? 1 : 0}
                                component={Link}
                                to="manageClinets"
                            >
                                <StyledListItemIcon active={activeMenu === "manageClinets" ? 1 : 0}>
                                    <RecordVoiceOverIcon />
                                </StyledListItemIcon>
                                <ListItemText primary="Manage Clinets" />
                            </StyledListItemButton>
                        </ListItem>

                        <ListItem disablePadding>


                            <StyledListItemButton
                                onClick={() => handleMenuClick("payroll")}
                                active={activeMenu === "payroll" ? 1 : 0}
                                component={Link}
                                to="payroll"
                            >
                                <StyledListItemIcon active={activeMenu === "payroll" ? 1 : 0}>
                                    <AccountBalanceWalletIcon />
                                </StyledListItemIcon>
                                <ListItemText primary="Payroll" />
                            </StyledListItemButton>
                        </ListItem>




                        <ListItem disablePadding>

                            <StyledListItemButton
                                onClick={() => handleMenuClick("leaverequest")}
                                active={activeMenu === "leaverequest" ? 1 : 0}
                                component={Link}
                                to="leaverequest"
                            >
                                <StyledListItemIcon active={activeMenu === "leaverequest" ? 1 : 0}>
                                    <MedicalServicesIcon />
                                </StyledListItemIcon>
                                <ListItemText primary="Leave Request" />
                            </StyledListItemButton>
                        </ListItem>

                    </Box>
                )
            }

            {
                role1 === "employee" && (
                    <Box>
                        <List>
                            <ListItem disablePadding>
                              
                                <StyledListItemButton
                                    onClick={() => handleMenuClick("home")}
                                    active={activeMenu === "home" ? 1 : 0}
                                    component={Link}
                                    to=""
                                >
                                    <StyledListItemIcon active={activeMenu === "home" ? 1 : 0}>
                                        <HomeIcon />
                                    </StyledListItemIcon>
                                    <ListItemText primary="Home" />
                                </StyledListItemButton>
                            </ListItem>
                        </List>

                        <List>
                            <ListItem disablePadding>

                                <StyledListItemButton
                                    onClick={() => handleMenuClick("emplyoeeAttendance")}
                                    active={activeMenu === "emplyoeeAttendance" ? 1 : 0}
                                    component={Link}
                                    to="emplyoeeAttendance"
                                >
                                    <StyledListItemIcon active={activeMenu === "emplyoeeAttendance" ? 1 : 0}>
                                        <CalendarMonthOutlined />
                                      
                                    </StyledListItemIcon>
                                    <ListItemText primary="Attendance" />
                                </StyledListItemButton>
                            </ListItem>
                        </List>




                        <List>
                            <ListItem disablePadding>

                                <StyledListItemButton
                                    onClick={() => handleMenuClick("employeeTasks")}
                                    active={activeMenu === "employeeTasks" ? 1 : 0}
                                    component={Link}
                                    to="employeeTasks"
                                >
                                    <StyledListItemIcon active={activeMenu === "employeeTasks" ? 1 : 0}>
                                        <AssignmentIcon />
                                    </StyledListItemIcon>
                                    <ListItemText primary="Task" />
                                </StyledListItemButton>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem disablePadding>

                                <StyledListItemButton
                                    onClick={() => handleMenuClick("emplyoeeProjects")}
                                    active={activeMenu === "emplyoeeProjects" ? 1 : 0}
                                    component={Link}
                                    to="emplyoeeProjects"
                                >
                                    <StyledListItemIcon active={activeMenu === "emplyoeeProjects" ? 1 : 0}>
                                        <AccountTreeIcon />
                                    </StyledListItemIcon>
                                    <ListItemText primary="Projects" />
                                </StyledListItemButton>
                            </ListItem>
                        </List>

                        <List>
                            <ListItem disablePadding>

                                <StyledListItemButton
                                    onClick={() => handleMenuClick("employeeLeaveRequest")}
                                    active={activeMenu === "employeeLeaveRequest" ? 1 : 0}
                                    component={Link}
                                    to="employeeLeaveRequest"
                                >
                                    <StyledListItemIcon active={activeMenu === "employeeLeaveRequest" ? 1 : 0}>
                                        <MedicalServicesIcon />
                                    </StyledListItemIcon>
                                    <ListItemText primary="Leave Request" />
                                </StyledListItemButton>
                            </ListItem>
                        </List>





                    </Box>
                )
            }

        </Box>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    bgcolor: "secondary.main",
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{
                    display: "flex",
                    alignSelf: "end"
                }}>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>



                    <Tooltip title="Logout">
                        <IconButton >
                            <Logout sx={{
                                color: "white",
                                mr:3,
                                fontSize:"28px"

                            }} onClick={() => {
                                navigate("/")
                                localStorage.removeItem("adminData")
                                localStorage.removeItem("employeeData")
                                localStorage.removeItem("role")
                                handleLogout()
                            }}>Logout</Logout>
                        </IconButton>
                    </Tooltip>



                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>

                        <Tooltip title="Account settings" component={Link} to="profilePage">
                            
                             <Avatar src="/broken-image.jpg" />
                        </Tooltip>
                    </Box>

                 

                </Toolbar>


            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box p={2} bgcolor="#f8f9fa" minHeight="100vh" minWidth="82.4vw">
                <Toolbar />
                <Outlet />

            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default Dashboard;














