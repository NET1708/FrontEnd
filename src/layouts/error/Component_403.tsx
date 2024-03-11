import React from 'react';
import { Card } from 'react-bootstrap';
import { BsArrowLeft } from 'react-icons/bs';
import { FaExclamationTriangle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Component403: React.FC = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 }); // Example breakpoint

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="text-center">
        <Card.Body>
          <FaExclamationTriangle size={60} className="text-warning mb-3" />
          <Card.Title className="mb-4">403 - Access Denied</Card.Title>
          <Card.Text>
            <p>You don't have permission to access this page.</p>
            <p>Return to <NavLink to="/"><BsArrowLeft /> Home</NavLink></p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Component403;
