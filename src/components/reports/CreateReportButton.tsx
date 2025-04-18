
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

const CreateReportButton: React.FC = () => {
  return (
    <div className="fixed right-6 bottom-6">
      <Link to="/create-report">
        <Button className="h-14 w-14 rounded-full shadow-lg" size="icon">
          <PlusCircle className="h-6 w-6" />
        </Button>
      </Link>
    </div>
  );
};

export default CreateReportButton;
