























// FILE: frontend/src/customer/components/Navbar/Navbar.tsx

// import {
//   Avatar,
//   Badge,
//   Box,
//   Button,
//   Divider,
//   Drawer,
//   IconButton,
//   Menu,
//   MenuItem,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import React, { useState } from "react";
// import "./Navbar.css";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import SearchIcon from "@mui/icons-material/Search";
// import MenuIcon from "@mui/icons-material/Menu";
// import { mainCategory } from "../../../data/category/mainCategory";
// import CategorySheet from "./CategorySheet";
// import DrawerList from "./DrawerList";
// import { useNavigate, useLocation } from "react-router-dom"; // ✅ added useLocation
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// interface CategoryItem {
//   name: string;
//   categoryId: string;
//   level: number;
// }

// const Navbar = () => {
//   const [showSheet, setShowSheet] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const theme = useTheme();
//   const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
//   const { user, cart, sellers } = useAppSelector((store: any) => store);
//   const navigate = useNavigate();
//   const location = useLocation(); // ✅ useLocation hook
//   const [open, setOpen] = React.useState(false);
//   const dispatch = useAppDispatch();
  
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const openUserMenu = Boolean(anchorEl);
//   const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleCloseUserMenu = () => {
//     setAnchorEl(null);
//   };
  
//   const isAdmin = user.user?.role === "ROLE_ADMIN";
//   const isSeller = sellers.profile?._id || user.user?.role === "ROLE_SELLER";
//   const isCustomer = user.user && !isAdmin && !isSeller;

//   const toggleDrawer = (newOpen: boolean) => () => {
//     setOpen(newOpen);
//   };

//   const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter' && searchQuery.trim() !== '') {
//       navigate(`/search-products?query=${searchQuery}`);
//     }
//   };

//   const handleLogout = () => {
//     handleCloseUserMenu();
//     dispatch(performLogout());
//     navigate("/");
//   };

//   return (
//     <Box sx={{ zIndex: 2 }} className="sticky top-0 left-0 right-0 bg-white shadow-sm">
//       {/* --- TOP BAR --- */}
//       <div className="flex items-center justify-between px-5 lg:px-20 h-[70px]">
//         {/* Left Side: Logo & Mobile Menu */}
//         <div className="flex items-center gap-2">
//             {!isMediumScreen && (
//               <IconButton onClick={() => toggleDrawer(true)()}>
//                 <MenuIcon className="text-gray-700" sx={{ fontSize: 29 }} />
//               </IconButton>
//             )}
//             <h1 onClick={() => navigate("/")} className="logo cursor-pointer text-lg md:text-2xl text-[#00927c]">
//               ShopSphere
//             </h1>
//         </div>
        
//         {/* Middle: Search Bar (more prominent on larger screens) */}
//         <div className="hidden lg:flex flex-1 max-w-xl mx-8">
//             <div className="relative flex items-center w-full">
//                 <input
//                 className="bg-gray-100 p-2 pl-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
//                 placeholder="Search for Products, Brands and More"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={handleSearch}
//                 />
//                 <div className="absolute left-3">
//                 <SearchIcon className="text-gray-400" />
//                 </div>
//             </div>
//         </div>
        
//         {/* Right Side: Profile, Cart, etc. */}
//         <div className="flex gap-1 lg:gap-4 items-center">
//           {user.user ? (
//             <div>
//               <Button id="user-menu-button" aria-haspopup="true" onClick={handleUserClick} className="flex items-center gap-2">
//                 <Avatar sx={{ width: 29, height: 29 }} src={user.user?.profilePic?.url || ''}>
//                   {!user.user?.profilePic?.url && user.user?.fullName[0]}
//                 </Avatar>
//                 <h1 className="font-semibold hidden lg:block">
//                   {user.user?.fullName?.split(" ")[0]}
//                 </h1>
//               </Button>
//               <Menu id="user-menu" anchorEl={anchorEl} open={openUserMenu} onClose={handleCloseUserMenu}>
//                 <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/account/profile'); }}>My Account</MenuItem>
//                 {isAdmin && <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/admin'); }}>Admin Dashboard</MenuItem>}
//                 {isSeller && <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/seller'); }}>Seller Dashboard</MenuItem>}
//                 {(isAdmin && !isSeller) && <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/become-seller'); }}>Become a Seller</MenuItem>}
//                 <Divider />
//                 <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               </Menu>
//             </div>
//           ) : (
//             <Button variant="contained" startIcon={<AccountCircleIcon sx={{ fontSize: "12px" }} />} onClick={() => navigate("/login")}>
//               Login
//             </Button>
//           )}

//           <IconButton onClick={() => navigate("/wishlist")}>
//             <FavoriteBorderIcon sx={{ fontSize: 29 }} className="text-gray-700" />
//           </IconButton>

//           <IconButton onClick={() => navigate("/cart")}>
//             <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
//               <AddShoppingCartIcon sx={{ fontSize: 29 }} className="text-gray-700" />
//             </Badge>
//           </IconButton>
//         </div>
//       </div>

//       {/* --- SECOND BAR (CATEGORIES) --- */}
//       {isMediumScreen && location.pathname === "/" && ( // ✅ Only visible on homepage
//         <div className="bg-gray-800 text-white">
//           <ul className="flex items-center justify-center font-medium">
//             {mainCategory.map((item: CategoryItem) => (
//               <li
//                 key={item.categoryId}
//                 onMouseLeave={() => setShowSheet(false)}
//                 onMouseEnter={() => {
//                   setSelectedCategory(item.categoryId);
//                   setShowSheet(true);
//                 }}
//                 className="mainCategory hover:bg-gray-700 cursor-pointer h-[40px] px-4 flex items-center"
//               >
//                 {item.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <Drawer open={open} onClose={toggleDrawer(false)}>
//         {<DrawerList toggleDrawer={toggleDrawer} />}
//       </Drawer>
      
