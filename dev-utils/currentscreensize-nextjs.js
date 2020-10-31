/**
 * Using React hooks to output the current inner dimensions for a user's browser
 * @summary This is meant to work with Next.js. This returns a drop-in component that returns a basic <div> element.
 * @example -
 *   <ScreenSize />
 * @exports ScreenSize
*/

import { useEffect, useState } from 'react'


function useWindowDimensions() {
    /**
     * Is there a `window` element in the DOM?
     * @type {Boolean}
    */
    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

    return windowDimensions;
}


export default function ScreenSize() {
    const { width, height } = useWindowDimensions();
    return (
        <div>Current window dimensions: {width} X {height}</div>
    );
}
