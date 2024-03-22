import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { RiInputMethodLine, RiPriceTag3Line } from 'react-icons/ri';
import { BiCommentDetail } from 'react-icons/bi';
import ImageUploadComponent from './components/ImageUploadComponent';
import RequireAdmin from './components/RequireAdmin';
import Select from 'react-select';
import { getAllCategories } from '../../api/CategoryAPI';



const CategoryForm: React.FC = () => {
    const [category, setCategory] = useState({
      categoryId: 0,
      categoryName: "",
    });
  
    const [categories, setCategories] = useState<any[]>([]);
  
    const [chapter, setChapter] = useState<string>("");
  
    useEffect(() => {
      getAllCategories().then((data) => {
        const options = data.map((category) => {
          return {
            value: category.categoryId,
            label: category.categoryName
          }
        });
        setCategories(options);
      });
    }
      , []);
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCategory(prevState => ({ ...prevState, [name]: value }));
      };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const token = localStorage.getItem('token');     
      try {
        const uploadCategoryResponse = await fetch('http://localhost:8888/category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(category),
        });
  
  
        if (uploadCategoryResponse.ok) {
          alert('Thêm loại khóa học thành công');
          setCategory({
            categoryId: 0,
            categoryName: "",
          });        
        } else {
          alert('Có lỗi xảy ra khi thêm loại khóa học');
        }
      } catch (error) {
        console.log('Failed to upload course and images', error);
        alert('Có lỗi xảy ra khi thêm loại khóa học');
      }
    }
  
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h2>Thêm loại khóa học mới</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="categoryName">
                <Form.Label><RiInputMethodLine /> Tên khóa học:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Thêm tên loại khóa học"
                  name="categoryName"
                  value={category.categoryName}
                  onChange={handleChange}
                  className='mb-2'
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Thêm
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  const CategoryForm_Admin = RequireAdmin(CategoryForm);
  export default CategoryForm_Admin;