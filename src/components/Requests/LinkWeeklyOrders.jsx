import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/context";
import { Link } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

export default function LinkWeeklyOrders() {
  const { user } = useContext(UserContext);
  const [requestedOrders, setRequestedOrders] = useState();
  const [placedOrders, setPlacedOrders] = useState();

  useEffect(() => {
    db.collection("requestOrders")
      .where("isActive", "==", true)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          setRequestedOrders({
            ...requestedOrders,
            ...doc.data(),
          });
        });
      });

    db.collection("requests")
      .where("user", "==", user.userKey)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          setPlacedOrders({
            ...placedOrders,
            ...doc.data(),
          });
        });
      });
  });
  return <div></div>;
}
