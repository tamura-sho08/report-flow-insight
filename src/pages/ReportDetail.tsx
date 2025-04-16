
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReportDetailComponent, { DetailedReport } from '@/components/reports/ReportDetail';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Mocked data
const reportData: DetailedReport = {
  id: '1',
  title: 'プロジェクトAの進捗報告',
  date: '2025-04-15',
  author: {
    id: 'user1',
    name: '山田 太郎',
  },
  content: {
    tasks: 'プロジェクトAの要件定義を完了させました。主な作業内容は以下の通りです：\n\n1. クライアントとの要件確認ミーティング\n2. 要件定義書の作成\n3. 開発チームとの共有と調整\n\n次のフェーズとして、設計作業に着手します。',
    challenges: '要件の一部に不明確な点があり、クライアントに追加の確認が必要です。また、スケジュールがタイトなため、効率的な作業配分が課題です。',
    insights: '今回のプロジェクトでは、初期段階でのコミュニケーションの重要性を再認識しました。曖昧な要件はすぐに確認することで、後工程での手戻りを防ぐことができます。',
    tomorrow: '1. 設計書のドラフト作成\n2. データベース構造の検討\n3. クライアントへの追加確認事項の整理と問い合わせ',
  },
  feedback: [
    {
      id: 'feedback1',
      user: {
        id: 'manager1',
        name: '佐藤 部長',
      },
      content: '要件定義の完了、お疲れ様でした。クライアントとの追加確認事項については優先的に対応し、設計作業に遅れが出ないようにしてください。必要であれば、リソースの追加も検討します。',
      createdAt: '2025-04-15 14:30',
    },
    {
      id: 'feedback2',
      user: {
        id: 'team1',
        name: '鈴木 リーダー',
      },
      content: '要件定義書の内容を確認しました。非常に明確にまとめられており、開発チームとしても理解しやすい内容になっています。データベース構造については、明日の打ち合わせで一緒に検討しましょう。',
      createdAt: '2025-04-15 16:45',
    },
  ],
  reactions: {
    thumbsUp: 3,
    heart: 1,
  },
  userReaction: null,
  isRead: true,
};

const ReportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<DetailedReport | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      // In a real app, fetch the report by ID from an API
      setReport(reportData);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleAddFeedback = (reportId: string, content: string) => {
    if (!report) return;
    
    const newFeedback = {
      id: `feedback${Date.now()}`,
      user: {
        id: 'currentUser',
        name: 'あなた',
      },
      content,
      createdAt: new Date().toLocaleString(),
    };
    
    setReport({
      ...report,
      feedback: [...report.feedback, newFeedback],
    });
  };
  
  const handleReaction = (reportId: string, type: 'thumbsUp' | 'heart') => {
    if (!report) return;
    
    const newReactions = { ...report.reactions };
    
    if (report.userReaction === type) {
      // Remove reaction
      newReactions[type] -= 1;
      setReport({
        ...report,
        reactions: newReactions,
        userReaction: null,
      });
    } else {
      // Add new reaction
      if (report.userReaction) {
        // Remove previous reaction
        newReactions[report.userReaction] -= 1;
      }
      newReactions[type] += 1;
      setReport({
        ...report,
        reactions: newReactions,
        userReaction: type,
      });
    }
  };
  
  const handleMarkAsRead = (reportId: string) => {
    if (!report) return;
    
    setReport({
      ...report,
      isRead: true,
    });
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse text-center">
          <p className="text-lg text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }
  
  if (!report) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-2">報告が見つかりません</h2>
        <p className="text-muted-foreground mb-4">指定されたIDの日報は存在しないか、削除された可能性があります。</p>
        <Button variant="outline" onClick={() => navigate('/reports')}>
          一覧に戻る
        </Button>
      </div>
    );
  }
  
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
        
        <h1 className="text-2xl font-bold tracking-tight">日報詳細</h1>
      </div>
      
      <ReportDetailComponent
        report={report}
        isTeamMember={true}
        onAddFeedback={handleAddFeedback}
        onReaction={handleReaction}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default ReportDetail;
