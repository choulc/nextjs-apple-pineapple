import React, { useState, useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import { makeStyles, withStyles } from '@mui/styles'
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Toolbar } from "@mui/material";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ProductTitle from './ProductTitle'

const tabHeight = 69;
const StyledTabs = withStyles({
    indicator: {
        display: 'none',
    }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles(theme => ({

}))(props => <Tab disableRipple {...props} />);

const useStyles = makeStyles(theme => ({
    container: {
        // marginTop: 69,
    },
    tab: {
        '&.MuiTab-root': {
            height: 48,
            borderRadius: 24,
            marginLeft: 16,
            minWidth: 140,
            fontSize: '1.2rem',
            color: '#333',
            background: theme.palette.primary.light,
            '&.Mui-selected': {
                color: '#111',
                background: theme.palette.secondary.light,
            }
        }
    }
}));

/******* This is the scroll spy magic */
/*
Credits: Material UI
Source: 
https://github.com/mui-org/material-ui/blob/404c2ba16816f5c7ab7d8b2caf6bbc3d2218b820/docs/src/modules/utils/textToHash.js
*/
const makeUnique = (hash, unique, i = 1) => {
    const uniqueHash = i === 1 ? hash : `${hash}-${i}`;

    if (!unique[uniqueHash]) {
        unique[uniqueHash] = true;
        return uniqueHash;
    }

    return makeUnique(hash, unique, i + 1);
};

const textToHash = (text, unique = {}) => {
    return makeUnique(
        encodeURI(
            text
                .toLowerCase()
                .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, "")
                // eslint-disable-next-line no-useless-escape
                .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?\s]+/g, "-")
                .replace(/-+/g, "-")
                .replace(/^-|-$/g, "")
        ),
        unique
    );
};

function useThrottledOnScroll(callback, delay) {

    const throttledCallback = React.useMemo(
        () => (callback ? throttle(callback, delay) : ''),
        [callback, delay]
    );

    React.useEffect(() => {
        if (throttledCallback === '') return undefined;

        window.addEventListener("scroll", throttledCallback);
        return () => {
            window.removeEventListener("scroll", throttledCallback);
            throttledCallback.cancel();
        };
    }, [throttledCallback]);
}

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

function ScrollSpyNavbar(props) {
    const { tabsInScroll, title } = props;
    const [activeState, setActiveState] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [itemsServer, setItemsServer] = useState([])
    const itemsClientRef = useRef([]);
    const clickedRef = useRef(false);
    const unsetClickedRef = useRef(null);
    const classes = useStyles();
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // let itemsServer = tabsInScroll.map(tab => {
    //     const hash = textToHash(tab.id);
    //     return {
    //         icon: tab.icon || "",
    //         text: tab.text,
    //         component: tab.component,
    //         hash: hash,
    //         node: document.getElementById(hash)
    //     };
    // });

    useEffect(() => {
        let temp = tabsInScroll.map(tab => {
            const hash = textToHash(tab.id);
            console.log(document.getElementById(hash))
            return {
                icon: tab.icon || "",
                text: tab.text,
                hash: hash,
                node: document.getElementById(hash)
            };
        });

        setItemsServer(temp)
    }, [])

    useEffect(() => {
        itemsClientRef.current = itemsServer;
    }, [itemsServer]);

    useEffect(() => {
        clearTimeout(unsetClickedRef.current);
    }, []);


    const findActiveIndex = React.useCallback(() => {
        // Don't set the active index based on scroll if a link was just clicked
        if (clickedRef.current) return;

        // set default if activeState is null
        if (activeState === null) setActiveState(itemsServer[0].hash);

        let active;
        for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
            // No hash if we're near the top of the page
            if (document.documentElement.scrollTop < 0) {
                active = { hash: null };
                break;
            }

            const item = itemsClientRef.current[i];

            if (
                item.node &&
                item.node.offsetTop <
                document.documentElement.scrollTop +
                document.documentElement.clientHeight / 8 +
                tabHeight
            ) {
                active = item;
                break;
            }
        }

        if (active && activeState !== active.hash) {
            setActiveState(active.hash);
        }
    }, [activeState, itemsServer]);

    // Corresponds to 10 frames at 60 Hz
    useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);

    const handleClick = hash => () => {
        setMobileMoreAnchorEl(null)
        // Used to disable findActiveIndex if the page scrolls due to a click
        clickedRef.current = true;
        clearTimeout(unsetClickedRef.current)
        unsetClickedRef.current = setTimeout(() => {
            clickedRef.current = false;
        }, 1000);

        if (activeState !== hash) {
            setActiveState(hash);

            if (window) {
                window.scrollTo({
                    top:
                        document.getElementById(hash).getBoundingClientRect().top +
                        window.pageYOffset,
                    behavior: "smooth"
                });
            }
        }

    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {itemsServer.map(item2 => (
                <MenuItem
                    key={item2.hash}
                    onClick={handleClick(item2.hash)}
                >
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    </IconButton>
                    <p>{item2.text}</p>
                </MenuItem>
            ))}
        </Menu>
    );

    return (
        <div >
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <ElevationScroll {...props}>
                    <AppBar>
                        <Toolbar>
                            <div>hello</div>
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '100%', justifyContent: 'center' }}>
                                <StyledTabs value={activeState ? activeState : itemsServer[0]?.hash}>
                                    {itemsServer.map(item2 => (
                                        <StyledTab
                                            key={item2.hash}
                                            label={item2.text}
                                            onClick={handleClick(item2.hash)}
                                            value={item2.hash}
                                            className={classes.tab}
                                        />
                                    ))}
                                </StyledTabs>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', justifyContent: 'flex-end' }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleMobileMenuOpen}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <Toolbar id="back-to-top-anchor" />
                {renderMobileMenu}
            </Box>
            <div className={classes.container}>
                <ProductTitle title={title} />
            </div>
        </div >
    );
}

export default ScrollSpyNavbar;
