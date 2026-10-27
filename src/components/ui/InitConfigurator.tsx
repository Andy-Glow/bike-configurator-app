"use client";

import { useEffect } from "react";
import { Bike } from "@/types";
import { useConfigurator } from "@/store/useConfigurator";

export function InitConfigurator({ bike }: { bike: Bike }) {
  const initBike = useConfigurator((state) => state.initBike);

  useEffect(() => {
    initBike(bike);
  }, [bike, initBike]);

  return null;
}
