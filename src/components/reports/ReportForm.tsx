
import React, { useState } from 'react';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, Save, SendHorizontal } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ja } from 'date-fns/locale';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(1, { message: 'タイトルを入力してください' }),
  date: z.date(),
  tasks: z.string().min(1, { message: '作業内容を入力してください' }),
  challenges: z.string().optional(),
  insights: z.string().optional(),
  tomorrow: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ReportFormProps {
  onSubmit: (values: FormValues) => void;
  onSaveDraft?: (values: FormValues) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit, onSaveDraft }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: new Date(),
      tasks: '',
      challenges: '',
      insights: '',
      tomorrow: '',
    },
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (values: FormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(values);
      setIsSubmitting(false);
      toast.success('日報を提出しました');
    }, 500);
  };
  
  const handleSaveDraft = () => {
    const values = form.getValues();
    setIsSaving(true);
    setTimeout(() => {
      onSaveDraft?.(values);
      setIsSaving(false);
      toast.success('下書きを保存しました');
    }, 500);
  };
  
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>日報作成</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タイトル</FormLabel>
                    <FormControl>
                      <Input placeholder="日報のタイトル" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>日付</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'yyyy年MM月dd日 (EEE)', { locale: ja })
                            ) : (
                              <span>日付を選択</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="tasks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>作業内容</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="今日行った作業内容を入力してください" 
                      {...field} 
                      rows={5}
                    />
                  </FormControl>
                  <FormDescription>
                    今日行った業務内容を具体的に記入してください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>課題</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="業務を進める上での課題があれば入力してください" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="insights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>気づき</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="業務を通して気づいたことを入力してください" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="tomorrow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>明日の作業予定</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="明日予定している作業内容を入力してください" 
                      {...field} 
                      rows={3}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-3">
              {onSaveDraft && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleSaveDraft}
                  disabled={isSaving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  下書き保存
                </Button>
              )}
              
              <Button type="submit" disabled={isSubmitting}>
                <SendHorizontal className="mr-2 h-4 w-4" />
                提出する
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ReportForm;
