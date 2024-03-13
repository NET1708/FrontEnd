class ChapterModel {
    chapterId: number;
    chapterName?: string;
    chapterContent?: string;

    constructor(chapterId: number, chapterName?: string, chapterContent?: string) {
        this.chapterId = chapterId;
        this.chapterName = chapterName;
        this.chapterContent = chapterContent;
    }
}
export default ChapterModel;