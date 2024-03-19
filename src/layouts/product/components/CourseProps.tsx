import React, { useEffect, useState } from "react";
import CourseModel from "../../../models/CourseModel";
import ImageModel from "../../../models/ImageModel";
import { getAllImages } from "../../../api/ImageAPI";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";
import renderRating from "../../utils/RenderRating";
import { createCartOrder } from "../../Cart/CreateCartOrder";
interface CoursePropsInterface {
  course: CourseModel;
}

const CourseProps: React.FC<CoursePropsInterface> = (props) => {
  const course_id = props.course.courseId;

  const [images, setImages] = useState<ImageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const carouselcss = {
    // center screen
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  useEffect(
    () => {
      getAllImages(course_id)
        .then((data) => {
          setImages(data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    },
    [] //only call 1 time
  );

  if (loading) {
    <SyncLoader className="carouselcss" style={carouselcss} color="#36d7b7" />;
  }
  const handleAddToCart = (courseId: number) => {
    const cartData = { courseID: courseId };
    // Add more cart data objects as needed

    createCartOrder(cartData)
      .then((response) => {
        console.log("Cart order created:", response);
      })
      .catch((error) => {
        console.error("Error creating cart order:", error);
      });
  };
  const handleAddToCartWrapper = () => {
    handleAddToCart(props.course.courseId);
  };
  if (error) {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-12">
            <h2>Error: {error}</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-md-3 mt-2">
      <div className="card h-100">
        {images[0] && images[0].imageData && (
          <Link to={`/course/${props.course.courseId}`}>
            <img
              src={`${images[0].imageData}`}
              className="card-img-top"
              alt={props.course.courseName}
              style={{ height: "200px" }}
            />
          </Link>
        )}
        <div className="card-body">
          <h5 className="card-title">
            <Link
              to={`/course/${props.course.courseId}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {props.course.courseName}
            </Link>
          </h5>
        </div>
        <div className="price">
          <span className="price">
            <strong>{props.course.price}</strong>
          </span>
        </div>
        <hr />
        <div className="row mt-2 mb-4" role="group">
          <div className="col-6 ">
            {renderRating(
              props.course.averageRating ? props.course.averageRating : 0
            )}
          </div>
          <div className="col-6 text-end">
            <button
              className="btn btn-danger btn-block me-4"
              onClick={handleAddToCartWrapper}
            >
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProps;
