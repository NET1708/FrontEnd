import React from "react";
import { my_request } from "./Request";
import { RatingCourseModel } from "../models/RatingCourseModel";

async function getRatingCourse(endpoint: string): Promise<RatingCourseModel[]> {

    const result: RatingCourseModel[] = [];

    //Get request
    const response = await my_request(endpoint);

    //Get data
    const data = response._embedded.rates;

    for(const key in data) {
        result.push({
            rateId: data[key].rateId,
            rate: data[key].rate,
            comment: data[key].comment
        });
    }

    return result;
}
export async function createRatingOfOneCourse(courseId: number, token : String ,rating: { rate: number; comment: string }): Promise<RatingCourseModel[]> {
    // Lấy user_id từ local storage hoặc bất kỳ nguồn nào phù hợp

    // Kiểm tra nếu user_id tồn tại
    if (!token) {
        throw new Error('User ID not found');
    }

    // Tạo object rating với userId và courseId
    const ratingWithUserIdAndCourseId = {
        ...rating,
        course: { courseId: courseId },
    };
    const queryString = `?course_id=${courseId}&token=${token}`;
    const endpoint: string = `http://localhost:8888/rate/create/Rate${queryString}`;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // You might need to include other headers like authorization token etc.
        },
        body: JSON.stringify(ratingWithUserIdAndCourseId), // Sử dụng object đã bao gồm user_id và course_id
    });
    if (!response.ok) {
        throw new Error('Failed to create rating');
    }
    const createdRating = await response.json();

    // Assuming the response structure is similar to the RatingCourseModel
    const { rateId, rate, comment } = createdRating;
    const ratingCourseModel: RatingCourseModel = {
        rateId: rateId,
        rate: rate,
        comment: comment
    };
    return [ratingCourseModel];
}


export async function getAllRatingOfOneCourse(courseId: number, ): Promise<RatingCourseModel[]> {
    const result: RatingCourseModel[] = [];

    //Detect endpoint
    const endpoint:string = `http://localhost:8888/course/${courseId}/rates`;

    return getRatingCourse(endpoint);
}

export async function getOneRatingOfOneCourse(courseId: number): Promise<RatingCourseModel[]> {
    const result: RatingCourseModel[] = [];

    //Detect endpoint
    const endpoint:string = `http://localhost:8888/course/${courseId}/rates?sort=rateId,asc&page=0&size=1`;

    return getRatingCourse(endpoint);
}
