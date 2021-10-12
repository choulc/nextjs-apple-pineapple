import React from 'react';
import dataDetail from '../data/fruitDetailData.json'
import ScrollSpyNavbar from '../src/components/ScrollSpyNavbar';
import ScrollTop from '../src/components/ScrollTop';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ProductInfo from '../src/components/ProductInfo';
import RecommendedVideo from '../src/components/RecommendedVideo';
import ProductPhoto from '../src/components/ProductPhoto';
import ProductResource from '../src/components/ProductResource';
import ProductLink from '../src/components/ProductLink';
import Footer from '../src/components/Footer';

const Fruit = (props) => {

    const { page } = props

    return (
        <div>
            <ScrollSpyNavbar
                title={page.title}
                tabsInScroll={[
                    {
                        id: "photo",
                        text: "產品照片",
                    },
                    {
                        id: "introduction",
                        text: "產品介紹",

                    },
                    {
                        id: "video",
                        text: "推薦影片",
                    },
                    {
                        id: "resource",
                        text: "產品資源",
                    },
                    {
                        id: "link",
                        text: "相關連結",
                    }
                ]}
            />
            <div id="photo">
                <div style={{ paddingTop: 70, minHeight: "30vh" }}>
                    <ProductPhoto imageList={page.imageList} />
                </div>
            </div>
            <div id="introduction">
                <div style={{ paddingTop: 70, minHeight: "30vh" }}>
                    <ProductInfo productInfo={page.productInfo} />
                </div>
            </div>
            <div id="video">
                <div style={{ paddingTop: 70, minHeight: "20vh" }}>
                    <RecommendedVideo videoList={page.videoList} />
                </div>
            </div>
            <div id="resource">
                <div style={{ paddingTop: 70, minHeight: "55vh" }}>
                    <ProductResource resourceList={page.resourceList} />
                </div>
            </div>
            <div id="link">
                <div style={{ paddingTop: 70, minHeight: "100vh" }}>
                    <ProductLink linkList={page.linkList} />
                </div>
            </div>
            <ScrollTop>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
            <Footer />
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