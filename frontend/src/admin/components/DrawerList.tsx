import * as React from "react";
import DrawerList from "../../admin seller/components/drawerList/DrawerList";
import PeopleIcon from '@mui/icons-material/People';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HomeIcon from '@mui/icons-material/Home';

const menu = [
  { name: "Sellers", path: "/admin", icon: <PeopleIcon /> },
  { name: "Coupons", path: "/admin/coupon", icon: <LocalOfferIcon /> },
  { name: "Home Page", path: "/admin/deals", icon: <HomeIcon /> },
];
const menu2: any[] = [];

const AdminDrawerList = ({ toggleDrawer }: { toggleDrawer?: any }) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};
export default AdminDrawerList;