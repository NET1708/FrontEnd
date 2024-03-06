import React from "react";
import CourseModel from "../models/CourseModel";
import { my_request } from "../api/Request";
import { get } from "http";

interface ResultInterface {
    result: CourseModel[];
    totalPage: number;
    totalCoursePerPage: number;
}

async function getCourse(endpoint: string): Promise<ResultInterface> {

    const result: CourseModel[] = [];

    //Get request
    const response = await my_request(endpoint);

    //Get data
    const data = response._embedded.courses;

    //Get total page
    const totalPage:number = response.page.totalPages;
    const totalCoursePerPage:number = response.page.totalElements;

    for(const key in data) {
        result.push({
            courseId: data[key].courseId,
            courseName: data[key].courseName,
            description: data[key].description,
            price: data[key].price,
            amount: data[key].amount
        });
    }

    return {result: result, totalPage: totalPage, totalCoursePerPage: totalCoursePerPage};
}

export async function getAllCourses(currentPage: number): Promise<ResultInterface> {

    //Detect endpoint
    const endpoint:string = `http://localhost:8888/course?sort=courseId,desc&size=8&page=${currentPage}`;

    return getCourse(endpoint);
}

export async function getTop3Courses(): Promise<ResultInterface> {

    //Detect endpoint
    const endpoint:string = 'http://localhost:8888/course?sort=courseId,desc&page=0&size=3';

    return getCourse(endpoint);
}

export async function searchCourseByName(key: string, currentPage: number): Promise<ResultInterface> {

    //Detect endpoint
    let endpoint:string = `http://localhost:8888/course?sort=courseId,desc&size=8&page=${currentPage}`;
    if (key !== "") {
        endpoint = `http://localhost:8888/course/search/findByCourseNameContaining?courseName=${key}&sort=courseId,desc&size=8&page=${currentPage}`;
    }

    return getCourse(endpoint);
}