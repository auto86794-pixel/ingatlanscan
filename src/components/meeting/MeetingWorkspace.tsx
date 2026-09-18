"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import type {
  CalendarEvent,
} from "@/types/calendar";

import {
  meetingCompletionService,
} from "@/services/meeting-completion-service";

import { useToast } from "@/hooks/useToast";

import MeetingHeader from "@/components/meeting/MeetingHeader";
import MeetingClient from "@/components/meeting/MeetingClient";
import MeetingProperty from "@/components/meeting/MeetingProperty";
import MeetingActions from "@/components/meeting/MeetingActions";
import MeetingNotes from "@/components/meeting/MeetingNotes";
import MeetingPhotos from "@/components/meeting/MeetingPhotos";
import MeetingOffer from "@/components/meeting/MeetingOffer";
import MeetingFinishDialog from "@/components/meeting/MeetingFinishDialog";

import Card from "@/components/ui/Card";
import ActionButton from "@/components/ui/ActionButton";

type MeetingWorkspaceProps = {
  meeting: CalendarEvent;
};

type CompleteMeetingOptions = {
  createCallReminder: boolean;
  createOfferReminder: boolean;
  createMeetingReminder: boolean;
};

export default function MeetingWorkspace({
  meeting,
}: MeetingWorkspaceProps) {
  const [finishOpen, setFinishOpen] =
    useState(false);

  const router = useRouter();

  const toast = useToast();

  async function handleComplete(
    options: CompleteMeetingOptions
  ) {
    if (!meeting.case_id) {
      setFinishOpen(false);

      toast.warning(
        "A találkozóhoz nincs ügy rendelve."
      );

      return;
    }

    try {
      await meetingCompletionService.complete({
        meetingId: meeting.id,
        caseId: meeting.case_id,
        createCallReminder:
          options.createCallReminder,
        createOfferReminder:
          options.createOfferReminder,
      });

      toast.success(
        "Találkozó sikeresen lezárva."
      );

      router.push(
        `/cases/${meeting.case_id}`
      );

      router.refresh();
    } catch (error) {
      console.error(
        "Meeting completion failed:",
        error
      );

      toast.error(
        "Nem sikerült lezárni a találkozót."
      );
    } finally {
      setFinishOpen(false);
    }
  }

  return (
    <>
      <div className="space-y-6">
        <MeetingHeader
          event={meeting}
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <MeetingClient
            event={meeting}
          />

          <MeetingProperty
            event={meeting}
          />

          <MeetingActions
            event={meeting}
          />
        </div>

        <MeetingNotes />

        <MeetingPhotos />

        <MeetingOffer />

        <Card className="border-green-200 bg-green-50">
          <ActionButton
            icon="✅"
            variant="success"
            fullWidth
            onClick={() =>
              setFinishOpen(true)
            }
          >
            Találkozó lezárása
          </ActionButton>
        </Card>
      </div>

      <MeetingFinishDialog
        open={finishOpen}
        onClose={() =>
          setFinishOpen(false)
        }
        onComplete={handleComplete}
      />
    </>
  );
}