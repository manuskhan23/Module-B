import React, { useState } from 'react';
import {
    Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton,
    ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse
} from '@mui/material';
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    School as SchoolIcon,
    Book as BookIcon,
    Class as ClassIcon,
    AttachMoney as MoneyIcon,
    Assignment as AssignmentIcon,
    ExpandLess, ExpandMore,
    Logout
} from '@mui/icons-material';
import { useNavigate, Outlet } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';

const drawerWidth = 240;

const DashboardLayout = () => {
    const { user } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        {
            text: 'Students',
            icon: <PeopleIcon />,
            subItems: [
                { text: 'Student List', path: '/students/list' },
                { text: 'Add Student', path: '/students/add' },
                { text: 'Transfer Student', path: '/students/transfer' }
            ]
        },
        {
            text: 'Teachers',
            icon: <SchoolIcon />,
            subItems: [
                { text: 'Teacher List', path: '/teachers/list' },
                { text: 'Add Teacher', path: '/teachers/add' },
                { text: 'Allocation', path: '/teachers/allocation' }
            ]
        },
        {
            text: 'Subjects',
            icon: <BookIcon />,
            subItems: [
                { text: 'Subject List', path: '/subjects/list' },
                { text: 'Add Subject', path: '/subjects/add' }
            ]
        },
        {
            text: 'Syllabus',
            icon: <AssignmentIcon />,
            subItems: [
                { text: 'Syllabus List', path: '/syllabus/list' },
                { text: 'Create Syllabus', path: '/syllabus/add' }
            ]
        },
        {
            text: 'Class',
            icon: <ClassIcon />,
            subItems: [
                { text: 'Class List', path: '/class/list' },
                { text: 'Add Class', path: '/class/add' }
            ]
        },
        {
            text: 'Fees',
            icon: <MoneyIcon />,
            subItems: [
                { text: 'Fee Structure', path: '/fees/structure' },
                { text: 'Fee Submission', path: '/fees/submission' },
                { text: 'Fee Voucher', path: '/fees/voucher' }
            ]
        }
    ];

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6" noWrap component="div" color="primary" fontWeight="bold">
                    LMS ADMIN
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {menuItems.map((item) => (
                    <React.Fragment key={item.text}>
                        {item.subItems ? (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => toggleMenu(item.text)}>
                                        <ListItemIcon color="primary">{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                        {openMenus[item.text] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                </ListItem>
                                <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.subItems.map((sub) => (
                                            <ListItemButton key={sub.text} sx={{ pl: 4 }} onClick={() => navigate(sub.path)}>
                                                <ListItemText primary={sub.text} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </>
                        ) : (
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => navigate(item.path)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        )}
                    </React.Fragment>
                ))}
                <Divider />
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon><Logout /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
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
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Learning Management System
                    </Typography>
                    {user && (
                        <Typography variant="body1" sx={{ mr: 2 }}>
                            Welcome, {user.displayName || user.email}
                        </Typography>
                    )}
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
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
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
