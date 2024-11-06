import useAuth from "@/hooks/useAuth";
import React from "react";

const UserOverview = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <div className="w-full flex justify-between items-center border-b border-b-slate-600 pb-4  mb-6">
        <div className="text-white">
          <p className="text-xl font-medium capitalize"> {user?.name} </p>
          <p className="text-sm">
            Account Type: <span className="capitalize"> {user?.role} </span>{" "}
          </p>
        </div>
        <div className="text-white bg-white/20 backdrop-blur-3xl p-4 rounded-md">
          <p>Balance: {user?.balance} BDT </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="text-white font-semibold text-xl h-52 bg-white/20 backdrop-blur-3xl flex items-center justify-center rounded-3xl uppercase ">
          <h1>SEND MONEY</h1>
        </div>
        <div className="text-white h-52 bg-white/20 backdrop-blur-3xl flex items-center justify-center rounded-3xl uppercase font-semibold text-xl">
          <h1>cash out</h1>
        </div>
        <div className="text-white h-52 bg-white/20 backdrop-blur-3xl flex items-center justify-center rounded-3xl uppercase font-semibold text-xl">
          <h1>cash in</h1>
        </div>
        <div className="text-white h-52 bg-white/20 backdrop-blur-3xl flex items-center justify-center rounded-3xl uppercase font-semibold text-xl">
          <h1>balance</h1>
        </div>
        <div className="text-white h-52 bg-white/20 backdrop-blur-3xl flex items-center justify-center rounded-3xl uppercase font-semibold text-xl">
          <h1>transaction history</h1>
        </div>
        <div className="text-white h-52 bg-white/20 backdrop-blur-3xl flex items-center justify-center rounded-3xl uppercase font-semibold text-xl">
          <h1>manage profile</h1>
        </div>
      </div>
    </>
  );
};

export default UserOverview;
