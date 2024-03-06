class CourseModel {
    courseId: number;
    courseName?: string;
    description?: string;
    price?: number;
    amount?: number;

    constructor(courseId: number, courseName?: string, description?: string, price?: number, amount?: number) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.description = description;
        this.price = price;
        this.amount = amount;
    }
}
export default CourseModel;