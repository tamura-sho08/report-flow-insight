
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, BarChart3, Calendar, AlertCircle } from 'lucide-react';
import ReportCard, { Report } from '@/components/reports/ReportCard';

// Mocked data
const memberData = {
  id: '1',
  name: '山田 太郎',
  position: 'エンジニア',
  email: 'yamada@example.com',
  department: '開発部',
  joinedDate: '2023年4月1日',
  stats: {
    submissionCount: 42,
    submissionRate: 95,
    averageFeedbackTime: '2日',
    pendingFeedbacks: 2,
  },
  reports: [
    {
      id: '101',
      title: 'プロジェクトAの進捗報告',
      date: '2025-04-15',
      content: 'プロジェクトAの要件定義が完了し、設計フェーズに入りました。チームとの打ち合わせを実施し、今後のスケジュールを確認しました。',
      hasFeedback: true,
      isRead: true,
      tags: ['プロジェクトA', '要件定義']
    },
    {
      id: '102',
      title: '週次MTGの議事録',
      date: '2025-04-14',
      content: '週次ミーティングでは、各メンバーの進捗状況と課題を共有しました。プロジェクトBの遅延について対策を協議しました。',
      hasFeedback: false,
      isRead: false,
      tags: ['ミーティング', '週次報告']
    },
    {
      id: '103',
      title: 'クライアントとの打ち合わせ結果',
      date: '2025-04-13',
      content: 'クライアントAと要件確認の打ち合わせを実施しました。追加要件が発生し、スケジュールの調整が必要になりました。',
      hasFeedback: true,
      isRead: true,
      tags: ['クライアントA', '要件確認']
    },
    {
      id: '104',
      title: 'システム障害対応報告',
      date: '2025-04-12',
      content: '昨日発生したシステム障害の原因特定と対応を行いました。原因はデータベースのコネクション不足によるものでした。',
      hasFeedback: false,
      isRead: true,
      tags: ['障害対応', 'システム運用']
    },
    {
      id: '105',
      title: '研修参加レポート',
      date: '2025-04-11',
      content: 'プロジェクト管理研修に参加しました。アジャイル開発の実践的なワークショップがあり、チーム内での活用方法について学びました。',
      hasFeedback: true,
      isRead: false,
      tags: ['研修', 'スキルアップ']
    },
  ],
};

const TeamMember: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setMember(memberData);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const pendingReports = member?.reports.filter((report: Report) => !report.isRead) || [];
  const withFeedback = member?.reports.filter((report: Report) => report.hasFeedback) || [];
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-pulse text-center">
          <p className="text-lg text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }
  
  if (!member) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-2">メンバーが見つかりません</h2>
        <p className="text-muted-foreground mb-4">指定されたIDのメンバーは存在しないか、削除された可能性があります。</p>
        <Button variant="outline" onClick={() => navigate('/')}>
          ダッシュボードに戻る
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
        
        <h1 className="text-2xl font-bold tracking-tight">メンバー詳細</h1>
      </div>
      
      {/* Member Profile */}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 mr-3 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">{member.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-xl">{member.name}</h2>
                <p className="text-sm text-muted-foreground">{member.position} ・ {member.department}</p>
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">メール</p>
              <p>{member.email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">所属部署</p>
              <p>{member.department}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">参加日</p>
              <p>{member.joinedDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">日報提出数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="h-4 w-4 text-primary mr-2" />
              <span className="text-2xl font-bold">{member.stats.submissionCount}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">提出率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 text-primary mr-2" />
              <span className="text-2xl font-bold">{member.stats.submissionRate}%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">平均フィードバック時間</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-primary mr-2" />
              <span className="text-2xl font-bold">{member.stats.averageFeedbackTime}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">未確認レポート</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-primary mr-2" />
              <span className="text-2xl font-bold">{member.stats.pendingFeedbacks}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Member Reports */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">日報一覧</h2>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">全て ({member.reports.length})</TabsTrigger>
            <TabsTrigger value="pending">未確認 ({pendingReports.length})</TabsTrigger>
            <TabsTrigger value="feedback">フィードバック済 ({withFeedback.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {member.reports.map((report: Report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingReports.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {pendingReports.map((report: Report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>未確認の日報はありません</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="feedback" className="space-y-4">
            {withFeedback.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {withFeedback.map((report: Report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>フィードバック済みの日報はありません</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeamMember;
