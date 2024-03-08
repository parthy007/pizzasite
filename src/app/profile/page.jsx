"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";

const ProfilePage = () => {
  const session = useSession();
  // console.log(session);
  const { status, update } = session;
  // console.log(session?.data?.user?.name);

  const [userName, setUserName] = useState(session?.data?.user?.name || "");
  const [isAdmin, setIsAdmin] = useState(session?.data?.user?.admin || false);
  const [userEmail, setUserEmail] = useState(session?.data?.user?.email || "");
  const [userPhone, setUserPhone] = useState(session?.data?.user?.phone || "");
  const [userAddress, setUserAddress] = useState(
    session?.data?.user?.address || ""
  );
  const [userPincode, setUserPincode] = useState(
    session?.data?.user?.pincode || ""
  );
  const [userCity, setUserCity] = useState(session?.data?.user?.city || "");
  const [userCountry, setUserCountry] = useState(
    session?.data?.user?.address || ""
  );
  // console.log(userName);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setUserEmail(session.data.user.email);
      setUserPhone(session.data.user.phone);
      setUserAddress(session.data.user.address);
      setUserPincode(session.data.user.pincode);
      setUserCity(session.data.user.city);
      setUserCountry(session.data.user.country);
      setIsAdmin(session.data.user.admin);
    }
  }, [session, status]);

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  const userImage = session.data.user.image;

  const handleInfoChange = async (e) => {
    e.preventDefault();
    const savingNamePromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          phone: userPhone,
          address: userAddress,
          pincode: userPincode,
          city: userCity,
          country: userCountry,
        }),
      });
      if (res.ok) {
        resolve();
        updateSession();
      } else reject();
    });
    toast.promise(savingNamePromise, {
      loading: "Saving...",
      success: "Saved!",
      error: "Error",
    });
  };

  async function updateSession() {
    await update({
      name: userName,
      phone: userPhone,
      address: userAddress,
      pincode: userPincode,
      city: userCity,
      country: userCountry,
    });
  }

  return (
    <section className="mt-16">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-lg mx-auto">
        <div className="flex gap-3">
          <div className="p-2">
            <Image
              src={userImage}
              alt="avatar"
              width={80}
              height={80}
              className="rounded-md mb-1"
            />
            <button type="button">Edit</button>
          </div>
          <form className="grow" onSubmit={handleInfoChange}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              disabled={true}
              placeholder="Name"
              value={userEmail}
            />
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              placeholder="Phone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
            <div className="flex items-center justify-between gap-2">
              <div>
                <label htmlFor="pincode">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  placeholder="Pincode"
                  value={userPincode}
                  onChange={(e) => setUserPincode(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="City"
                  value={userCity}
                  onChange={(e) => setUserCity(e.target.value)}
                />
              </div>
            </div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Country"
              value={userCountry}
              onChange={(e) => setUserCountry(e.target.value)}
            />
            <button type="Submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
