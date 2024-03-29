import React from "react";
import ImageModel from "../models/ImageModel";
import { my_request } from "./Request";

async function getImage(endpoint: string): Promise<ImageModel[]> {

    const result: ImageModel[] = [];

    //Get request
    const response = await my_request(endpoint);

    //Get data
    const data = response._embedded.images;

    for(const key in data) {
        result.push({
            imageId: data[key].imageId,
            imageName: data[key].imageName,
            isIcon: data[key].isIcon,
            url: data[key].url,
            imageData: data[key].imageData
        });
    }

    return result;
}

export async function getFirstImages(courseId: number): Promise<ImageModel[]> {
    const result: ImageModel[] = [];

    //Detect endpoint
    const endpoint:string = `https://api.ani-testlab.edu.vn/course/${courseId}/images`;

    return getImage(endpoint);
}

export async function getAllImages(courseId: number): Promise<ImageModel[]> {
    const result: ImageModel[] = [];

    //Detect endpoint
    const endpoint:string = `https://api.ani-testlab.edu.vn/course/${courseId}/images?sort=imageId,asc&page=0&size=1`;

    return getImage(endpoint);
}