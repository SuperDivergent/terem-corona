import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";

export default function Weekly(props) {
  const [orderData, setOrderData] = useState();

  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const date_code = props.match.params.date_code.slice(1);
    db.collection("requestOrders")
      .doc(date_code)
      .get()
      .then((doc) => {
        setOrderData({
          ...doc.data(),
        });
      });
  }, []);

  useEffect(() => {
    // will need tweaking to take date objects into account instead of timestamps
    if (orderData) {
      const startDate = orderData.startingDate.toDate();
      console.log(startDate);

      for (let i = 1; i < 8; i++) {
        setWeekDates([
          ...weekDates,
          startDate.setDate(startDate.getDate() + i),
        ]);
      }
    }
  }, [orderData]);

  return (
    <>
      {orderData ? (
        <div className="text-right">
          <div className="h2 m-2">בקשות לסידור שבועי</div>
          <div>{`מהתאריך ${orderData.startingDate} עד התאריך ${orderData.endingDate}`}</div>
        </div>
      ) : (
        // {weekDates.map(() => {

        // })}
        <div>נא להמתין לטעינת העמוד...</div>
      )}
    </>
  );
}
