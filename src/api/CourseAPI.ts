import React from "react";
import CourseModel from "../models/CourseModel";

async function reqquest(endpoint:string) {

    const response = await fetch(endpoint);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
    }
    return await response.json();
}

export async function getAllCourses(): Promise<CourseModel[]> {
    const result: CourseModel[] = [];

    //Detect endpoint
    const endpoint:string = "http://localhost:8888/course";

    //Get request
    const response = await reqquest(endpoint);

    //Get data
    const data = response._embedded.courses;
    console.log(data);

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