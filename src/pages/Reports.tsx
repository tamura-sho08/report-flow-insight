
import React from 'react';
import ReportCard, { Report } from '@/components/reports/ReportCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mocked data
const allReports: Report[] = [
  {
    id: '1',
    title: 'プロジェクトAの進捗報告',
    date: '2025-04-15',
    content: 'プロジェクトAの要件定義が完了し、設計フェーズに入りました。チームメンバーとの打ち合わせを実施し、今後のスケジュールを確認しました。',
    hasFeedback: true,
    isRead: true,
    tags: ['プロジェクトA', '要件定義']
  },
  {
    id: '2',
    title: '週次MTGの議事録',
    date: '2025-04-14',
    content: '週次ミーティングでは、各メンバーの進捗状況と課題を共有しました。プロジェクトBの遅延について対策を協議し、リソースの再配分を決定しました。',
    hasFeedback: false,
    isRead: false,
    tags: ['ミーティング', '週次報告']
  },
  {
    id: '3',
    title: 'クライアントとの打ち合わせ結果',
    date: '2025-04-13',
    content: 'クライアントAと要件確認の打ち合わせを実施しました。追加要件が発生し、スケジュールの調整が必要になりました。詳細は添付資料を参照してください。',
    hasFeedback: true,
    isRead: true,
    tags: ['クライアントA', '要件確認']
  },
  {
    id: '4',
    title: 'システム障害対応報告',
    date: '2025-04-12',
    content: '昨日発生したシステム障害の原因特定と対応を行いました。原因はデータベースのコネクション不足によるものでした。今後の対策としてモニタリング強化を提案します。',
    hasFeedback: false,
    isRead: true,
    tags: ['障害対応', 'システム運用']
  },
  {
    id: '5',
    title: '研修参加レポート',
    date: '2025-04-11',
    content: 'プロジェクト管理研修に参加しました。アジャイル開発の実践的なワークショップがあり、チーム内での活用方法について学びました。',
    hasFeedback: true,
    isRead: false,
    tags: ['研修', 'スキルアップ']
  },
  {
    id: '6',
    title: '新機能開発の進捗状況',
    date: '2025-04-10',
    content: '新機能Xの開発を進めています。基本的な機能実装は完了し、現在テスト中です。来週中にはリリース可能な見込みです。',
    hasFeedback: false,
    isRead: true,
    tags: ['開発', '新機能']
  },
  {
    id: '7',
    title: 'コードレビュー結果',
    date: '2025-04-09',
    content: 'メンバーBのコードレビューを実施しました。いくつかの改善点を指摘し、修正が必要です。詳細なフィードバックはGitHubのプルリクエストに記載しています。',
    hasFeedback: true,
    isRead: true,
    tags: ['コードレビュー', '品質管理']
  },
];

const unreadReports = allReports.filter(report => !report.isRead);
const feedbackReports = allReports.filter(report => report.hasFeedback);

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">日報一覧</h1>
        <p className="text-muted-foreground">あなたが提出した日報の一覧です。</p>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">全て ({allReports.length})</TabsTrigger>
          <TabsTrigger value="unread">未読 ({unreadReports.length})</TabsTrigger>
          <TabsTrigger value="feedback">フィードバックあり ({feedbackReports.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {allReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="unread" className="space-y-4">
          {unreadReports.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {unreadReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>未読の日報はありません</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-4">
          {feedbackReports.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {feedbackReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>フィードバックのある日報はありません</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
