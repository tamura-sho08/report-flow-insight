
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // This page will automatically redirect to the dashboard
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">読み込み中...</h1>
        <p className="text-xl text-gray-600">アプリケーションを起動しています</p>
      </div>
    </div>
  );
};

export default Index;
