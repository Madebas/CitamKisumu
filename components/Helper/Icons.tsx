import React from "react";
import { LuAlarmClock } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { MdShareLocation } from "react-icons/md";

export const CalendarIcon = (props: any) => <SlCalender {...props} />

export const ClockIcon = (props: any) => <LuAlarmClock {...props} />

export const LocationIcon = (props: any) => <MdShareLocation {...props} />

const Icons = {
  CalendarIcon,
  ClockIcon,
  LocationIcon,
};

export default Icons;
