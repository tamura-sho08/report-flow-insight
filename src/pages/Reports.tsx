import React, { useState, useMemo } from 'react';
import { Report } from '@/components/reports/ReportCard';
import ReportSearch from '@/components/reports/ReportSearch';
import ReportList from '@/components/reports/ReportList';
import CreateReportButton from '@/components/reports/CreateReportButton';
import { useAuth } from '@/contexts/AuthContext';

// Mocked data
const allReports: Report[] = [
  {
    id: '1',
    title: 'プロジェクトAの進捗報告',
    date: '2025-04-15',
    content: 'プロジェクトAの要件定義が完了し、設計フェーズに入りました。チームメンバーとの打ち合わせを実施し、今後のスケジュールを確認しました。',
    hasFeedback: true,
    isRead: true,
  },
  {
    id: '2',
    title: '週次MTGの議事録',
    date: '2025-04-14',
    content: '週次ミーティングでは、各メンバーの進捗状況と課題を共有しました。プロジェクトBの遅延について対策を協議し、リソースの再配分を決定しました。',
    hasFeedback: false,
    isRead: false,
  },
  {
    id: '3',
    title: 'クライアントとの打ち合わせ結果',
    date: '2025-04-13',
    content: 'クライアントAと要件確認の打ち合わせを実施しました。追加要件が発生し、スケジュールの調整が必要になりました。詳細は添付資料を参照してください。',
    hasFeedback: true,
    isRead: true,
  },
  {
    id: '4',
    title: 'システム障害対応報告',
    date: '2025-04-12',
    content: '昨日発生したシステム障害の原因特定と対応を行いました。原因はデータベースのコネクション不足によるものでした。今後の対策としてモニタリング強化を提案します。',
    hasFeedback: false,
    isRead: true,
  },
  {
    id: '5',
    title: '研修参加レポート',
    date: '2025-04-11',
    content: 'プロジェクト管理研修に参加しました。アジャイル開発の実践的なワークショップがあり、チーム内での活用方法について学びました。',
    hasFeedback: true,
    isRead: false,
  },
  {
    id: '6',
    title: '新機能開発の進捗状況',
    date: '2025-04-10',
    content: '新機能Xの開発を進めています。基本的な機能実装は完了し、現在テスト中です。来週中にはリリース可能な見込みです。',
    hasFeedback: false,
    isRead: true,
  },
  {
    id: '7',
    title: 'コードレビュー結果',
    date: '2025-04-09',
    content: 'メンバーBのコードレビューを実施しました。いくつかの改善点を指摘し、修正が必要です。詳細なフィードバックはGitHubのプルリクエストに記載しています。',
    hasFeedback: true,
    isRead: true,
  },
];

// 追加: 自分の日報と他者の日報を区別するために作成者IDを追加
const enhancedReports = allReports.map((report, index) => ({
  ...report,
  authorId: index % 2 === 0 ? '1' : '2' // 仮のユーザーID (1が自分、2が他者)
}));

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [statusFilter, setStatusFilter] = useState<'all' | 'read' | 'unread'>('all');

  // 絞り込まれたレポートを取得
  const filteredReports = useMemo(() => {
    // 自分の日報のみ表示
    let filtered = enhancedReports.filter(report =>
      report.authorId === user?.id || report.authorId === '1'
    );

    // 検索語でフィルタリング
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report =>
        report.date.toLowerCase().includes(term) ||
        report.content.toLowerCase().includes(term)
      );
    }

    // // 既読/未読でフィルタリング
    // if (statusFilter !== 'all') {
    //   filtered = filtered.filter(report =>
    //     statusFilter === 'read' ? report.isRead : !report.isRead
    //   );
    // }

    // 日付で並べ替え
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [searchTerm, sortOrder, statusFilter, user?.id]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">自分の日報一覧</h1>
        <p className="text-muted-foreground">あなたが提出した日報の一覧です。</p>
      </div>

      <ReportSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortOrder={sortOrder}
        onSortOrderChange={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      />

      <ReportList reports={filteredReports} />

      <CreateReportButton />
    </div>
  );
};

export default Reports;
