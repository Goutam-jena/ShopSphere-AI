import React, { useEffect, useState } from "react";
import SellingChart from "./SellingChart";
import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
import { fetchSellerReport } from "../../../Redux Toolkit/Seller/sellerSlice";
import ReportCard from "./Report/ReportCard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const Chart = [ { name: "Today", value: "today" }, { name: "Last 7 days", value: "daily" }, { name: "Last 12 Month", value: "monthly" }];

const HomePage = () => {
  const { sellers } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const [chartType, setChartType] = useState(Chart[0].value);

  useEffect(() => {
    dispatch(fetchSellerReport(localStorage.getItem("jwt") || ""));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setChartType(event.target.value as string);
  };
  
  return (
    <div className="space-y-5">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <ReportCard icon={<AccountBalanceIcon />} value={"₹" + sellers.report?.totalEarnings} title={"Total Earnings"} />
          <ReportCard icon={<AccountBalanceIcon />} value={sellers.report?.totalSales} title={"Total Sales"} />
          <ReportCard icon={<AccountBalanceIcon />} value={"₹" + sellers.report?.totalRefunds} title={"Total Refund"} />
          <ReportCard icon={<AccountBalanceIcon />} value={sellers.report?.canceledOrders} title={"Cancel Orders"} />
      </section>

      <div className="h-[500px] space-y-10 p-5 lg:p-10 bg-slate-800 rounded-md">
        <div className="w-40" >
          <FormControl sx={{color:'white'}} fullWidth>
            <InputLabel sx={{color:'white'}} id="chart-type-label">Chart Type</InputLabel>
            <Select
              sx={{ color: 'white', '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' }, '.MuiSvgIcon-root': { color: 'white' } }}
              labelId="chart-type-label" id="chart-type-select" value={chartType} label="Chart Type" onChange={handleChange}
            >
              {Chart.map((item) => ( <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem> ))}
            </Select>
          </FormControl>
        </div>
        <div className="h-[350px]">
          <SellingChart chartType={chartType} />
        </div>
      </div>
    </div>
  );
};
export default HomePage;