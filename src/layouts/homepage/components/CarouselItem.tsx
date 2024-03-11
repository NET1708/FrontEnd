import React, { useEffect, useState } from "react";
import CourseModel from "../../../models/CourseModel";
import ImageModel from "../../../models/ImageModel";
import { getAllImages, getFirstImages } from "../../../api/ImageAPI";
import { SyncLoader } from "react-spinners";

interface CarouselItemInterface {
  course: CourseModel;
}

const CarouselItem: React.FC<CarouselItemInterface> = (props) => {
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
      getFirstImages(course_id)
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
    return (
        <SyncLoader className="carouselcss" color="#36d7b7" />
    );
  }

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

  let image_url: string = "";
  if(images[0] && images[0].imageData) {
    image_url = images[0].imageData;
  }

  return (
    <div className="row align-items-center">
      <div className="col-5 text-center">
        <img
          src={image_url}
          className="float-end"
          style={{ width: "300px" }}
        />
      </div>
      <div className="col-7">
        <h5>{props.course.courseName}</h5>
      </div>
    </div>
  );
};

export default CarouselItem;
