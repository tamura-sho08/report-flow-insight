
import React, { useState, useMemo } from 'react';
import ReportCard, { Report } from '@/components/reports/ReportCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Calendar 
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// 追加: 自分の日報と他者の日報を区別するために作成者IDを追加
const enhancedReports = allReports.map((report, index) => ({
  ...report,
  authorId: index % 2 === 0 ? '1' : '2' // 仮のユーザーID (1が自分、2が他者)
}));

const Reports: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('my-reports');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // タグの一覧を取得
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    enhancedReports.forEach(report => {
      report.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // 絞り込まれたレポートを取得
  const filteredReports = useMemo(() => {
    // 自分/他者の日報でフィルタリング
    let filtered = enhancedReports.filter(report => {
      if (activeTab === 'my-reports') {
        return report.authorId === user?.id || report.authorId === '1'; // 自分の日報
      } else if (activeTab === 'team-reports') {
        return report.authorId !== user?.id && report.authorId !== '1'; // 他者の日報
      }
      return true; // その他のタブ（全て、未読、フィードバック）は通常通り
    });

    // 検索語でフィルタリング
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(report => 
        report.title.toLowerCase().includes(term) || 
        report.content.toLowerCase().includes(term) ||
        (report.tags && report.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }

    // タグでフィルタリング
    if (filterTag) {
      filtered = filtered.filter(report => 
        report.tags && report.tags.includes(filterTag)
      );
    }

    // 日付で並べ替え
    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }, [searchTerm, sortOrder, filterTag, activeTab, user?.id]);

  // 未読とフィードバックのレポートをフィルタリング
  const unreadReports = filteredReports.filter(report => !report.isRead);
  const feedbackReports = filteredReports.filter(report => report.hasFeedback);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">日報一覧</h1>
        <p className="text-muted-foreground">日報の一覧です。</p>
      </div>

      {/* 検索とフィルタリングコントロール */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="検索..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={filterTag || undefined} onValueChange={setFilterTag}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>{filterTag || "タグでフィルタ"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべてのタグ</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag}>{tag}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            title={sortOrder === 'asc' ? '新しい順に並べ替え' : '古い順に並べ替え'}
          >
            {sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="my-reports" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="my-reports">自分の日報</TabsTrigger>
          <TabsTrigger value="team-reports">チームの日報</TabsTrigger>
          <TabsTrigger value="unread">未読 ({unreadReports.length})</TabsTrigger>
          <TabsTrigger value="feedback">フィードバックあり ({feedbackReports.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-reports" className="space-y-4">
          {filteredReports.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>該当する日報はありません</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="team-reports" className="space-y-4">
          {filteredReports.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredReports.map((report) => (
                <ReportCard key={report.id} report={report} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>該当する日報はありません</p>
            </div>
          )}
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
