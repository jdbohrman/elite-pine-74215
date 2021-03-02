import React from 'react';
import { sourcebitDataClient } from 'sourcebit-target-next';

/**
 * In next.js we can't use `src/pages/[...slug].js` for root site page `/`.
 * Instead, we import and export the [...slug].js while overriding its getStaticProps.
 */

import Page from './[...slug]';


export async function getStaticProps({ params }) {
    console.log('Page [index] getStaticProps, params: ', params);
    const props = await sourcebitDataClient.getStaticPropsForPageAtPath('/');
    await generateRssFeed();

    return {
        props: { posts, ogImage, baseUrl },
    };
}

export default Page;
