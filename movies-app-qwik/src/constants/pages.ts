import { Page } from "~/models";
import { HOME, NOW_PLAYING, TOP_RATED, UPCOMING } from "./routes";

export const PAGES: Page[] = [
    {
        path: HOME,
        title: 'Popular Movies'
    },
    {
        path: NOW_PLAYING,
        title: 'Now Playing'
    },
    {
        path: TOP_RATED,
        title: 'Top Rated'
    },
    {
        path: UPCOMING,
        title: 'Upcoming'
    },
];