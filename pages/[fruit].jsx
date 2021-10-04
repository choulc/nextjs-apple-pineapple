import React from 'react';
import dataDetail from '../data/fruitDetailData.json'
import ScrollSpyNavbar from '../src/components/ScrollSpyNavbar';
import ScrollTop from '../src/components/ScrollTop';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ProductInfo from '../src/components/ProductInfo';
import RecommendedVideo from '../src/components/RecommendedVideo';
import ProductPhoto from '../src/components/ProductPhoto';

const Fruit = (props) => {

    const { page } = props

    return (
        <div>
            {typeof window === 'object' && <ScrollSpyNavbar
                title={page.title}
                tabsInScroll={[
                    {
                        id: "introduction",
                        text: "產品介紹",
                        component: (
                            <div style={{ paddingTop: 70, minHeight: "30vh" }}>
                                <ProductInfo
                                    productInfo={page.productInfo}
                                />
                            </div>
                        )
                    },
                    {
                        id: "video",
                        text: "推薦影片",
                        component: (
                            <div style={{ paddingTop: 70, minHeight: "20vh" }}>
                                <RecommendedVideo
                                    videoList={page.videoList}
                                />
                            </div>
                        )
                    },
                    {
                        id: "photo",
                        text: "產品照片",
                        component: <div style={{ paddingTop: 70, height: "150vh" }}>
                            <ProductPhoto
                                imageList={page.imageList}
                            />
                        </div>
                    },
                    {
                        id: "Tab no. 4",
                        text: "Tab no. 4",
                        component: <div style={{ paddingTop: 70, height: "100vh" }}>
                            <div>
                                tab no 4 - some text
                            </div>
                        </div>
                    },
                    {
                        id: "Tab no. 5",
                        text: "Tab no. 5",
                        component: <div style={{ paddingTop: 70, height: "100vh" }}>
                            <div>
                                tab no 4 - some text
                            </div>
                        </div>
                    }
                ]}
            />}
            {typeof window === 'object' && <ScrollTop>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>}
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