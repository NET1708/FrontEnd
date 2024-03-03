import React from "react";
import ImageModel from "../models/ImageModel";
import { my_request } from "./Request";

export async function getAllImages(Id: number): Promise<ImageModel[]> {
    const result: ImageModel[] = [];

    //Detect endpoint
    const endpoint:string = `http://localhost:8888/course/${Id}/Image`;

    //Get request
    const response = await my_request(endpoint);

    //Get data json
    const data = response._embedded.images;

    for(const key in data) {
        result.push({
            Id: data[key].id,
            Name: data[key].name,
            isIcon: data[key].isIcon,
            URL: data[key].url,
            ImageData: data[key].imageData
        });
    }
    return result;
}