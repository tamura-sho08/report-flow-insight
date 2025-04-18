
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle, AlertCircle, Frown, Meh, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  submissionCount: number;
  lastSubmissionDate: string;
  submissionRate: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  hasUnreadFeedback: boolean;
}

interface TeamMembersTableProps {
  members: TeamMember[];
}

const TeamMembersTable: React.FC<TeamMembersTableProps> = ({ members }) => {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Smile className="inline-block mr-1 text-sentiment-positive" size={16} />;
      case 'neutral':
        return <Meh className="inline-block mr-1 text-sentiment-neutral" size={16} />;
      case 'negative':
        return <Frown className="inline-block mr-1 text-sentiment-negative" size={16} />;
      default:
        return null;
    }
  };

  const getSubmissionRateBadge = (rate: number) => {
    if (rate >= 90) {
      return <Badge className="bg-green-500">優秀</Badge>;
    } else if (rate >= 70) {
      return <Badge className="bg-blue-500">良好</Badge>;
    } else if (rate >= 50) {
      return <Badge className="bg-yellow-500">改善中</Badge>;
    } else {
      return <Badge className="bg-red-500">要注意</Badge>;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">メンバー</TableHead>
            <TableHead>提出回数</TableHead>
            <TableHead>最終提出日</TableHead>
            <TableHead>提出率</TableHead>
            <TableHead>傾向分析</TableHead>
            <TableHead>ステータス</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">
                <Link to={`/team/${member.id}`} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/10 mr-2 flex items-center justify-center">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-primary font-bold">{member.name.charAt(0)}</span>
                    )}
                  </div>
                  <span>{member.name}</span>
                  {member.hasUnreadFeedback && (
                    <span className="ml-2 inline-block notification-dot animate-pulse-light" title="未確認のフィードバックがあります"></span>
                  )}
                </Link>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <FileText size={16} className="mr-1 text-muted-foreground" />
                  {member.submissionCount}
                </div>
              </TableCell>
              <TableCell>{member.lastSubmissionDate}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-full max-w-[80px] bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${member.submissionRate}%` }}
                    ></div>
                  </div>
                  <span>{member.submissionRate}%</span>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  {getSentimentIcon(member.sentiment)}
                  <span className={`text-sentiment-${member.sentiment}`}>
                    {member.sentiment === 'positive' ? '前向き' :
                      member.sentiment === 'neutral' ? '普通' : '要注意'}
                  </span>
                </div>
              </TableCell>
              <TableCell>{getSubmissionRateBadge(member.submissionRate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamMembersTable;
