import React from 'react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { DisasterFormData } from './DisasterForm';
import axios from 'axios';

interface EmailModalProps {
  onClose: () => void;
  actionPlan: string;
  stakeholders: string[];
  disasterInfo: DisasterFormData;
}

const EmailModal = ({ onClose, actionPlan, stakeholders, disasterInfo }: EmailModalProps) => {
  const [emailSubject, setEmailSubject] = useState<string>(
    `URGENT: ${disasterInfo.disasterType.toUpperCase()} Action Plan for ${disasterInfo.location}`
  );
  const [emailBody, setEmailBody] = useState<string>(
    `Dear Emergency Response Team,\n\nPlease find attached the emergency action plan for the ${disasterInfo.disasterType} affecting ${disasterInfo.location}.\n\nThis is a ${disasterInfo.severity} severity situation requiring immediate attention.\n\n${actionPlan}\n\nPlease acknowledge receipt and confirm deployment readiness.\n\nEmergency Command Center`
  );
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendEmail = async () => {
    // Reset error state
    setError(null);
    setIsSending(true);
    
    try {
      // Set recipient_email to austinmiracle007@gmail.com as requested
      const recipientEmails = "austinmiracle007@gmail.com";
      
      // Send email using the API endpoint
      await axios.post('http://localhost:5001/api/email/send', {
        recipient_email: recipientEmails,
        subject: emailSubject,
        message: emailBody
      });
      
      alert("Email sent successfully to " + stakeholders.length + " stakeholder groups.");
      onClose();
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send email. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-emergency-surface border-emergency-caribbean text-emergency-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-emergency-caribbean text-2xl">Preview Email</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-1 block text-emergency-white">
              Recipients
            </label>
            <div className="bg-emergency-black p-2 rounded-md border border-emergency-basil">
              <div className="flex flex-wrap gap-2">
                {stakeholders.map((stakeholder) => (
                  <span 
                    key={stakeholder} 
                    className="bg-emergency-forest text-emergency-white px-2 py-1 rounded-md text-sm"
                  >
                    {stakeholder.replace(/^./, (str) => str.toUpperCase())}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block text-emergency-white">
              Subject
            </label>
            <Input 
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="bg-emergency-black border-emergency-basil text-emergency-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block text-emergency-white">
              Message
            </label>
            <Textarea 
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              className="bg-emergency-black border-emergency-basil text-emergency-white min-h-[200px]"
            />
          </div>
        </div>

        {error && (
          <div className="mt-2 p-2 bg-red-500/20 border border-red-500 rounded-md text-red-400 text-sm">
            {error}
          </div>
        )}
        
        <DialogFooter className="pt-4 border-t border-emergency-basil">
          <Button 
            onClick={onClose}
            variant="outline"
            className="border-emergency-basil text-emergency-white hover:bg-emergency-forest"
            disabled={isSending}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSendEmail}
            className="bg-emergency-green hover:bg-emergency-meadow text-emergency-white"
            disabled={isSending}
          >
            {isSending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-emergency-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