//       {showSheet && selectedCategory && (
//         <div onMouseLeave={() => setShowSheet(false)} onMouseEnter={() => setShowSheet(true)} className="categorySheet absolute top-[6.8rem] left-0 right-0 w-full">
//           <CategorySheet setShowSheet={setShowSheet} selectedCategory={selectedCategory} />
//         </div>
//       )}
//     </Box>
//   );
// };

// export default Navbar;






































import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { mainCategory } from "../../../data/category/mainCategory";
import CategorySheet from "./CategorySheet";
import DrawerList from "./DrawerList";
import { useNavigate, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { performLogout } from "../../../Redux Toolkit/Customer/AuthSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { fetchUserProfile } from "../../../Redux Toolkit/Customer/UserSlice";

interface CategoryItem {
  name: string;
  categoryId: string;
  level: number;
}

const Navbar = () => {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { user, cart, sellers } = useAppSelector((store: any) => store);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorEl);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt && !user.user) {
      dispatch(fetchUserProfile({ jwt, navigate: null }));
    }
  }, [user.user, dispatch]);

  const handleUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const isAdmin = user.user?.role === "ROLE_ADMIN";
  const isSeller = sellers.profile?._id || user.user?.role === "ROLE_SELLER";
  const isCustomer = user.user && !isAdmin && !isSeller;

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search-products?query=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    dispatch(performLogout());
    navigate("/");
  };

  return (
    <Box sx={{ zIndex: 2 }} className="sticky top-0 left-0 right-0 bg-white shadow-sm">
      {/* --- TOP BAR --- */}
      <div className="flex items-center justify-between px-5 lg:px-20 h-[70px]">
        {/* Left Side: Logo & Mobile Menu */}
        <div className="flex items-center gap-2">
          {!isMediumScreen && (
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon className="text-gray-700" sx={{ fontSize: 29 }} />
            </IconButton>
          )}
          <h1
            onClick={() => navigate("/")}
            className="logo cursor-pointer text-lg md:text-2xl text-[#00927c]"
          >
            ShopSphere
          </h1>
        </div>

        {/* Middle: Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-8">
          <div className="relative flex items-center w-full">
            <input
              className="bg-gray-100 p-2 pl-10 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              placeholder="Search for Products, Brands and More"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="absolute left-3">
              <SearchIcon className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Right Side: Profile, Wishlist, Cart */}
        <div className="flex gap-1 lg:gap-4 items-center">
          {user.user ? (
            <div>
              <Button
                id="user-menu-button"
                aria-haspopup="true"
                onClick={handleUserClick}
                className="flex items-center gap-2"
              >
                <Avatar
                  sx={{ width: 29, height: 29 }}
                  src={user.user?.profilePic?.url || ""}
                >
                  {!user.user?.profilePic?.url && user.user?.fullName[0]}
                </Avatar>
                <h1 className="font-semibold hidden lg:block">
                  {user.user?.fullName?.split(" ")[0]}
                </h1>
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={openUserMenu}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    navigate("/account/profile");
                  }}
                >
                  My Account
                </MenuItem>
                {isAdmin && (
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/admin");
                    }}
                  >
                    Admin Dashboard
                  </MenuItem>
                )}
                {isSeller && (
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/seller");
                    }}
                  >
                    Seller Dashboard
                  </MenuItem>
                )}
                {(isAdmin && !isSeller) && (
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      navigate("/become-seller");
                    }}
                  >
                    Become a Seller
                  </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button
                variant="contained"
                startIcon={<AccountCircleIcon sx={{ fontSize: "12px" }} />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              {isMediumScreen && (
                <Button
                  onClick={() => navigate("/become-seller")}
                  startIcon={<StorefrontIcon />}
                  variant="outlined"
                >
                  Become Seller
                </Button>
              )}
            </div>
          )}

          <IconButton onClick={() => navigate("/wishlist")}>
            <FavoriteBorderIcon sx={{ fontSize: 29 }} className="text-gray-700" />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cart.cart?.cartItems.length} color="primary">
              <AddShoppingCartIcon sx={{ fontSize: 29 }} className="text-gray-700" />
            </Badge>
          </IconButton>

          {/* Standalone Become Seller button for logged-in Customers */}
          {isMediumScreen && isCustomer && (
            <Button
              onClick={() => navigate("/become-seller")}
              startIcon={<StorefrontIcon />}
              variant="outlined"
            >
              Become Seller
            </Button>
          )}
        </div>
      </div>

      {/* --- SECOND BAR (CATEGORIES) --- */}
      {isMediumScreen && location.pathname === "/" && (
        <div className="bg-gray-800 text-white">
          <ul className="flex items-center justify-center font-medium">
            {mainCategory.map((item: CategoryItem) => (
              <li
                key={item.categoryId}
                onMouseLeave={() => setShowSheet(false)}
                onMouseEnter={() => {
                  setSelectedCategory(item.categoryId);
                  setShowSheet(true);
                }}
                className="mainCategory hover:bg-gray-700 cursor-pointer h-[40px] px-4 flex items-center"
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {<DrawerList toggleDrawer={toggleDrawer} />}
      </Drawer>

      {showSheet && selectedCategory && (
        <div
          onMouseLeave={() => setShowSheet(false)}
          onMouseEnter={() => setShowSheet(true)}
          className="categorySheet absolute top-[6.8rem] left-0 right-0 w-full"
        >
          <CategorySheet
            setShowSheet={setShowSheet}
            selectedCategory={selectedCategory}
          />
        </div>
      )}
    </Box>
  );
};

export default Navbar;
