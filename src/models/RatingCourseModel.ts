export class RatingCourseModel {
    rateId: number;
    rate: number;
    comment?: string;

    constructor(rateId: number, rate: number, comment?: string) {
        this.rateId = rateId;
        this.rate = rate;
        this.comment = comment;
    }
}