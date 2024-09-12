import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const AgentModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Successfully Registered!</DialogTitle>
          <DialogDescription>Thank you for choosing the fastest mfs system in the region.</DialogDescription>
        </DialogHeader>
        <div>Your account is an agent account type. You have been rewarded 1000tk as a signup bonus. You can login once the admin approved your account!</div>
      </DialogContent>
    </Dialog>
  );
};

export default AgentModal;
