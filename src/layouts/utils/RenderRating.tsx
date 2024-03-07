import { Star, StarFill } from "react-bootstrap-icons";

const renderRating = (point: number) => {

    const stars = [];

    for (let i = 0; i < point; i++) {
        if (i <= point) {
            stars.push(<StarFill className="text-warning" />);
        } else {
            stars.push(<Star className="text-secondary" />);
        }
    }

    return stars;
}

export default renderRating;