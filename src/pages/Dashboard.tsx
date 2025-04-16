
import React, { useState } from 'react';
import { FileText, Users, Calendar, BarChart3, Bell, X } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import NotificationAlert from '@/components/dashboard/NotificationAlert';
import TeamMembersTable, { TeamMember } from '@/components/dashboard/TeamMembersTable';
import AnnouncementCard, { Announcement } from '@/components/dashboard/AnnouncementCard';

// Mocked data
const notifications = [
  {
    id: '1',
    type: 'info',
    title: '山田さんが新しい日報を提出しました',
    description: '「プロジェクトAの進捗報告」が提出されました。確認してください。',
  },
  {
    id: '2',
    type: 'warning',
    title: '未確認のフィードバックがあります',
    description: '3件の日報にフィードバックが必要です。',
  },
];

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: '山田 太郎',
    submissionCount: 42,
    lastSubmissionDate: '2025-04-15',
    submissionRate: 95,
    sentiment: 'positive',
    hasUnreadFeedback: true,
  },
  {
    id: '2',
    name: '佐藤 花子',
    submissionCount: 38,
    lastSubmissionDate: '2025-04-15',
    submissionRate: 86,
    sentiment: 'neutral',
    hasUnreadFeedback: false,
  },
  {
    id: '3',
    name: '鈴木 一郎',
    submissionCount: 26,
    lastSubmissionDate: '2025-04-12',
    submissionRate: 59,
    sentiment: 'negative',
    hasUnreadFeedback: true,
  },
  {
    id: '4',
    name: '高橋 和子',
    submissionCount: 35,
    lastSubmissionDate: '2025-04-14',
    submissionRate: 80,
    sentiment: 'positive',
    hasUnreadFeedback: false,
  },
  {
    id: '5',
    name: '田中 健太',
    submissionCount: 30,
    lastSubmissionDate: '2025-04-13',
    submissionRate: 68,
    sentiment: 'neutral',
    hasUnreadFeedback: false,
  },
];

const announcements: Announcement[] = [
  {
    id: '1',
    title: '日報システムアップデートのお知らせ',
    content: '4月20日にシステムメンテナンスを実施します。その間、一時的にシステムが利用できなくなります。',
    date: '2025-04-15',
    isImportant: true,
  },
  {
    id: '2',
    title: '部署別研修のお知らせ',
    content: '来週から部署別の研修を実施します。詳細は別途メールにてお知らせします。',
    date: '2025-04-14',
  },
  {
    id: '3',
    title: '新入社員歓迎会のお知らせ',
    content: '4月25日に新入社員歓迎会を開催します。参加希望の方は総務部までご連絡ください。',
    date: '2025-04-13',
  },
];

const Dashboard: React.FC = () => {
  const [activeNotifications, setActiveNotifications] = useState(notifications);
  
  const dismissNotification = (id: string) => {
    setActiveNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ダッシュボード</h1>
        <p className="text-muted-foreground">あなたのチームと日報の状況を確認できます。</p>
      </div>
      
      {/* Notifications */}
      {activeNotifications.length > 0 && (
        <div className="space-y-2">
          {activeNotifications.map((notification) => (
            <NotificationAlert
              key={notification.id}
              type={notification.type as any}
              title={notification.title}
              description={notification.description}
              onDismiss={() => dismissNotification(notification.id)}
            />
          ))}
        </div>
      )}
      
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="あなたの日報提出数"
          value="32"
          icon={<FileText className="h-4 w-4" />}
          description="先月比 +12%"
        />
        <StatsCard
          title="提出率"
          value="91%"
          icon={<BarChart3 className="h-4 w-4" />}
          description="目標: 90%"
        />
        <StatsCard
          title="チームメンバー"
          value="5"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="未確認レポート"
          value="3"
          icon={<Bell className="h-4 w-4" />}
          description="確認が必要です"
        />
      </div>
      
      {/* Team Members */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">チームメンバー</h2>
          <span className="text-sm text-muted-foreground">合計: {teamMembers.length}人</span>
        </div>
        <TeamMembersTable members={teamMembers} />
      </div>
      
      {/* Announcements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">お知らせ</h2>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
