class CourseModel {
    courseId: number;
    course_Name?: string;
    description?: string;
    price?: number;
    amount?: number;

    constructor(courseId: number, course_Name?: string, description?: string, price?: number, amount?: number) {
        this.courseId = courseId;
        this.course_Name = course_Name;
        this.description = description;
        this.price = price;
        this.amount = amount;
    }
}
export default CourseModel;