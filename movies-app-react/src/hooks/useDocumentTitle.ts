import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGES } from '../constants/routes';


export default function useDocumentTitle(pageTitle?: string) {
    const location = useLocation();
    const prefix = 'TMDB - ';
    const [title, setTitle] = useState('');

    useEffect(() => {
        const pathName = location.pathname;
        const page = PAGES.find((page) => page.path === pathName);
        const title = (page && page.title) || (pageTitle || '');
        setTitle(title);
        document.title = prefix + title;
    }, [location, pageTitle, setTitle]);

    return title;
}
