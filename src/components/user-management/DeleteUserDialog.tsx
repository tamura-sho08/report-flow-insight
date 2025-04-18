
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteUserDialogProps = {
  userId: string;
  userName: string;
};

const DeleteUserDialog = ({ userId, userName }: DeleteUserDialogProps) => {
  const handleDelete = () => {
    console.log(`Deleting user ${userId}`);
    // TODO: Implement delete functionality
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>ユーザーの削除</DialogTitle>
        <DialogDescription>
          {userName} を削除してもよろしいですか？この操作は取り消せません。
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => {}}>
            キャンセル
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            削除
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteUserDialog;
