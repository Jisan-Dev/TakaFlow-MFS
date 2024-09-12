import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const AgentModal = ({ isOpen, onClose, agentLoginUnapproved = false }) => {
  if (agentLoginUnapproved) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agent Login Request</DialogTitle>
            <DialogDescription className="text-orange-500 text-base font-bold">
              Your request for agent account is in the process. Please wait for the admin's approval.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

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
