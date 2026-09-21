"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
  currentStatus: string;
  type: "quote" | "contact";
  statuses: string[];
};

export default function AdminStatusSelect({
  id,
  currentStatus,
  type,
  statuses,
}: Props) {
  const router = useRouter();

  const [status, setStatus] =
    useState(currentStatus);

  const [loading, setLoading] =
    useState(false);

  async function updateStatus(
    newStatus: string,
  ) {
    const previous = status;

    setStatus(newStatus);
    setLoading(true);

    try {
      const endpoint =
        type === "quote"
          ? `/api/admin/quotes/${id}/status`
          : `/api/admin/contacts/${id}/status`;

      const response = await fetch(endpoint, {
        method: "PATCH",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data =
        await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          data.error ||
            "Unable to update status.",
        );
      }

      router.refresh();
    } catch (error) {
      setStatus(previous);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to update status.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <select
      className={`admin-status-select status-${status}`}
      value={status}
      disabled={loading}
      onChange={(event) =>
        updateStatus(
          event.target.value,
        )
      }
    >
      {statuses.map((item) => (
        <option
          value={item}
          key={item}
        >
          {item
            .replaceAll("_", " ")
            .toUpperCase()}
        </option>
      ))}
    </select>
  );
}