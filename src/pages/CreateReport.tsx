
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReportForm from '@/components/reports/ReportForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CreateReport: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (values: any) => {
    console.log('Submitted report:', values);
    // In a real app, send the data to an API
    navigate('/reports');
  };
  
  const handleSaveDraft = (values: any) => {
    console.log('Saved draft:', values);
    // In a real app, save the draft to an API or local storage
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)} 
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          戻る
        </Button>
        
        <h1 className="text-2xl font-bold tracking-tight">新規日報作成</h1>
      </div>
      
      <ReportForm 
        onSubmit={handleSubmit} 
        onSaveDraft={handleSaveDraft} 
      />
    </div>
  );
};

export default CreateReport;
