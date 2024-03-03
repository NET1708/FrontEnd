class CourseModel {
    Id: number;
    CourseName?: string;
    Description?: string;
    Price?: number;
    Amount?: number;

    constructor(Id: number, CourseName?: string, Description?: string, Price?: number, Amount?: number) {
        this.Id = Id;
        this.CourseName = CourseName;
        this.Description = Description;
        this.Price = Price;
        this.Amount = Amount;
    }
}
export default CourseModel;