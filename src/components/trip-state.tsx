"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
export type Trip = {
  start: string;
  end: string;
  flexible: boolean;
  adults: number;
  children: number;
  flights: "" | "yes" | "no";
  interests: string[];
  places: string[];
  stay: string;
  transport: string;
  activities: string[];
  first: string;
  last: string;
  email: string;
  phone: string;
  country: string;
  notes: string;
  consent: boolean;
  tourId: string;
};
export const initialTrip: Trip = {
  start: "",
  end: "",
  flexible: true,
  adults: 2,
  children: 0,
  flights: "",
  interests: [],
  places: [],
  stay: "Help me choose",
  transport: "Help me choose",
  activities: [],
  first: "",
  last: "",
  email: "",
  phone: "",
  country: "",
  notes: "",
  consent: false,
  tourId: "",
};
type State = {
  trip: Trip;
  setTrip: Dispatch<SetStateAction<Trip>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  visited: number;
  setVisited: Dispatch<SetStateAction<number>>;
};
const TripContext = createContext<State | null>(null);
export function TripProvider({ children }: { children: React.ReactNode }) {
  const [trip, setTrip] = useState(initialTrip);
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState(0);
  return (
    <TripContext.Provider
      value={{ trip, setTrip, step, setStep, visited, setVisited }}
    >
      {children}
    </TripContext.Provider>
  );
}
export function useTrip() {
  const state = useContext(TripContext);
  if (!state) throw new Error("TripProvider is required");
  return state;
}
