
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Users, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'system' | 'report' | 'feedback';
  read: boolean;
  link?: string;
}

// Mocked data
const initialNotifications: Notification[] = [
  {
    id: '1',
    title: '山田さんが新しい日報を提出しました',
    message: '「プロジェクトAの進捗報告」が提出されました。確認してください。',
    date: '2025-04-16 09:30',
    type: 'report',
    read: false,
    link: '/team/1',
  },
  {
    id: '2',
    title: '佐藤さんが日報にフィードバックしました',
    message: '「週次MTGの議事録」にフィードバックがありました。',
    date: '2025-04-15 15:45',
    type: 'feedback',
    read: false,
    link: '/reports/2',
  },
  {
    id: '3',
    title: '日報システムアップデート',
    message: '4月20日にシステムメンテナンスを実施します。その間、一時的にシステムが利用できなくなります。',
    date: '2025-04-15 10:15',
    type: 'system',
    read: true,
  },
  {
    id: '4',
    title: '鈴木さんが日報を提出していません',
    message: '鈴木さんは3日間日報を提出していません。確認してください。',
    date: '2025-04-14 18:00',
    type: 'report',
    read: true,
    link: '/team/3',
  },
  {
    id: '5',
    title: '高橋さんが新しい日報を提出しました',
    message: '「クライアントミーティング報告」が提出されました。',
    date: '2025-04-14 14:30',
    type: 'report',
    read: true,
    link: '/team/4',
  },
  {
    id: '6',
    title: '部署別研修のお知らせ',
    message: '来週から部署別の研修を実施します。詳細は別途メールにてお知らせします。',
    date: '2025-04-13 11:20',
    type: 'system',
    read: true,
  },
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  
  const unreadNotifications = notifications.filter(notification => !notification.read);
  const systemNotifications = notifications.filter(notification => notification.type === 'system');
  const reportNotifications = notifications.filter(notification => notification.type === 'report');
  const feedbackNotifications = notifications.filter(notification => notification.type === 'feedback');
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system': return <Bell className="h-5 w-5 text-blue-500" />;
      case 'report': return <FileText className="h-5 w-5 text-green-500" />;
      case 'feedback': return <Users className="h-5 w-5 text-purple-500" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };
  
  const renderNotification = (notification: Notification) => (
    <Card 
      key={notification.id} 
      className={`mb-3 ${!notification.read ? 'border-l-4 border-l-primary' : ''}`}
    >
      <CardContent className="p-4">
        <div className="flex">
          <div className="mr-3 mt-1">{getNotificationIcon(notification.type)}</div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{notification.title}</h3>
                <CardDescription className="mt-1">{notification.date}</CardDescription>
              </div>
              {!notification.read && (
                <Badge className="bg-primary">新規</Badge>
              )}
            </div>
            <p className="text-sm mt-2">{notification.message}</p>
            
            <div className="flex justify-end mt-3 space-x-2">
              {notification.link && (
                <Button variant="outline" size="sm" asChild>
                  <Link to={notification.link}>詳細を見る</Link>
                </Button>
              )}
              
              {!notification.read && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => markAsRead(notification.id)}
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  既読にする
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">お知らせ</h1>
          <p className="text-muted-foreground">システムからのお知らせや通知を確認できます。</p>
        </div>
        
        {unreadNotifications.length > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            すべて既読にする
          </Button>
        )}
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">全て ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">
            未読 ({unreadNotifications.length})
            {unreadNotifications.length > 0 && (
              <span className="ml-2 w-2 h-2 rounded-full bg-primary inline-block"></span>
            )}
          </TabsTrigger>
          <TabsTrigger value="system">システム ({systemNotifications.length})</TabsTrigger>
          <TabsTrigger value="reports">日報 ({reportNotifications.length})</TabsTrigger>
          <TabsTrigger value="feedback">フィードバック ({feedbackNotifications.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {notifications.length > 0 ? (
            notifications.map(renderNotification)
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>通知はありません</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="unread">
          {unreadNotifications.length > 0 ? (
            unreadNotifications.map(renderNotification)
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle2 className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>未読の通知はありません</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="system">
          {systemNotifications.length > 0 ? (
            systemNotifications.map(renderNotification)
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>システム通知はありません</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="reports">
          {reportNotifications.length > 0 ? (
            reportNotifications.map(renderNotification)
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>日報の通知はありません</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="feedback">
          {feedbackNotifications.length > 0 ? (
            feedbackNotifications.map(renderNotification)
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="mx-auto h-8 w-8 mb-2 opacity-50" />
              <p>フィードバックの通知はありません</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
