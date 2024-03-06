import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import ListProduct from "../product/ListProduct";

interface HomePageProps {
    searchKey: string
}

function HomePage({searchKey}: HomePageProps) {
    return (
        <div>
            <Banner />
            <Carousel />
            <ListProduct searchKey={searchKey}/>
        </div>
    );
}
export default HomePage;