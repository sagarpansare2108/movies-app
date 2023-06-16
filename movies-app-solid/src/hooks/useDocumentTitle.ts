import { createEffect, createMemo } from 'solid-js';
import { useLocation } from '@solidjs/router';
import { PAGES } from '../constants';

export default function useDocumentTitle(pageTitle?: string) {
    const location = useLocation();
    const pathname = createMemo(() => location.pathname);
    const prefix = 'TMDB - ';

    createEffect(() => {
        const page = PAGES.find((page) => page.path === pathname());
        const title = (page && page.title) || (pageTitle || '');
        document.title = prefix + title;
    });
}
