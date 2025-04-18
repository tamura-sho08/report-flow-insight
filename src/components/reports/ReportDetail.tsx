
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Share2, ThumbsUp, MessageSquare, Heart, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface ReportFeedback {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

export interface DetailedReport {
  id: string;
  title: string;
  date: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: {
    tasks: string;
    challenges: string;
    insights: string;
    tomorrow: string;
  };
  feedback: ReportFeedback[];
  reactions: {
    thumbsUp: number;
    heart: number;
  };
  userReaction?: 'thumbsUp' | 'heart' | null;
  isRead: boolean;
}

interface ReportDetailProps {
  report: DetailedReport;
  isTeamMember?: boolean;
  onAddFeedback?: (reportId: string, content: string) => void;
  onReaction?: (reportId: string, type: 'thumbsUp' | 'heart') => void;
  onMarkAsRead?: (reportId: string) => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({
  report,
  isTeamMember = false,
  onAddFeedback,
  onReaction,
  onMarkAsRead,
}) => {
  const [feedbackContent, setFeedbackContent] = useState('');
  
  const handleSubmitFeedback = () => {
    if (!feedbackContent.trim()) return;
    
    onAddFeedback?.(report.id, feedbackContent);
    setFeedbackContent('');
    toast.success('フィードバックを送信しました');
  };
  
  const handleReaction = (type: 'thumbsUp' | 'heart') => {
    onReaction?.(report.id, type);
    
    if (report.userReaction === type) {
      toast.success('リアクションを取り消しました');
    } else {
      toast.success('リアクションを送信しました');
    }
  };
  
  const handleMarkAsRead = () => {
    if (!report.isRead) {
      onMarkAsRead?.(report.id);
      toast.success('既読にしました');
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{report.title}</CardTitle>
              <CardDescription>
                提出日: {report.date}
                {report.author && (
                  <div className="mt-1 flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={report.author.avatar} alt={report.author.name} />
                      <AvatarFallback>{report.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{report.author.name}</span>
                    {report.author.department && (
                      <span className="text-sm text-muted-foreground">
                        • {report.author.department}
                      </span>
                    )}
                  </div>
                )}
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              {!report.isRead && isTeamMember && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs" 
                  onClick={handleMarkAsRead}
                >
                  <CheckCircle className="mr-1 h-3 w-3" />
                  既読にする
                </Button>
              )}
              
              <div className="flex -space-x-1">
                <Button
                  variant={report.userReaction === 'thumbsUp' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleReaction('thumbsUp')}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="sr-only">いいね</span>
                </Button>
                <Badge variant="outline" className="pl-5 -ml-3 bg-background">
                  {report.reactions.thumbsUp}
                </Badge>
              </div>
              
              <div className="flex -space-x-1">
                <Button
                  variant={report.userReaction === 'heart' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleReaction('heart')}
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">ありがとう</span>
                </Button>
                <Badge variant="outline" className="pl-5 -ml-3 bg-background">
                  {report.reactions.heart}
                </Badge>
              </div>
              
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">共有</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-medium">作業内容</h3>
            <p className="text-sm whitespace-pre-line">{report.content.tasks}</p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium">課題</h3>
            <p className="text-sm whitespace-pre-line">{report.content.challenges}</p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium">気づき</h3>
            <p className="text-sm whitespace-pre-line">{report.content.insights}</p>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium">明日の作業予定</h3>
            <p className="text-sm whitespace-pre-line">{report.content.tomorrow}</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Feedback section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">フィードバック</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {report.feedback.length > 0 ? (
            <div className="space-y-4">
              {report.feedback.map((feedback) => (
                <div key={feedback.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={feedback.user.avatar} alt={feedback.user.name} />
                    <AvatarFallback>{feedback.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium">{feedback.user.name}</p>
                      <span className="text-xs text-muted-foreground">{feedback.createdAt}</span>
                    </div>
                    <p className="text-sm">{feedback.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <MessageSquare className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>まだフィードバックはありません</p>
            </div>
          )}
          
          {isTeamMember && (
            <div className="pt-4 space-y-3">
              <Textarea
                placeholder="フィードバックを入力してください..."
                value={feedbackContent}
                onChange={(e) => setFeedbackContent(e.target.value)}
                className="resize-none"
                rows={3}
              />
              
              <div className="flex justify-end">
                <Button onClick={handleSubmitFeedback} disabled={!feedbackContent.trim()}>
                  送信する
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportDetail;
