import React from "react";

export type ChildrenType = {
    children: React.ReactNode;
}

export interface Forecast {
  date: string;
  day: {
    avghumidity: number;
    avgtemp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    maxtemp_c: number;
  };
}