import { Alert, Button, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import SellerLoginForm from "./SellerLoginForm";
import { useAppSelector } from "../../../Redux Toolkit/Store";
import SellerAccountForm from "./SellerAccountForm";

const BecomeSeller = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const { sellerAuth } = useAppSelector(store => store);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  useEffect(() => {
    if (sellerAuth.sellerCreated || sellerAuth.error || sellerAuth.otpSent) {
      setSnackbarOpen(true);
    }
  }, [sellerAuth.sellerCreated, sellerAuth.error, sellerAuth.otpSent]);

  return (
    <div className="grid md:gap-10 grid-cols-1 md:grid-cols-3 min-h-screen">
      {/* Left Section: Forms */}
      <section className="md:col-span-1 col-span-1 flex flex-col justify-center p-8 md:p-10 shadow-lg">
        {!isLoginPage ? <SellerAccountForm /> : <SellerLoginForm />}

        <div className='mt-10 space-y-2'>
          <h1 className='text-center text-sm font-medium'>
            {isLoginPage ? "Don't have an account?" : "Already have an account?"}
          </h1>
          <Button onClick={() => setIsLoginPage(!isLoginPage)} fullWidth sx={{ py: "11px" }} variant='outlined'>
            {isLoginPage ? "Register" : "Login"}
          </Button>
        </div>
      </section>

      {/* Right Section: Image Banner */}
      <section className="hidden md:col-span-2 md:flex justify-center items-center p-10">
        <div className="w-full max-w-2xl text-center space-y-10">
          <div className="space-y-2 font-bold">
            <p className="text-4xl">Sell Your Product</p>
            <p className="text-3xl text-primary">with ShopSphere</p>
          </div>

          {/* --- THIS IS THE FIX --- */}
          <img
            className="w-full h-auto rounded-lg object-cover shadow-lg"
            src={"https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
            alt="A person happily holding shopping bags"
          />
        </div>
      </section>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={sellerAuth.error ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {sellerAuth.error ? sellerAuth.error : sellerAuth.sellerCreated ? sellerAuth.sellerCreated : "OTP sent to your email!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default BecomeSeller;