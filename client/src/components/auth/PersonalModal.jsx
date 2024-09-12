import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const PersonalModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Successfully Registered!</DialogTitle>
          <DialogDescription>Thank you for choosing the fastest mfs system in the region.</DialogDescription>
        </DialogHeader>
        <div>Your account is a personal account type. You have been rewarded 100tk as a signup bonus.</div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonalModal;
