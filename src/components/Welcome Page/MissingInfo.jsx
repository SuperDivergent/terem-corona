import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/context";
import { db } from "../../firebase/firebaseConfig";

export default function MissingInfo() {
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState();
  const [userDataUpdated, setUserDataUpdated] = useState();

  const missingInfo = [
    { en: "phone", he: "טלפון" },
    { en: "city", he: "עיר מגורים" },
    { en: "address", he: "כתובת מגורים" },
    { en: "isCar", he: "האם יש רכב" },
    { en: "favPartner", he: "עובד מועדף" },
    { en: "english_firstName", he: "שם פרטי באנגלית" },
    { en: "english_lastName", he: "שם משפחה באנגלית" },
  ];

  useEffect(() => {
    db.collection("users")
      .doc(user.userKey)
      .get()
      .then((doc) => {
        setUserData({
          ...doc.data(),
        });
      });
  }, [user, userData]);

  return (
    <>
      {userData &&
      missingInfo.some((detail) => {
        return !userData[detail.en];
      }) ? (
        <div className="card m-2 text-right">
          <div className="card-header d-flex justify-content-between">
            <span style={{ fontSize: "24px", textDecoration: "underline" }}>
              עדכון מידע אישי
            </span>
            <button
              className="btn btn-outline-dark"
              onClick={() => {
                db.collection("users")
                  .doc(user.userKey)
                  .update({
                    ...userDataUpdated,
                  })
                  .then(() => {
                    setUserData({
                      ...userData,
                      ...userDataUpdated,
                    });
                  });
              }}
            >
              עדכן
            </button>
          </div>
          <div className="card-body">
            {missingInfo.map((detail, i) => {
              return !userData[detail.en] ? (
                <div className="mt-1" key={i}>
                  <label style={{ fontSize: "18px", fontWeight: "bold" }}>
                    {detail.he}:
                  </label>
                  <input
                    // maxLength="50"
                    type="text"
                    className="form-control"
                    value={userData[detail.en]}
                    onChange={(e) =>
                      setUserDataUpdated({
                        ...userDataUpdated,
                        [detail.en]: e.target.value,
                      })
                    }
                  />
                </div>
              ) : null;
            })}
          </div>
        </div>
      ) : null}
    </>
  );
}
