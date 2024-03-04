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
            courseId: data[key].courseId,
            course_Name: data[key].course_Name,
            description: data[key].description,
            price: data[key].price,
            amount: data[key].amount
        });
    }

    return result;
}

export async function getAllCourses(): Promise<CourseModel[]> {
    const result: CourseModel[] = [];

    //Detect endpoint
    const endpoint:string = 'http://localhost:8888/course?sort=courseId,desc';

    return getCourse(endpoint);
}

export async function getTop3Courses(): Promise<CourseModel[]> {
    const result: CourseModel[] = [];

    //Detect endpoint
    const endpoint:string = 'http://localhost:8888/course?sort=courseId,desc&page=0&size=3';

    return getCourse(endpoint);
}