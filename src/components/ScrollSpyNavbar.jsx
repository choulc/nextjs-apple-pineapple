import React, { useState, useEffect, useRef } from "react";
import throttle from "lodash/throttle";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Toolbar } from "@mui/material";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ProductTitle from './ProductTitle'
import styled from '@emotion/styled'
import theme from '../theme'
import Link from 'next/link'

const StyledTabs = styled(Tabs)`
    .MuiTabs-indicator{
        display: none;
    }
    .Mui-selected{
        color: #111 !important;
        background: ${theme.palette.secondary.light};
    }
`

const StyledTab = styled(props => <Tab disableRipple {...props} />)`
    height: 48px;
    border-radius: 24px;
    margin-left: 16px;
    min-width: 140px;
    font-size: 1.2rem;
    color: #333;
    background: ${theme.palette.primary.light};
`


const tabHeight = 69;


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
    const [itemsServer, setItemsServer] = useState([])
    const itemsClientRef = useRef([]);
    const clickedRef = useRef(false);
    const unsetClickedRef = useRef(null);
    const [drawerState, setDrawerState] = useState(false)

    useEffect(() => {
        let temp = tabsInScroll.map(tab => {
            const hash = textToHash(tab.id);
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


    const drawerList = (
        <Box
            sx={{ width: 180 }}
            role="presentation"
            onClick={() => setDrawerState(false)}
            onKeyDown={() => setDrawerState(false)}
        >
            <List>
                {itemsServer.map((text, index) => (
                    <ListItem
                        button
                        key={text.hash}
                        onClick={handleClick(text.hash)}
                    >
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text.text} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <div >
            <CssBaseline />
            <Box sx={{ flexGrow: 1 }}>
                <ElevationScroll {...props}>
                    <AppBar>
                        <Toolbar>
                            <Link href="/">
                                <a>
                                    <div style={{ width: 60 }}>回首頁</div>
                                </a>
                            </Link>
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '100%', justifyContent: 'center' }}>
                                <StyledTabs value={activeState ? activeState : itemsServer[0]?.hash}>
                                    {itemsServer.map(item2 => (
                                        <StyledTab
                                            key={item2.hash}
                                            label={item2.text}
                                            onClick={handleClick(item2.hash)}
                                            value={item2.hash}
                                        />
                                    ))}
                                </StyledTabs>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' }, width: '100%', justifyContent: 'flex-end' }}>
                                <IconButton
                                    onClick={() => setDrawerState(true)}
                                    color="inherit"
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <Toolbar id="back-to-top-anchor" />
                <Drawer
                    anchor="right"
                    open={drawerState}
                    onClose={() => setDrawerState(false)}
                >
                    {drawerList}
                </Drawer>
            </Box>
            <div>
                <ProductTitle title={title} />
            </div>
        </div >
    );
}

export default ScrollSpyNavbar;
