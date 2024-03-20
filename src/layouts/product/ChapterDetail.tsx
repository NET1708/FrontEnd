import { NavLink, useParams } from "react-router-dom";
import defineNumber from "../utils/defineNumber";
import { useEffect, useState } from "react";
import ChapterModel from "../../models/ChapterModel";
import { getAllChapter, getChapter } from "../../api/ChapterAPI";

export const ChapterDetail: React.FC = () => {
    //get id from url
    const { courseId, chapterId } = useParams();
    const [chapter, setChapter] = useState<ChapterModel>({
        chapterId: 0,
        chapterName: "",
        chapterContent: "",
    });
    const [chapterList, setChapterList] = useState<ChapterModel[]>([]);

    useEffect(() => {
        let course_id: number = 0;
        let chapter_id: number = 0;

        try {
            course_id = parseInt(courseId!);
            chapter_id = parseInt(chapterId!);
        } catch (err) {
            console.log(err);
        }

        const chapterData = getChapter(course_id, chapter_id);
        const listChapterOfCourse = getAllChapter(course_id);

        chapterData.then((data) => {
            setChapter(data!);
        });

        listChapterOfCourse.then((data) => {
            setChapterList(data);
        });
    }, [courseId, chapterId]);

    const videoUrl = chapter.chapterContent;

    const videoId = videoUrl!.split('v=')[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="container-fluid vh-100 bg-dark text-light">
            <div className="row h-100">
                <div className="col-3 border border-radius border-black chapter-list">
                    {
                        chapterList.map((value, index) => {
                            return (
                                <div key={index} className="row border border-black d-flex rounded-3">
                                    {/* row trái name bên phải icon complete */}
                                    <div className="col-8 small mt-2">
                                        <NavLink to={`/course/${courseId}/chapter/${value.chapterId}`} className="text-light text-decoration-none">
                                            {value.chapterName}
                                        </NavLink>
                                    </div>
                                    <div className="col-4 justify-content-center align-items-center mt-3">
                                        <i className="fas fa-check"></i>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
                <div className="col-9 border border-black d-flex flex-column">
                    <div className="mb-auto">
                        <div className="row justify-content-between align-content-start border border-dark">
                            <div className="col-12">
                                <h1>{chapter.chapterName}</h1>
                                {/* Youtube video */}
                                <iframe
                                    width="100%"
                                    height="500"
                                    src={embedUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto d-flex justify-content-between align-content-end border border-black mb-5 mt-0">
                        <button className="btn btn-primary">Previous</button>
                        <button className="btn btn-primary">Comlete</button>
                        <button className="btn btn-primary">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};