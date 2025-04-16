
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FileText, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Report {
  id: string;
  title: string;
  date: string;
  content: string;
  hasFeedback: boolean;
  isRead: boolean;
  tags?: string[];
}

interface ReportCardProps {
  report: Report;
  className?: string;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, className }) => {
  return (
    <Link to={`/reports/${report.id}`}>
      <Card className={cn(
        "overflow-hidden transition-all hover:shadow-md", 
        !report.isRead ? "border-l-4 border-l-blue-500" : "",
        className
      )}>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {report.title}
            </CardTitle>
            <div className="text-xs text-muted-foreground">{report.date}</div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">{report.content}</p>
          
          {report.tags && report.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {report.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs bg-muted/50">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0 text-xs text-muted-foreground flex items-center gap-3">
          {report.hasFeedback ? (
            <span className="flex items-center gap-1 text-green-600">
              <MessageSquare className="h-3 w-3" />
              フィードバックあり
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              フィードバックなし
            </span>
          )}
          
          {report.isRead && (
            <span className="flex items-center gap-1 text-blue-600">
              <CheckCircle2 className="h-3 w-3" />
              既読
            </span>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ReportCard;
