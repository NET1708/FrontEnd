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
    const endpoint:string = `https://api.ani-testlab.edu.vn/course?sort=courseId,desc&size=8&page=${currentPage}`;

    return getCourse(endpoint);
}

export async function getTop3Courses(): Promise<ResultInterface> {

    //Detect endpoint
    const endpoint:string = 'https://api.ani-testlab.edu.vn/course?sort=courseId,desc&page=0&size=3';

    return getCourse(endpoint);
}

export async function searchCourseByName(key: string, currentPage: number, categoryId: number): Promise<ResultInterface> {

    //Detect endpoint
    let endpoint:string = `https://api.ani-testlab.edu.vn/course?sort=courseId,desc&size=8&page=${currentPage}`;
    if (key !== '' && categoryId == 0) {
        endpoint = `https://api.ani-testlab.edu.vn/course/search/findByCourseNameContaining?courseName=${key}&sort=courseId,desc&size=8&page=${currentPage}`;
    } else if (key === '' && categoryId > 0) {
        endpoint = `https://api.ani-testlab.edu.vn/course/search/findByCategories_categoryId?sort=courseId,desc&size=8&page=${currentPage}&categoryId=${categoryId}`;
    } else if (key !== '' && categoryId > 0) {
        endpoint = `https://api.ani-testlab.edu.vn/course/search/findByCourseNameContainingAndCategories_categoryId?courseName=${key}&sort=courseId,desc&size=8&page=${currentPage}&categoryId=${categoryId}`;
    }

    return getCourse(endpoint);
}

export async function getCourseById(courseId: number): Promise<CourseModel|null> {

    //Detect endpoint
    const endpoint:string = `https://api.ani-testlab.edu.vn/course/${courseId}`;

    try {

        const response = await fetch(endpoint);

        if(!response.ok) {
            throw new Error(`Lỗi khi lấy dữ liệu từ ${endpoint}`);
        }

        //Get data
        const data = await response.json();

        if (data) {
            return {
                courseId: data.courseId,
                courseName: data.courseName,
                description: data.description,
                price: data.price,
                amount: data.amount
            }
        } else {
            throw new Error(`Không tìm thấy khóa học có id = ${courseId}`);
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
}