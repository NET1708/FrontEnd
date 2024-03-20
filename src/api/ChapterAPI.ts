import ChapterModel from "../models/ChapterModel";
import { my_request } from "./Request";

export async function getAllChapter(course_id: number): Promise<ChapterModel[]> {
    const result: ChapterModel[] = [];

    //Get request
    const url = `https://api.ani-testlab.edu.vn/chapter/search/findByCourse_courseId?courseId=${course_id}`;
    //Get data
    const response = await my_request(url);
    //Convert data to model
    const data = response._embedded.chapters;

    for(const key in data) {
        result.push({
            chapterId: data[key].chapterId,
            chapterName: data[key].chapterName,
            chapterContent: data[key].chapterContent,
        });
    }

    return result;
}

export async function getChapter(courseId: number, chapterId: number): Promise<ChapterModel|null> {
    const url = `https://api.ani-testlab.edu.vn/chapter/search/findByCourse_CourseIdAndChapterId?courseId=${courseId}&chapterId=${chapterId}`;
    const response = await my_request(url);
    return {
        chapterId: response.chapterId,
        chapterName: response.chapterName,
        chapterContent: response.chapterContent,
    };
}