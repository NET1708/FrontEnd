import React from "react";
import CourseModel from "../models/CourseModel";
import { my_request } from "../api/Request";

export async function getAllCourses(): Promise<CourseModel[]> {
    const result: CourseModel[] = [];

    //Detect endpoint
    const endpoint:string = "http://localhost:8888/course";

    //Get request
    const response = await my_request(endpoint);

    //Get data
    const data = response._embedded.courses;

    for(const key in data) {
        result.push({
        Id: data[key].id,
        CourseName: data[key].courseName,
        Description: data[key].description,
        Price: data[key].price,
        Amount: data[key].amount,
        });
    }

    return result;
}