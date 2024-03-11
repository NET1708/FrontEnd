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

export async function getAllRatingOfOneCourse(courseId: number): Promise<RatingCourseModel[]> {
    const result: RatingCourseModel[] = [];

    //Detect endpoint
    const endpoint:string = `https://api.ani-testlab.edu.vn//course/${courseId}/rates`;

    return getRatingCourse(endpoint);
}

export async function getOneRatingOfOneCourse(courseId: number): Promise<RatingCourseModel[]> {
    const result: RatingCourseModel[] = [];

    //Detect endpoint
    const endpoint:string = `https://api.ani-testlab.edu.vn//course/${courseId}/rates?sort=rateId,asc&page=0&size=1`;

    return getRatingCourse(endpoint);
}