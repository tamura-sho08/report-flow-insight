
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('プロフィールを保存しました');
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('通知設定を保存しました');
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">設定</h1>
        <p className="text-muted-foreground">アカウントやアプリの設定を管理できます。</p>
      </div>
      
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
          <TabsTrigger value="appearance">表示設定</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>プロフィール</CardTitle>
              <CardDescription>
                個人情報を管理します。このプロフィールはチームメンバーに表示されます。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSaveProfile}>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">氏名</Label>
                      <Input id="name" defaultValue="管理者 太郎" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">メールアドレス</Label>
                      <Input id="email" type="email" defaultValue="admin@example.com" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="position">役職</Label>
                      <Input id="position" defaultValue="マネージャー" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">部署</Label>
                      <Input id="department" defaultValue="マネジメント部" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">自己紹介</Label>
                    <Input id="bio" defaultValue="チームのマネジメントを担当しています。" />
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button type="submit">保存する</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>
                通知の受け取り方を管理します。
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSaveNotifications}>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">メール通知</h3>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_new_reports">新しい日報</Label>
                      <p className="text-sm text-muted-foreground">
                        メンバーが新しい日報を提出した時に通知を受け取る
                      </p>
                    </div>
                    <Switch id="email_new_reports" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_feedback">フィードバック</Label>
                      <p className="text-sm text-muted-foreground">
                        自分の日報にフィードバックがあった時に通知を受け取る
                      </p>
                    </div>
                    <Switch id="email_feedback" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email_system">システム通知</Label>
                      <p className="text-sm text-muted-foreground">
                        システムのメンテナンスやアップデートの通知を受け取る
                      </p>
                    </div>
                    <Switch id="email_system" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-4 pt-4">
                  <h3 className="text-lg font-medium">アプリ内通知</h3>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app_new_reports">新しい日報</Label>
                      <p className="text-sm text-muted-foreground">
                        メンバーが新しい日報を提出した時に通知を受け取る
                      </p>
                    </div>
                    <Switch id="app_new_reports" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app_feedback">フィードバック</Label>
                      <p className="text-sm text-muted-foreground">
                        自分の日報にフィードバックがあった時に通知を受け取る
                      </p>
                    </div>
                    <Switch id="app_feedback" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app_reminders">リマインダー</Label>
                      <p className="text-sm text-muted-foreground">
                        日報の提出期限が近づいた時にリマインダーを受け取る
                      </p>
                    </div>
                    <Switch id="app_reminders" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="ml-auto">保存する</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>表示設定</CardTitle>
              <CardDescription>
                アプリの表示方法をカスタマイズします。
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">テーマ</h3>
                <Separator />
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-md p-4 cursor-pointer bg-white">
                    <div className="space-y-2">
                      <div className="w-full h-10 bg-white border rounded-md"></div>
                      <div className="w-full h-40 bg-gray-50 border rounded-md"></div>
                    </div>
                    <p className="text-sm text-center mt-2">ライト</p>
                  </div>
                  
                  <div className="border rounded-md p-4 cursor-pointer">
                    <div className="space-y-2">
                      <div className="w-full h-10 bg-gray-900 border border-gray-700 rounded-md"></div>
                      <div className="w-full h-40 bg-gray-800 border border-gray-700 rounded-md"></div>
                    </div>
                    <p className="text-sm text-center mt-2">ダーク</p>
                  </div>
                  
                  <div className="border rounded-md p-4 cursor-pointer">
                    <div className="space-y-2">
                      <div className="w-full h-10 bg-gradient-to-r from-white to-gray-800 border rounded-md"></div>
                      <div className="w-full h-40 bg-gradient-to-b from-white to-gray-200 border rounded-md"></div>
                    </div>
                    <p className="text-sm text-center mt-2">システム設定に合わせる</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">ダッシュボード設定</h3>
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact_view">コンパクト表示</Label>
                    <p className="text-sm text-muted-foreground">
                      ダッシュボードをコンパクトに表示する
                    </p>
                  </div>
                  <Switch id="compact_view" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show_stats">統計情報を表示</Label>
                    <p className="text-sm text-muted-foreground">
                      ダッシュボードに統計情報を表示する
                    </p>
                  </div>
                  <Switch id="show_stats" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="show_announcements">お知らせを表示</Label>
                    <p className="text-sm text-muted-foreground">
                      ダッシュボードにお知らせを表示する
                    </p>
                  </div>
                  <Switch id="show_announcements" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={() => toast.success('表示設定を保存しました')}>
                保存する
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
