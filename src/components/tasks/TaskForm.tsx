"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createTask,
  updateTask,
} from "@/lib/tasks";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SearchSelect from "@/components/ui/SearchSelect";

import type {
  Case,
} from "@/types/case";

import type {
  Task,
  TaskPriority,
  TaskStatus,
  TaskType,
} from "@/types/task";

type TaskFormProps = {
  initialData?: Task;

  cases: Case[];

  initialStartAt?: string;
  initialEndAt?: string;

  initialType?: TaskType;
  initialCaseId?: string;
};

function toDateTimeLocal(
  value?: string | null
) {
  return value
    ? value.slice(0, 16)
    : "";
}

export default function TaskForm({
  initialData,
  cases,
  initialStartAt,
  initialEndAt,
  initialType,
  initialCaseId,
}: TaskFormProps) {
  const router = useRouter();

  const isEditing =
    Boolean(initialData?.id);

  const [title, setTitle] =
    useState(
      initialData?.title ?? ""
    );

  const [
    description,
    setDescription,
  ] = useState(
    initialData?.description ??
      ""
  );

  const [status, setStatus] =
    useState<TaskStatus>(
      initialData?.status ??
        "todo"
    );

  const [
    priority,
    setPriority,
  ] = useState<TaskPriority>(
    initialData?.priority ??
      "normal"
  );

  const [type, setType] =
    useState<TaskType>(
      initialData?.type ??
        initialType ??
        "task"
    );

  const [
    startAt,
    setStartAt,
  ] = useState(
    initialData?.start_at
      ? toDateTimeLocal(
          initialData.start_at
        )
      : toDateTimeLocal(
          initialStartAt
        )
  );

  const [endAt, setEndAt] =
    useState(
      initialData?.end_at
        ? toDateTimeLocal(
            initialData.end_at
          )
        : toDateTimeLocal(
            initialEndAt
          )
    );

  const [
    dueDate,
    setDueDate,
  ] = useState(
    initialData?.due_date ??
      ""
  );

  const [caseId, setCaseId] =
    useState(
      initialData?.case_id ??
        initialCaseId ??
        ""
    );

  const [loading, setLoading] =
    useState(false);

  const caseOptions =
    useMemo(() => {
      return cases.map(
        (item) => ({
          id: item.id,
          label: item.title,
          description: `Ügy #${item.case_number}`,
        })
      );
    }, [cases]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!title.trim()) {
      alert(
        "A feladat neve kötelező."
      );
      return;
    }

    if (
      startAt &&
      endAt &&
      new Date(endAt) <
        new Date(startAt)
    ) {
      alert(
        "A befejezés nem lehet korábbi, mint a kezdés."
      );
      return;
    }

    try {
      setLoading(true);

      const completedAt =
        status === "done"
          ? initialData?.completed_at ??
            new Date().toISOString()
          : null;

      const payload = {
        title: title.trim(),

        description:
          description.trim() ||
          null,

        type,
        status,
        priority,

        due_date:
          dueDate || null,

        start_at: startAt
          ? new Date(
              startAt
            ).toISOString()
          : null,

        end_at: endAt
          ? new Date(
              endAt
            ).toISOString()
          : null,

        completed_at:
          completedAt,

        case_id:
          caseId || null,

        sort_order:
          initialData?.sort_order ??
          0,
      };

      if (
        isEditing &&
        initialData
      ) {
        await updateTask(
          initialData.id,
          payload
        );

        router.push(
          `/tasks/${initialData.id}`
        );

        router.refresh();

        return;
      }

      const task =
        await createTask(
          payload
        );

      router.push(
        `/tasks/${task.id}`
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        "Hiba történt a feladat mentése közben."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block font-medium">
          Feladat neve *
        </label>

        <Input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }
          required
          placeholder="Pl. Ügyfél visszahívása"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Kapcsolódó ügy
        </label>

        <SearchSelect
          value={caseId}
          options={caseOptions}
          placeholder="Ügy keresése..."
          emptyMessage="Nincs találat."
          onChange={(
            value
          ) =>
            setCaseId(
              value ?? ""
            )
          }
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Típus
        </label>

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target
                .value as TaskType
            )
          }
          className="w-full rounded-lg border border-gray-300 p-3"
        >
          <option value="task">
            ✅ Feladat
          </option>

          <option value="meeting">
            🤝 Találkozó
          </option>

          <option value="call">
            📞 Telefon
          </option>

          <option value="visit">
            🏡 Megtekintés
          </option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div>
          <label className="mb-2 block font-medium">
            Státusz
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target
                  .value as TaskStatus
              )
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          >
            <option value="todo">
              Teendő
            </option>

            <option value="in_progress">
              Folyamatban
            </option>

            <option value="waiting">
              Várakozik
            </option>

            <option value="done">
              Kész
            </option>

            <option value="cancelled">
              Törölve
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Prioritás
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target
                  .value as TaskPriority
              )
            }
            className="w-full rounded-lg border border-gray-300 p-3"
          >
            <option value="low">
              Alacsony
            </option>

            <option value="normal">
              Normál
            </option>

            <option value="high">
              Magas
            </option>

            <option value="urgent">
              Sürgős
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Határidő
          </label>

          <Input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium">
            Kezdés
          </label>

          <Input
            type="datetime-local"
            value={startAt}
            onChange={(e) =>
              setStartAt(
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Befejezés
          </label>

          <Input
            type="datetime-local"
            value={endAt}
            onChange={(e) =>
              setEndAt(
                e.target.value
              )
            }
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Leírás
        </label>

        <textarea
          rows={6}
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          className="w-full rounded-lg border border-gray-300 p-3"
          placeholder="Feladat részletes leírása..."
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            router.push(
              initialData
                ? `/tasks/${initialData.id}`
                : "/tasks"
            )
          }
        >
          Mégse
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Mentés..."
            : isEditing
            ? "💾 Módosítások mentése"
            : "💾 Mentés"}
        </Button>
      </div>
    </form>
  );
}