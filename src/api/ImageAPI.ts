import React from "react";
import ImageModel from "../models/ImageModel";
import { my_request } from "./Request";

async function getImage(imageId: number,endpoint: string): Promise<ImageModel[]> {
    const result: ImageModel[] = [];

    //Get request
    const response = await my_request(endpoint);

    //Get data
    const data = response._embedded.images;

    for(const key in data) {
        result.push({
            imageId: data[key].imageId,
            image_Name: data[key].image_Name,
            isIcon: data[key].isIcon,
            url: data[key].url,
            imageData: data[key].imageData
        });
    }

    return result;
}

export async function getAllImages(imageId: number): Promise<ImageModel[]> {
    const result: ImageModel[] = [];

    //Detect endpoint
    const endpoint:string = `https://api.ani-testlab.edu.vn/course/${imageId}/images`;

    //Get request
    const response = await my_request(endpoint);

    //Get data json
    const data = response._embedded.images;

    for(const key in data) {
        result.push({
            imageId: data[key].imageId,
            image_Name: data[key].image_Name,
            isIcon: data[key].isIcon,
            url: data[key].url,
            imageData: data[key].imageData
        });
    }
    return result;
}