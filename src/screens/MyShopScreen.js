import React, { useState } from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';

import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';


import Logout from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import CategoryIcon from '@mui/icons-material/Category';
import PaidIcon from '@mui/icons-material/Paid';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DashboardIcon from '@mui/icons-material/Dashboard';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Route, Router } from 'react-router';
import manageProducts from '../components/ShopComponents/manageProducts';
import manageOrders from '../components/ShopComponents/manageOrders';
import ProfileTabs from '../components/profileComponents/ProfileTabs';
import UpdatePassword from '../components/profileComponents/UpdatePassword';




function MyShopScreen({history}) {

    const [link, setLink] = useState("")


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };


    

    
  return (
    <>
    <div>
    <div>
    <AppBar style={{boxShadow:"1px 2px 4px #ccc"}} position="static" >
      <Container maxWidth="xl"  style={{backgroundColor: "#fff"}}>
        <Toolbar disableGutters style={{backgroundColor: "#fff"}}>
        <Avatar alt="Remy Sharp" src="/images/1.png"  variant="h6" sx={{mr:2}}/>
        <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: "#40a9ff",
              textDecoration: 'none',
              flex: 1,
            }}
          >
            LOGO
          </Typography>

          
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

          <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
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
            '&:before': {
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
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Hồ sơ shop
        </MenuItem>
        
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Quay về trang chủ
        </MenuItem>
      </Menu>
          
        </Toolbar>
      </Container>
    </AppBar>
</div> 

<div>

        
        <SideNav   className="sidenav---expanded---1KdUL" style={{backgroundColor: "#40a9ff", marginTop: "65px"}}
        onSelect={(selected) => {
            const redirect = `/myshop/${selected}`;
            history.push(redirect);
            setLink(selected);
         }}>
                {/* <SideNav.Toggle aria-expanded="true"/> */}
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                        <DashboardIcon style={{ fontSize: '1.75em' , color: "#fff"}}/>
                        </NavIcon>
                        <NavText style={{color:"#fff", fontWeight:"600"}}>
                            Dashboard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="orders">
                        <NavIcon>
                        <ReceiptLongIcon style={{ fontSize: '1.75em' , color: "#fff"}}/>
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' , color: "#fff"}} /> */}
                        </NavIcon>
                        <NavText style={{color:"#fff", fontWeight:"600"}}>
                            Quản Lý Đơn Hàng
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="category">
                        <NavIcon>
                        <CategoryIcon style={{ fontSize: '1.75em' , color: "#fff"}}/>
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' , color: "#fff"}} /> */}
                        </NavIcon>
                        <NavText style={{color:"#fff", fontWeight:"600"}}>
                            Quản lý danh mục
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="product">
                        <NavIcon>
                        <LocalMallIcon style={{ fontSize: '1.75em' , color: "#fff"}}/>
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', color: "#fff" }} /> */}
                        </NavIcon>
                        <NavText style={{color: "#fff", fontWeight:"600"}}>
                            Quản lý sản phẩm
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="earn">
                        <NavIcon>
                        <PaidIcon style={{ fontSize: '1.75em' , color: "#fff"}}/>
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', color: "#fff" }} /> */}
                        </NavIcon>
                        <NavText style={{color: "#fff", fontWeight:"600"}}>
                            Doanh thu
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="manage">
                        <NavIcon>
                        <SettingsSuggestIcon style={{ fontSize: '1.75em' , color: "#fff"}}/>
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em', color: "#fff" }} /> */}
                        </NavIcon>
                        <NavText style={{color: "#fff", fontWeight:"600"}}>
                            Quản Lý Shop
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
        </SideNav>
        
        <div style={{marginLeft: "250px", marginRight: "20px"}}>
           {link === "home" && (<ProfileTabs/>)}
           {link === "category" && (<UpdatePassword/>)}
           {link === "product" && (<ProfileTabs/>)}
        </div>

    

          
</div> 


</div>
    </>
  )
}

export default MyShopScreen