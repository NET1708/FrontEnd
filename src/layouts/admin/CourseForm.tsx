import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { RiInputMethodLine, RiPriceTag3Line } from 'react-icons/ri';
import { BiCommentDetail } from 'react-icons/bi';
import ImageUploadComponent from './components/ImageUploadComponent';
import RequireAdmin from './components/RequireAdmin';
import Select from 'react-select';
import { getAllCategories } from '../../api/CategoryAPI';

const CourseForm: React.FC = () => {
  const [course, setCourse] = useState({
    courseId: 0,
    courseName: "",
    description: "",
    price: 0,
    averageRating: 0,
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

  const options = categories;

  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const handleCategoriesChange = (selectedCategories: any) => {
    setSelectedCategories(selectedCategories);
  };

  const handleChapter = (chapter: string) => {
    setChapter(chapter);
  };

  const [images, setImages] = useState<File[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCourse(prevState => ({ ...prevState, [name]: value }));
  };

  const handleImageUpload = (images: File[]) => {
    setImages(images);
  };

  //Convert images to base64
  const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const body_req = {
      courseName: course.courseName,
      description: course.description,
      price: course.price,
      categories: selectedCategories.map((category) => category.value),
      chapter_content: chapter
    };
    console.log(body_req);
    try {
      const uploadCourseResponse = await fetch('http://localhost:8888/course/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body_req),
      });

      const base64DataList = [];
      for (const image of images) {
        const base64Data = await getBase64(image);
        base64DataList.push(base64Data);
      }

      //console log uploadCourseResponse
      // console.log(uploadCourseResponse);

      //console base64DataList
      // console.log('base64DataList: ' + base64DataList);

      //Get new course id
      const newCourse = await uploadCourseResponse.json();
      // console.log('new course: ' + JSON.stringify(newCourse));
      const newCourseId = newCourse.courseId;
      // console.log('new course id: ' + newCourseId);

      for (const image of images) {
        const base64Data = await getBase64(image);
        const response = await fetch('http://localhost:8888/image/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ courseId: newCourseId, imageData: base64Data }),
        });
        if (!response.ok) {
          alert('Có lỗi xảy ra khi thêm hình ảnh');
          return;
        } else {
          setImages([]);
        }
      }

      if (uploadCourseResponse.ok) {
        alert('Thêm khóa học và hình ảnh thành công');
        setCourse({
          courseId: 0,
          courseName: "",
          description: "",
          price: 0,
          averageRating: 0,
        });
        setImages([]);
      } else {
        alert('Có lỗi xảy ra khi thêm khóa học');
      }
    } catch (error) {
      console.log('Failed to upload course and images', error);
      alert('Có lỗi xảy ra khi thêm khóa học hoặc hình ảnh');
    }
  }

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2>Thêm khóa học mới</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="courseName">
              <Form.Label><RiInputMethodLine /> Tên khóa học:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter course name"
                name="courseName"
                value={course.courseName}
                onChange={handleChange}
                className='mb-2'
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label><BiCommentDetail /> Thông tin mô tả:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter course description"
                name="description"
                value={course.description}
                onChange={handleChange}
                className='mb-2'
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label><RiPriceTag3Line /> Giá bán:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={course.price}
                onChange={handleChange}
                className='mb-2'
              />
            </Form.Group>
            <Form.Group controlId="categories">
              <Form.Label><RiPriceTag3Line /> Categories</Form.Label>
              <Select
                isMulti
                name="categories"
                options={options}
                value={selectedCategories}
                onChange={handleCategoriesChange}
                className="mb-2"
                inputValue=""
                onInputChange={() => { }}
                onMenuOpen={() => { }}
                onMenuClose={() => { }}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Thêm
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h2>Chọn ảnh</h2>
          {/* Add your image upload component here */}
          {/* For example: */}
          <ImageUploadComponent onImageUpload={handleImageUpload} Chapter={handleChapter} />
        </Col>
      </Row>
    </Container>
  );
};
const CourseForm_Admin = RequireAdmin(CourseForm);
export default CourseForm_Admin;