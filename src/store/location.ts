
import {create} from "zustand";
import {immer} from "zustand/middleware/immer";
import {locations} from "../constants"

type LocationValue = typeof locations[keyof typeof locations];
type ChildItem = LocationValue["children"][number];
type Location = LocationValue | ChildItem | null;

type LocationState = {
    activeLocation: Location;
    setActiveLocation: (location?: Location) => void;
    resetActiveLocation: () => void;
};

const DEFAULT_LOCATION = locations.work;

const useLocationStore = create<LocationState>()(
    immer((set)=>({
        activeLocation: DEFAULT_LOCATION,

        setActiveLocation: (location)=>
            set((state)=>{
                if(location === undefined) return;
                state.activeLocation=location;
            }),
        
        resetActiveLocation: ()=>
            set((state)=>{
                state.activeLocation = DEFAULT_LOCATION;
            }),
    }))
)

export default useLocationStore