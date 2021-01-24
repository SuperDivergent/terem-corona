import React from "react";

import MissingInfo from "./MissingInfo";
import LinkWeeklyOrders from "../Requests/LinkWeeklyOrders";
import Weekly from "../Requests/Weekly";

export default function Welcome() {
  return (
    <>
      <MissingInfo />
      <LinkWeeklyOrders />
    </>
  );
}
