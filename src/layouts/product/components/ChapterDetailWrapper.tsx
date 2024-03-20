import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../../layouts/header-footer/Navbar';
import Footer from '../../../layouts/header-footer/Footer';

const ChapterDetailWrapper = ({ searchKey, setSearchKey, children }: { searchKey: string, setSearchKey: (key: string) => void, children: React.ReactNode }) => {
  const location = useLocation();
  const isChapterDetailPage = location.pathname.includes('/course/') && location.pathname.includes('/chapter/');

  return (
    <>
      <Navbar searchKey={searchKey} setKey={setSearchKey} />
      {children}
      {!isChapterDetailPage && <Footer />}
    </>
  );
};

export default ChapterDetailWrapper;