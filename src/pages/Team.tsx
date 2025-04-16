
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mocked data
const teamMembers = [
  {
    id: '1',
    name: '山田 太郎',
    position: 'エンジニア',
    department: '開発部',
    submissionCount: 42,
    lastSubmissionDate: '2025-04-15',
    pendingReports: 0,
    sentiment: 'positive',
  },
  {
    id: '2',
    name: '佐藤 花子',
    position: 'デザイナー',
    department: 'デザイン部',
    submissionCount: 38,
    lastSubmissionDate: '2025-04-15',
    pendingReports: 2,
    sentiment: 'neutral',
  },
  {
    id: '3',
    name: '鈴木 一郎',
    position: 'マーケター',
    department: 'マーケティング部',
    submissionCount: 26,
    lastSubmissionDate: '2025-04-12',
    pendingReports: 3,
    sentiment: 'negative',
  },
  {
    id: '4',
    name: '高橋 和子',
    position: 'プロジェクトマネージャー',
    department: 'PMO',
    submissionCount: 35,
    lastSubmissionDate: '2025-04-14',
    pendingReports: 1,
    sentiment: 'positive',
  },
  {
    id: '5',
    name: '田中 健太',
    position: 'カスタマーサポート',
    department: 'サポート部',
    submissionCount: 30,
    lastSubmissionDate: '2025-04-13',
    pendingReports: 0,
    sentiment: 'neutral',
  },
];

const getSentimentColor = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return 'bg-green-100 text-green-800';
    case 'neutral': return 'bg-yellow-100 text-yellow-800';
    case 'negative': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getSentimentText = (sentiment: string) => {
  switch (sentiment) {
    case 'positive': return '前向き';
    case 'neutral': return '普通';
    case 'negative': return '要注意';
    default: return '不明';
  }
};

const Team: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">チームメンバー</h1>
        <p className="text-muted-foreground">チームメンバーの日報提出状況を確認できます。</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Link key={member.id} to={`/team/${member.id}`}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                    </div>
                  </div>
                  
                  <Badge className={getSentimentColor(member.sentiment)}>
                    {getSentimentText(member.sentiment)}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">部署</span>
                    <span>{member.department}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">最終提出日</span>
                    <span>{member.lastSubmissionDate}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center text-primary">
                        <FileText className="h-4 w-4 mr-1" />
                        <span className="font-bold">{member.submissionCount}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">提出数</p>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded-md">
                      <div className="flex items-center text-primary">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span className="font-bold">{member.pendingReports}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">未確認</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Team;
