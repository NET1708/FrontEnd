import React from "react";
import CourseModel from "../models/CourseModel";
import { my_request } from "../api/Request";
import { get } from "http";

async function getCourse(endpoint: string): Promise<CourseModel[]> {

    const result: CourseModel[] = [];

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

export async function getAllCourses(): Promise<CourseModel[]> {
    const result: CourseModel[] = [];

    //Detect endpoint
    const endpoint:string = 'http://localhost:8888/course?sort=id,desc&page=0&size=3';

    return getCourse(endpoint);
}