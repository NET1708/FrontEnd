import React, { useState } from "react";
import { Star, StarFill } from "react-bootstrap-icons";
import { createRatingOfOneCourse } from "../../api/RatingCourseAPI";
import {RatingCourseModel} from "../../models/RatingCourseModel";

const StarRatingComponent = ({  courseId }: {courseId: number }) => {
    const [selectedStars, setSelectedStars] = useState(0);
    const [comment, setComment] = useState('');
    const token = localStorage.getItem('token');

    const handleStarClick = (starCount: number) => {
        setSelectedStars(starCount);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleSubmit = async () => {
        // Gửi dữ liệu comment và số sao đã chọn đến API
        try {
            const ratingData = {
                rate: selectedStars,
                comment: comment,

            };
            if (token !== null) {
                const userId: string = token; // TypeScript sẽ hiểu rằng userId không bao giờ là null ở đây
                // Sử dụng userId ở đây
                await createRatingOfOneCourse(courseId,token, ratingData);
            }
            // Xử lí sau khi gửi đánh giá thành công, ví dụ: hiển thị thông báo, cập nhật UI, v.v.
        } catch (error) {
            console.error('Error creating rating:', error);
            // Xử lí khi gửi đánh giá thất bại, ví dụ: hiển thị thông báo lỗi, v.v.
        }
    };


    const renderStars = () => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= selectedStars) {
                stars.push(
                    <StarFill
                        className="text-warning"
                        key={i}
                        onClick={() => handleStarClick(i)}
                    />
                );
            } else {
                stars.push(
                    <Star
                        className="text-secondary"
                        key={i}
                        onClick={() => handleStarClick(i)}
                    />
                );
            }
        }

        return stars;
    };

    return (

        <div  className="rating-container">
            <div className="stars-container">
                {renderStars()}
            </div>
            <input
                className="comment-input"
                type="text"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Nhập bình luận của bạn..."
            />
            <button  className="submit-button" onClick={handleSubmit}>Gửi</button>
        </div>

    );
};

export default StarRatingComponent;
