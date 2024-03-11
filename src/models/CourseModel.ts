class CourseModel {
    courseId: number;
    courseName?: string;
    description?: string;
    price?: number;
    amount?: number;
    averageRating?: number;

    constructor(courseId: number, courseName?: string, description?: string, price?: number, amount?: number, averageRating?: number) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.description = description;
        this.price = price;
        this.amount = amount;
        this.averageRating = averageRating;
    }
}
export default CourseModel;