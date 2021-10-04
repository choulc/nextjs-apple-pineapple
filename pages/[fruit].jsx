import React from 'react';
import dataDetail from '../data/fruitDetailData.json'
import ScrollSpyTabs from '../src/components/ScrollSpyTabs';

const Fruit = (props) => {

    const { page } = props

    return (
        <div>
            {typeof window === 'object' && <ScrollSpyTabs
                tabsInScroll={[
                    {
                        text: "產品介紹",
                        component: (
                            <div style={{ paddingTop: 70, height: "80vh" }}>
                                <div>
                                    tab no 1 - some text
                                </div>
                            </div>
                        )
                    },
                    {
                        text: "影片介紹",
                        component: (
                            <div style={{ paddingTop: 70, height: "80vh" }}>
                                <div>

                                    tab no 2 - some text
                                </div>
                            </div>
                        )
                    },
                    {
                        text: "產品圖片",
                        component: <div style={{ paddingTop: 70, height: "150vh" }}>
                            <div>
                                tab no 3 - some text
                                </div>
                        </div>
                    },
                    {
                        text: "Tab no. 4",
                        component: <div style={{ paddingTop: 70, height: "100vh" }}>
                            <div>
                                tab no 4 - some text
                            </div>
                        </div>
                    },
                    {
                        text: "Tab no. 5",
                        component: <div style={{ paddingTop: 70, height: "100vh" }}>
                            <div>
                                tab no 4 - some text
                            </div>
                        </div>
                    }
                ]}
            />}
        </div>
    );
}

export default Fruit;

export async function getStaticPaths() {

    const paths = dataDetail.pages.map(page => {
        const fruit = page.path.split('/')[1];
        return { params: { fruit } };
    });

    return {
        paths,
        fallback: false

    }
}

export async function getStaticProps({ params }) {

    const currentPath = `/${params.fruit}`;
    const page = dataDetail.pages.find(page => page.path === currentPath) || { notfound: true };

    return {
        props: {
            page
        }
    }
}