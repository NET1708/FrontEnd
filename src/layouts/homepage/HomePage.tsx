import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import ListProduct from "../product/ListProduct";
import { useParams } from "react-router-dom";

interface HomePageProps {
    searchKey: string
}

function HomePage({searchKey}: HomePageProps) {
    document.title = "Ani-Testlab - Home Page";

    const {categoryId} = useParams(); //get categoryId from url
    let categoryIdNumber = 0;

    try {
        categoryIdNumber = parseInt(categoryId!);
    } catch (error) {
        categoryIdNumber = 0;
        console.log("Error when parse categoryId to number", error);
    }

    if (Number.isNaN(categoryIdNumber)) {
        categoryIdNumber = 0;
    }

    return (
        <div>
            <Banner />
            <Carousel />
            <ListProduct searchKey={searchKey} categoryId={categoryIdNumber}/>
        </div>
    );
}
export default HomePage;