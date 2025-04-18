
import React from 'react';
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DetailedReport } from './ReportDetail';

interface ReportDownloadButtonProps {
  report: DetailedReport;
}

const ReportDownloadButton: React.FC<ReportDownloadButtonProps> = ({ report }) => {
  const handleDownload = () => {
    // レポートの内容をテキスト形式に変換
    const reportText = formatReportAsText(report);
    
    // テキストファイルを作成してダウンロード
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${report.id}-${report.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // レポートをテキスト形式にフォーマット
  const formatReportAsText = (report: DetailedReport): string => {
    return `日報: ${report.title}
日付: ${report.date}
作成者: ${report.author.name}

【本日の業務内容】
${report.content.tasks}

【課題・問題点】
${report.content.challenges}

【気づき・学び】
${report.content.insights}

【明日の予定】
${report.content.tomorrow}

【フィードバック】
${report.feedback.map(f => `${f.user.name} (${f.createdAt}):\n${f.content}`).join('\n\n')}
`;
  };
  
  return (
    <Button variant="outline" size="sm" onClick={handleDownload}>
      <Download className="h-4 w-4 mr-2" />
      ダウンロード
    </Button>
  );
};

export default ReportDownloadButton;
