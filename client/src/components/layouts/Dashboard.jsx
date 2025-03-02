import * as React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AddchartIcon from '@mui/icons-material/Addchart';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import { Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Toolbar, Box, AppBar, Drawer, Button, Tooltip, Avatar, Menu, MenuItem } from '@mui/material';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
const drawerWidth = 270;
import logo from "../../assets/Logo.png"




function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const [role1, setRole1] = React.useState(null)
    const [email, setEmail] = React.useState(null)

    const navigate = useNavigate()







    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
       
    };









    React.useEffect(() => {
        const role11 = localStorage.getItem("role")
        const email1 = localStorage.getItem("email")
        setRole1(role11)
        setEmail(email1)

    }, [])
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



    const drawer = (




        <Box height="100vh" bgcolor="primary.main">
            {/* <Typography fontWeight="bold" ml={9} mt={3} color='#333'>TalentHub</Typography> */}
            <img width={200} style={{marginLeft:30}} src={logo} alt="" />

            {
                role1 === "admin" && (
                    <Box >
                    
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to="" >
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </ListItem>
                     
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="employees" >
                                    <ListItemIcon>
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Employees" />
                                </ListItemButton>
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
                                    <ListItemButton sx={{ pl: 4 }} component={Link} to="core-hr/department">
                                        <ListItemIcon>

                                        </ListItemIcon>
                                        <ListItemText primary="Department" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }} component={Link} to="core-hr/designation">
                                        <ListItemIcon>

                                        </ListItemIcon>
                                        <ListItemText primary="Designation" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }} component={Link} to="core-hr/org-chart">
                                        <ListItemIcon>

                                        </ListItemIcon>
                                        <ListItemText primary="Organization Chart" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                    

                       

                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="attendance/manual">
                                    <ListItemIcon>
                                        <CardTravelIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Attendance" />
                                </ListItemButton>
                            </ListItem>
                       
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="tasks">
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Tasks" />
                                </ListItemButton>
                            </ListItem>
                        
                     
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="projects">
                                    <ListItemIcon>
                                        <AccountTreeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Projects" />
                                </ListItemButton>
                            </ListItem>
                       

                     
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="manageClinets">
                                    <ListItemIcon>
                                        <RecordVoiceOverIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Manage Clinets" />
                                </ListItemButton>
                            </ListItem>
                      
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="payroll">
                                    <ListItemIcon>
                                        <AccountBalanceWalletIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Payroll" />
                                </ListItemButton>
                            </ListItem>
                     


                     
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="leaverequest">
                                    <ListItemIcon>
                                        <MedicalServicesIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Leave Request" />
                                </ListItemButton>
                            </ListItem>
                    
                    </Box>
                )
            }

            {
                role1 === "employee" && (
                    <Box>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton component={NavLink} to="">
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </ListItem>
                        </List>

                        <List>
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="emplyoeeAttendance">
                                    <ListItemIcon>
                                        <GroupIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Attendance" />
                                </ListItemButton>
                            </ListItem>
                        </List>




                        <List>
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="employeeTasks">
                                    <ListItemIcon>
                                        <AssignmentIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Tasks" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="emplyoeeProjects">
                                    <ListItemIcon>
                                        <AccountTreeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Projects" />
                                </ListItemButton>
                            </ListItem>
                        </List>

                        <List>
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="employeeLeaveRequest">
                                    <ListItemIcon>
                                        <RecordVoiceOverIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Leave Request" />
                                </ListItemButton>
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
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>



                    <Button onClick={() => {
                        navigate("/")
                        localStorage.removeItem("adminData")
                        localStorage.removeItem("employeeData")
                        localStorage.removeItem("role")
                    }}>Logout</Button>

                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>

                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        slotProps={{
                            paper: {
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&::before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {/* <MenuItem onClick={handleClose} >
                            <Avatar /> Profile
                        </MenuItem> */}
                        <ListItemButton component={Link} to="profilePage">
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>


                        <MenuItem onClick={handleClose}>
                            <Avatar /> My account
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                {/* <PersonAdd fontSize="small" /> */}+
                            </ListItemIcon>
                            Add another account
                        </MenuItem>


                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                {/* <Settings fontSize="small" /> */}-
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                {/* <Logout fontSize="small" /> */} *
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>

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
















// Attendance Submenu
// <List>
//     <ListItemButton onClick={() => handleSubMenuToggle('attendance')}>
//         <ListItemIcon>
//             <AddchartIcon />
//         </ListItemIcon>
//         <ListItemText primary="Attendance" />
//         {openSubMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//     </ListItemButton>
//     <Collapse in={openSubMenu === 'attendance'} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
            
//             <ListItemButton sx={{ pl: 4 }} component={Link} to="attendance/manual">
//                 <ListItemIcon>

//                 </ListItemIcon>
//                 <ListItemText primary="Manual Attendance" />
//             </ListItemButton>
//             <ListItemButton sx={{ pl: 4 }} component={Link} to="attendance/overtime">
//                 <ListItemIcon>

//                 </ListItemIcon>
//                 <ListItemText primary="Overtime Request" />
//             </ListItemButton>
//         </List>
//     </Collapse>
// </List>



// <List>
//                 <ListItem disablePadding>
//                     <ListItemButton component={Link} to="leads">
//                         <ListItemIcon>
//                             <RecordVoiceOverIcon/>
//                         </ListItemIcon>
//                         <ListItemText primary="Leads" />
//                     </ListItemButton>
//                 </ListItem>
//             </List>