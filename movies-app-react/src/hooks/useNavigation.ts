import { useEffect } from "react";
import { startViewTransition } from "../utils";


export default function useNavigation() {
    useEffect(() => {
        // const callback = (navigateEvent: any) => {
        //     console.log(navigateEvent);
        //     if (navigateEvent.navigationType === 'traverse') {
        //         startViewTransition({});
        //     }
        // };

        // const navigation = (window as any).navigation;
        // navigation.addEventListener('navigate', callback);

        // return () => {
        //     navigation.removeEventListener('navigate', callback);
        // }

    }, [location]);
}