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
import { Link ,NavLink, Outlet} from 'react-router-dom';
import AddchartIcon from '@mui/icons-material/Addchart';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import { Typography,Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, Toolbar ,Box,AppBar,Drawer} from '@mui/material';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
const drawerWidth = 270;





function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

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

    const activeLinkStyle = {
        backgroundColor: '#f0f0f0', // or any color you prefer
        color: '#1976d2', // active color (blue for example)
    };

    const drawer = (




        <Box>
            <Typography  fontWeight="bold" ml={9} mt={3} color='primary'>People Pro</Typography>
           
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={NavLink} to="">
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
            </List>

            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="employees">
                        <ListItemIcon>
                            <GroupIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Employees" />
                    </ListItemButton>
                </ListItem>
            </List>

            {/* Core HR Submenu */}
            <List>
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
            </List>

            {/* Attendance Submenu */}
            <List>
                <ListItemButton onClick={() => handleSubMenuToggle('attendance')}>
                    <ListItemIcon>
                        <AddchartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                    {openSubMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSubMenu === 'attendance'} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }} component={Link} to="attendance/overview">
                            <ListItemIcon>
                              
                            </ListItemIcon>
                            <ListItemText primary="Attendance Overview" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component={Link} to="attendance/manual">
                            <ListItemIcon>
                              
                            </ListItemIcon>
                            <ListItemText primary="Manual Attendance" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }} component={Link} to="attendance/overtime">
                            <ListItemIcon>
                                
                            </ListItemIcon>
                            <ListItemText primary="Overtime Request" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>


            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="finance">
                        <ListItemIcon>
                            <CardTravelIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Finance" />
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="tasks">
                        <ListItemIcon>
                            <AssignmentIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Tasks" />
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="projects">
                        <ListItemIcon>
                            <AccountTreeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Projects" />
                    </ListItemButton>
                </ListItem>
            </List>

            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="manageClinets">
                        <ListItemIcon>
                            <RecordVoiceOverIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Manage Clinets" />
                    </ListItemButton>
                </ListItem>
            </List>

            
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="leads">
                        <ListItemIcon>
                            <RecordVoiceOverIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Leads" />
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="leaverequest">
                        <ListItemIcon>
                            <RecordVoiceOverIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Leave Request" />
                    </ListItemButton>
                </ListItem>
            </List>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="payroll">
                        <ListItemIcon>
                            <RecordVoiceOverIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Payroll" />
                    </ListItemButton>
                </ListItem>
            </List>
           
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
                    bgcolor:"#1c232f",
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

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
                <Outlet/>

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

