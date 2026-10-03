import { useEffect, useState } from "react";

import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";

import {
    AccountCircleRounded,
    BusinessRounded,
    CalendarMonthRounded,
    CloseRounded,
    DashboardRounded,
    HomeRounded,
    LoginRounded,
    LogoutRounded,
    MenuRounded,
    PersonRounded,
    WorkRounded,
    AssignmentRounded,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";


// =====================================================
// NAVBAR
// =====================================================

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [mobileOpen, setMobileOpen] =
        useState(false);

    const [anchorEl, setAnchorEl] =
        useState(null);

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("user")
            );
        } catch {
            return null;
        }
    });


    // =====================================================
    // SYNC LOGIN STATE
    // =====================================================

    useEffect(() => {
        const syncAuth = () => {
            const storedToken =
                localStorage.getItem("token");

            let storedUser = null;

            try {
                storedUser = JSON.parse(
                    localStorage.getItem("user")
                );
            } catch {
                storedUser = null;
            }

            setToken(storedToken);
            setUser(storedUser);
        };

        syncAuth();

        window.addEventListener(
            "storage",
            syncAuth
        );

        window.addEventListener(
            "auth-change",
            syncAuth
        );

        return () => {
            window.removeEventListener(
                "storage",
                syncAuth
            );

            window.removeEventListener(
                "auth-change",
                syncAuth
            );
        };
    }, []);


    // =====================================================
    // HELPERS
    // =====================================================

    const isLoggedIn = Boolean(token);

    const role =
        user?.role ||
        user?.userRole ||
        "";


    const normalizedRole =
        String(role).toLowerCase();


    const isStudent =
        normalizedRole === "student";


    const isCompany =
        normalizedRole === "company";


    const isAdmin =
        normalizedRole === "admin";


    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }

        return (
            location.pathname === path ||
            location.pathname.startsWith(
                `${path}/`
            )
        );
    };


    const getInitials = () => {
        const name =
            user?.name ||
            user?.fullName ||
            user?.username ||
            "";

        if (!name) {
            return "U";
        }

        const parts = name
            .trim()
            .split(" ")
            .filter(Boolean);

        if (parts.length === 1) {
            return parts[0]
                .charAt(0)
                .toUpperCase();
        }

        return (
            parts[0].charAt(0) +
            parts[parts.length - 1].charAt(0)
        ).toUpperCase();
    };


    // =====================================================
    // NAVIGATION
    // =====================================================

    const goTo = (path) => {
        setMobileOpen(false);
        setAnchorEl(null);

        navigate(path);
    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);

        setMobileOpen(false);
        setAnchorEl(null);

        window.dispatchEvent(
            new Event("auth-change")
        );

        navigate("/login", {
            replace: true,
        });
    };


    // =====================================================
    // PUBLIC NAVIGATION
    // =====================================================

    const publicLinks = [
        {
            label: "Home",
            path: "/",
            icon: <HomeRounded />,
        },
        {
            label: "Jobs",
            path: "/jobs",
            icon: <WorkRounded />,
        },
        {
            label: "Companies",
            path: "/companies",
            icon: <BusinessRounded />,
        },
    ];


    // =====================================================
    // STUDENT NAVIGATION
    // =====================================================

    const studentLinks = [
        {
            label: "Dashboard",
            path: "/student-dashboard",
            icon: <DashboardRounded />,
        },
        {
            label: "My Applications",
            path: "/my-applications",
            icon: <AssignmentRounded />,
        },
        {
            label: "Calendar",
            path: "/calendar",
            icon: <CalendarMonthRounded />,
        },
        {
            label: "Profile",
            path: "/profile",
            icon: <PersonRounded />,
        },
    ];


    // =====================================================
    // COMPANY NAVIGATION
    // =====================================================

    const companyLinks = [
        {
            label: "Dashboard",
            path: "/company-dashboard",
            icon: <DashboardRounded />,
        },
        {
            label: "Profile",
            path: "/profile",
            icon: <PersonRounded />,
        },
    ];


    // =====================================================
    // ADMIN NAVIGATION
    // =====================================================

    const adminLinks = [
        {
            label: "Dashboard",
            path: "/admin-dashboard",
            icon: <DashboardRounded />,
        },
        {
            label: "Profile",
            path: "/profile",
            icon: <PersonRounded />,
        },
    ];


    let privateLinks = [];

    if (isStudent) {
        privateLinks = studentLinks;
    } else if (isCompany) {
        privateLinks = companyLinks;
    } else if (isAdmin) {
        privateLinks = adminLinks;
    }


    // =====================================================
    // DESKTOP LINK
    // =====================================================

    const DesktopNavButton = ({
        link,
    }) => (
        <Button
            onClick={() =>
                goTo(link.path)
            }
            startIcon={link.icon}
            sx={{
                color: isActive(link.path)
                    ? "#4F46E5"
                    : "#475569",

                fontWeight: isActive(
                    link.path
                )
                    ? 800
                    : 600,

                borderRadius: 2.5,
                px: 1.5,
                py: 1,

                minWidth: "auto",

                position: "relative",

                "&:hover": {
                    backgroundColor:
                        "#EEF2FF",
                    color: "#4F46E5",
                },

                "&::after": {
                    content: '""',
                    position:
                        "absolute",
                    left: "14px",
                    right: "14px",
                    bottom: 3,
                    height: 2,
                    borderRadius: 2,
                    backgroundColor:
                        "#4F46E5",

                    transform:
                        isActive(
                            link.path
                        )
                            ? "scaleX(1)"
                            : "scaleX(0)",

                    transition:
                        "transform 0.2s ease",
                },
            }}
        >
            {link.label}
        </Button>
    );


    // =====================================================
    // MOBILE DRAWER
    // =====================================================

    const MobileDrawer = () => (
        <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={() =>
                setMobileOpen(false)
            }
            PaperProps={{
                sx: {
                    width: {
                        xs: "85%",
                        sm: 360,
                    },
                    maxWidth: 360,
                    p: 2,
                },
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    px: 1,
                    mb: 1,
                }}
            >
                <Typography
                    fontWeight={900}
                    fontSize="1.2rem"
                >
                    CareerForge
                </Typography>

                <IconButton
                    onClick={() =>
                        setMobileOpen(false)
                    }
                >
                    <CloseRounded />
                </IconButton>
            </Stack>


            <Divider sx={{ mb: 1 }} />


            {/* Public Links */}

            <List>
                {publicLinks.map(
                    (link) => (
                        <ListItemButton
                            key={link.path}
                            selected={isActive(
                                link.path
                            )}
                            onClick={() =>
                                goTo(
                                    link.path
                                )
                            }
                            sx={{
                                borderRadius: 3,
                                mb: 0.5,

                                "&.Mui-selected":
                                    {
                                        backgroundColor:
                                            "#EEF2FF",
                                        color:
                                            "#4F46E5",
                                    },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 42,
                                    color:
                                        isActive(
                                            link.path
                                        )
                                            ? "#4F46E5"
                                            : "inherit",
                                }}
                            >
                                {
                                    link.icon
                                }
                            </ListItemIcon>

                            <ListItemText
                                primary={
                                    link.label
                                }
                                primaryTypographyProps={{
                                    fontWeight:
                                        isActive(
                                            link.path
                                        )
                                            ? 800
                                            : 600,
                                }}
                            />
                        </ListItemButton>
                    )
                )}
            </List>


            {/* Private Links */}

            {isLoggedIn &&
                privateLinks.length >
                    0 && (
                    <>
                        <Divider
                            sx={{
                                my: 1,
                            }}
                        />

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            fontWeight={800}
                            sx={{
                                px: 2,
                                mb: 0.5,
                                display:
                                    "block",
                            }}
                        >
                            {isStudent
                                ? "STUDENT"
                                : isCompany
                                ? "COMPANY"
                                : "ADMIN"}
                        </Typography>

                        <List>
                            {privateLinks.map(
                                (
                                    link
                                ) => (
                                    <ListItemButton
                                        key={
                                            link.path
                                        }
                                        selected={isActive(
                                            link.path
                                        )}
                                        onClick={() =>
                                            goTo(
                                                link.path
                                            )
                                        }
                                        sx={{
                                            borderRadius:
                                                3,
                                            mb: 0.5,

                                            "&.Mui-selected":
                                                {
                                                    backgroundColor:
                                                        "#EEF2FF",
                                                    color:
                                                        "#4F46E5",
                                                },
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 42,
                                                color:
                                                    isActive(
                                                        link.path
                                                    )
                                                        ? "#4F46E5"
                                                        : "inherit",
                                            }}
                                        >
                                            {
                                                link.icon
                                            }
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={
                                                link.label
                                            }
                                            primaryTypographyProps={{
                                                fontWeight:
                                                    isActive(
                                                        link.path
                                                    )
                                                        ? 800
                                                        : 600,
                                            }}
                                        />
                                    </ListItemButton>
                                )
                            )}
                        </List>
                    </>
                )}


            <Box
                sx={{
                    mt: "auto",
                    pt: 2,
                }}
            >
                <Divider sx={{ mb: 2 }} />

                {isLoggedIn ? (
                    <Stack spacing={1.5}>
                        <Stack
                            direction="row"
                            spacing={1.5}
                            alignItems="center"
                            sx={{
                                px: 1,
                            }}
                        >
                            <Avatar
                                src={
                                    user?.profileImage ||
                                    user?.avatar ||
                                    ""
                                }
                                sx={{
                                    width: 42,
                                    height: 42,
                                }}
                            >
                                {getInitials()}
                            </Avatar>

                            <Box
                                sx={{
                                    minWidth: 0,
                                }}
                            >
                                <Typography
                                    fontWeight={800}
                                    noWrap
                                >
                                    {user?.name ||
                                        user?.fullName ||
                                        "User"}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    noWrap
                                >
                                    {user?.email ||
                                        ""}
                                </Typography>
                            </Box>
                        </Stack>

                        <Button
                            fullWidth
                            color="error"
                            variant="outlined"
                            startIcon={
                                <LogoutRounded />
                            }
                            onClick={
                                handleLogout
                            }
                            sx={{
                                borderRadius: 3,
                                fontWeight: 800,
                            }}
                        >
                            Logout
                        </Button>
                    </Stack>
                ) : (
                    <Stack spacing={1}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={
                                <LoginRounded />
                            }
                            onClick={() =>
                                goTo("/login")
                            }
                            sx={{
                                borderRadius: 3,
                                fontWeight: 800,
                            }}
                        >
                            Login
                        </Button>

                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() =>
                                goTo(
                                    "/register"
                                )
                            }
                            sx={{
                                borderRadius: 3,
                                fontWeight: 800,
                            }}
                        >
                            Create Account
                        </Button>
                    </Stack>
                )}
            </Box>
        </Drawer>
    );


    // =====================================================
    // RENDER
    // =====================================================

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor:
                        "rgba(255,255,255,0.92)",
                    backdropFilter:
                        "blur(14px)",
                    borderBottom:
                        "1px solid #E2E8F0",
                    color: "#0F172A",
                }}
            >
                <Container
                    maxWidth="xl"
                >
                    <Toolbar
                        disableGutters
                        sx={{
                            minHeight: {
                                xs: 68,
                                md: 76,
                            },
                        }}
                    >

                        {/* Logo */}

                        <Box
                            onClick={() =>
                                goTo("/")
                            }
                            sx={{
                                cursor:
                                    "pointer",
                                display:
                                    "flex",
                                alignItems:
                                    "center",
                                gap: 1,
                                mr: {
                                    xs: 1,
                                    md: 4,
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    width: 42,
                                    height: 42,
                                    borderRadius:
                                        2.5,
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    background:
                                        "linear-gradient(135deg,#4F46E5,#7C3AED)",
                                    color:
                                        "#fff",
                                }}
                            >
                                <WorkRounded />
                            </Box>

                            <Typography
                                fontWeight={900}
                                fontSize={{
                                    xs: "1.15rem",
                                    md: "1.35rem",
                                }}
                                sx={{
                                    background:
                                        "linear-gradient(135deg,#4F46E5,#7C3AED)",
                                    WebkitBackgroundClip:
                                        "text",
                                    WebkitTextFillColor:
                                        "transparent",
                                }}
                            >
                                CareerForge
                            </Typography>
                        </Box>


                        {/* Desktop Navigation */}

                        <Stack
                            direction="row"
                            spacing={0.5}
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "flex",
                                },
                            }}
                        >
                            {publicLinks.map(
                                (link) => (
                                    <DesktopNavButton
                                        key={
                                            link.path
                                        }
                                        link={
                                            link
                                        }
                                    />
                                )
                            )}

                            {isLoggedIn &&
                                privateLinks.map(
                                    (
                                        link
                                    ) => (
                                        <DesktopNavButton
                                            key={
                                                link.path
                                            }
                                            link={
                                                link
                                            }
                                        />
                                    )
                                )}
                        </Stack>


                        <Box
                            sx={{
                                flexGrow: 1,
                            }}
                        />


                        {/* Desktop Auth */}

                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            sx={{
                                display: {
                                    xs: "none",
                                    md: "flex",
                                },
                            }}
                        >
                            {isLoggedIn ? (
                                <>
                                    <IconButton
                                        onClick={(
                                            event
                                        ) =>
                                            setAnchorEl(
                                                event.currentTarget
                                            )
                                        }
                                        sx={{
                                            p: 0.5,
                                        }}
                                    >
                                        <Avatar
                                            src={
                                                user?.profileImage ||
                                                user?.avatar ||
                                                ""
                                            }
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                border:
                                                    "2px solid #E0E7FF",
                                            }}
                                        >
                                            {getInitials()}
                                        </Avatar>
                                    </IconButton>


                                    <Box
                                        sx={{
                                            display: {
                                                xs: "none",
                                                lg: "block",
                                            },
                                            maxWidth: 150,
                                        }}
                                    >
                                        <Typography
                                            fontWeight={
                                                800
                                            }
                                            fontSize="0.9rem"
                                            noWrap
                                        >
                                            {user?.name ||
                                                user?.fullName ||
                                                "User"}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            noWrap
                                        >
                                            {isStudent
                                                ? "Student"
                                                : isCompany
                                                ? "Company"
                                                : isAdmin
                                                ? "Admin"
                                                : "User"}
                                        </Typography>
                                    </Box>


                                    <Menu
                                        anchorEl={
                                            anchorEl
                                        }
                                        open={Boolean(
                                            anchorEl
                                        )}
                                        onClose={() =>
                                            setAnchorEl(
                                                null
                                            )
                                        }
                                        PaperProps={{
                                            sx: {
                                                mt: 1,
                                                minWidth: 200,
                                                borderRadius:
                                                    3,
                                                boxShadow:
                                                    "0 15px 40px rgba(15,23,42,.12)",
                                            },
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() =>
                                                goTo(
                                                    "/profile"
                                                )
                                            }
                                        >
                                            <ListItemIcon>
                                                <AccountCircleRounded />
                                            </ListItemIcon>

                                            Profile
                                        </MenuItem>

                                        {isStudent && (
                                            <>
                                                <MenuItem
                                                    onClick={() =>
                                                        goTo(
                                                            "/my-applications"
                                                        )
                                                    }
                                                >
                                                    <ListItemIcon>
                                                        <AssignmentRounded />
                                                    </ListItemIcon>

                                                    My Applications
                                                </MenuItem>

                                                <MenuItem
                                                    onClick={() =>
                                                        goTo(
                                                            "/calendar"
                                                        )
                                                    }
                                                >
                                                    <ListItemIcon>
                                                        <CalendarMonthRounded />
                                                    </ListItemIcon>

                                                    Calendar
                                                </MenuItem>
                                            </>
                                        )}

                                        <Divider />

                                        <MenuItem
                                            onClick={
                                                handleLogout
                                            }
                                            sx={{
                                                color:
                                                    "error.main",
                                            }}
                                        >
                                            <ListItemIcon>
                                                <LogoutRounded color="error" />
                                            </ListItemIcon>

                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button
                                        startIcon={
                                            <LoginRounded />
                                        }
                                        onClick={() =>
                                            goTo(
                                                "/login"
                                            )
                                        }
                                        sx={{
                                            borderRadius:
                                                3,
                                            fontWeight:
                                                800,
                                            color:
                                                "#475569",
                                        }}
                                    >
                                        Login
                                    </Button>

                                    <Button
                                        variant="contained"
                                        onClick={() =>
                                            goTo(
                                                "/register"
                                            )
                                        }
                                        sx={{
                                            borderRadius:
                                                3,
                                            fontWeight:
                                                800,
                                            px: 2.5,
                                        }}
                                    >
                                        Get Started
                                    </Button>
                                </>
                            )}
                        </Stack>


                        {/* Mobile Menu Button */}

                        <IconButton
                            onClick={() =>
                                setMobileOpen(
                                    true
                                )
                            }
                            sx={{
                                display: {
                                    xs: "flex",
                                    md: "none",
                                },
                                ml: 1,
                                width: 44,
                                height: 44,
                                borderRadius: 2.5,
                                border:
                                    "1px solid #E2E8F0",
                            }}
                        >
                            <MenuRounded />
                        </IconButton>

                    </Toolbar>
                </Container>
            </AppBar>


            <MobileDrawer />
        </>
    );
};


export default Navbar;