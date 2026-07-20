import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Calendar, Send, Loader2 } from "lucide-react";

export default function InterviewSchedulerModal({ app, onConfirm, onCancel }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("In-Person — Iowa Structure Cabling Solution LLC Office");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);

    const dateTimeStr = date && time
      ? new Date(`${date}T${time}`).toLocaleString("en-US", {
          weekday: "long", year: "numeric", month: "long", day: "numeric",
          hour: "numeric", minute: "2-digit", hour12: true,
        })
      : "To be confirmed — we will follow up with exact details.";

    await base44.functions.invoke("sendInterviewInvitation", {
      app,
      dateTimeStr,
      location,
      notes,
    });

    setSending(false);
    onConfirm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-base">Schedule Interview</h2>
          </div>
          <button onClick={onCancel} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="font-medium">{app.firstName} {app.lastName}</p>
            <p className="text-muted-foreground text-xs">{app.positionApplied} · {app.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Interview Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs font-medium mb-1.5 block">Interview Time</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>

          <div>
            <Label className="text-xs font-medium mb-1.5 block">Location / Format</Label>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. In-Person, Phone, Zoom..."
            />
          </div>

          <div>
            <Label className="text-xs font-medium mb-1.5 block">Additional Notes (optional)</Label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions, what to bring, etc."
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            An invitation email will be sent to <strong>{app.email}</strong> and the status will be updated to "Interview Scheduled".
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-5 pt-0">
          <Button variant="outline" className="flex-1" onClick={onCancel} disabled={sending}>
            Cancel
          </Button>
          <Button className="flex-1 gap-2" onClick={handleSend} disabled={sending}>
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {sending ? "Sending..." : "Send Invitation"}
          </Button>
        </div>
      </div>
    </div>
  );
}