
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  isImportant?: boolean;
}

interface AnnouncementCardProps {
  announcement: Announcement;
  className?: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, className }) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-md cursor-pointer", 
      announcement.isImportant ? "border-l-4 border-l-primary" : "",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{announcement.title}</CardTitle>
          {announcement.isImportant && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
              重要
            </span>
          )}
        </div>
        <CardDescription>{announcement.date}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{announcement.content}</p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;
