import React from "react";
import CategoryModel from "../models/CategoryModel";
import { my_request } from "./Request";

export async function getAllCategories(): Promise<CategoryModel[]> {
    const result: CategoryModel[] = [];

    //Get request
    const response = await my_request('https://api.ani-testlab.edu.vn/category');

    //Get data
    const data = response._embedded.categories;

    for(const key in data) {
        result.push({
            categoryId: data[key].categoryId,
            categoryName: data[key].categoryName
        });
    }

    return result;
}