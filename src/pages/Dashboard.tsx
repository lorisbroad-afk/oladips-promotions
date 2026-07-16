import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { supabase } from "../lib/supabase";

type ContactMessage = {
  id: number;
  name: string;
  email: string;
  package: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
export default function Dashboard() {
  const navigate = useNavigate();

  const [totalMessages, setTotalMessages] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [readMessages, setReadMessages] = useState(0);
  const [todayMessages, setTodayMessages] = useState(0);

const [messages, setMessages] = useState<ContactMessage[]>([]);
const [search, setSearch] = useState("");
const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

useEffect(() => {
  loadDashboard();

  const channel = supabase
    .channel("contact_messages_changes")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "contact_messages",
      },
      () => {
        loadDashboard();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);

  async function loadDashboard() {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
      return;
    }

    const list: ContactMessage[] = data ?? [];

    setMessages(list);
    setTotalMessages(list.length);
    setUnreadMessages(list.filter((m) => !m.is_read).length);
    setReadMessages(list.filter((m) => m.is_read).length);

    const today = new Date().toDateString();

    setTodayMessages(
      list.filter(
        (m) =>
          new Date(m.created_at).toDateString() === today
      ).length
    );
  }

  async function markAsRead(id: number) {
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

await loadDashboard();
toast.success("Message marked as read!");
  }

async function deleteMessage(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this message?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", id);

  if (error) {
    toast.error(error.message);
    return;
  }

await loadDashboard();
toast.success("Message deleted successfully!");
}

async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    toast.error(error.message);
    return;
  }

  toast.success("Logged out successfully!");
  navigate("/login");
}
  function exportCSV() {
  const headers = [
    "Name",
    "Email",
    "Package",
    "Message",
    "Status",
    "Date",
  ];

  const rows = filteredMessages.map((m) => [
    m.name,
    m.email,
    m.package,
    m.message,
    m.is_read ? "Read" : "Unread",
    new Date(m.created_at).toLocaleString(),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((r) =>
      r.map((item) => `"${String(item ?? "").replace(/"/g, '""')}"`).join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = `contact_messages_${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
  toast.success("CSV exported successfully!");
}
  const filteredMessages = messages.filter((message) => {
    const term = search.toLowerCase();

    return (
      message.name.toLowerCase().includes(term) ||
      message.email.toLowerCase().includes(term) ||
      (message.package ?? "")
        .toLowerCase()
        .includes(term) ||
      message.message.toLowerCase().includes(term)
    );
  });

return (
  <>
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
      style: {
        background: "#11111b",
        color: "#fff",
        border: "1px solid rgba(255,255,255,0.1)",
      },
    }}
  />

<div className="min-h-screen bg-[#0b0b12] text-white p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-yellow-400">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="rounded-lg bg-red-600 px-5 py-2 font-semibold hover:bg-red-500"
        >
          Logout
        </button>
      </div>

      <p className="mt-4 text-gray-400">
        Welcome! You have successfully logged in.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="rounded-xl bg-[#11111b] border border-white/10 p-6">
          <h2 className="text-gray-400">
            Total Messages
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {totalMessages}
          </p>
        </div>

        <div className="rounded-xl bg-[#11111b] border border-white/10 p-6">
          <h2 className="text-gray-400">
            Unread
          </h2>

          <p className="mt-2 text-3xl font-bold text-yellow-400">
            {unreadMessages}
          </p>
        </div>

        <div className="rounded-xl bg-[#11111b] border border-white/10 p-6">
          <h2 className="text-gray-400">
            Read
          </h2>

          <p className="mt-2 text-3xl font-bold text-green-400">
            {readMessages}
          </p>
        </div>

        <div className="rounded-xl bg-[#11111b] border border-white/10 p-6">
          <h2 className="text-gray-400">
            Today
          </h2>

          <p className="mt-2 text-3xl font-bold">
            {todayMessages}
          </p>
        </div>

      </div>

      <div className="mt-12">

        <input
          type="text"
          placeholder="Search by name, email, package or message..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="mb-6 w-full rounded-lg border border-white/10 bg-[#11111b] px-4 py-3 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none"
        />

<div className="mb-6 flex items-center justify-between">
  <h2 className="text-2xl font-bold text-yellow-400">
    Contact Messages
  </h2>

  <button
    onClick={exportCSV}
    className="rounded-lg bg-yellow-500 px-5 py-2 font-bold text-black hover:bg-yellow-400"
  >
    Export CSV
  </button>
</div>

        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#11111b]">

          <table className="w-full text-left">

            <thead className="border-b border-white/10">

              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Package</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredMessages.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-gray-500"
                  >
                    No messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((message) => (
                  <tr
                    key={message.id}
                    className="border-b border-white/10"
                  >
                    <td className="p-4">
                      {message.name}
                    </td>

                    <td className="p-4">
                      {message.email}
                    </td>

                    <td className="p-4">
                      {message.package}
                    </td>

                    <td className="max-w-xs truncate p-4">
                      {message.message}
                    </td>

                    <td className="p-4">
                      {message.is_read ? (
                        <span className="text-green-400">
                          Read
                        </span>
                      ) : (
                        <span className="text-yellow-400">
                          Unread
                        </span>
                      )}
                    </td>

<td className="space-x-2 p-4">

  <button
    onClick={() => setSelectedMessage(message)}
    className="rounded bg-blue-600 px-3 py-1 text-sm hover:bg-blue-500"
  >
    View
  </button>

 <button
  onClick={() =>
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(message.email)}`,
      "_blank"
    )
  }
  className="rounded bg-sky-600 px-3 py-1 text-sm text-white transition hover:bg-sky-500"
>
  Reply
</button>

  {!message.is_read && (
    <button
      onClick={() => markAsRead(message.id)}
      className="rounded bg-green-600 px-3 py-1 text-sm hover:bg-green-500"
    >
      Mark Read
    </button>
  )}

  <button
    onClick={() => deleteMessage(message.id)}
    className="rounded bg-red-600 px-3 py-1 text-sm hover:bg-red-500"
  >
    Delete
  </button>

</td>
                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>
      </div>
    </div>
    {selectedMessage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

    <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#11111b] p-8 shadow-2xl">

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-yellow-400">
          Contact Message
        </h2>

        <button
          onClick={() => setSelectedMessage(null)}
          className="text-2xl text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="mt-6 space-y-4">

        <div>
          <p className="text-gray-400">Name</p>
          <p className="font-semibold">{selectedMessage.name}</p>
        </div>

        <div>
          <p className="text-gray-400">Email</p>
          <p>{selectedMessage.email}</p>
        </div>

        <div>
          <p className="text-gray-400">Package</p>
          <p>{selectedMessage.package}</p>
        </div>

        <div>
          <p className="text-gray-400">Date</p>
          <p>
            {new Date(selectedMessage.created_at).toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-gray-400 mb-2">Message</p>

          <div className="rounded-lg bg-black/30 p-4 whitespace-pre-wrap">
            {selectedMessage.message}
          </div>
        </div>

      </div>

      <div className="mt-8 text-right">
        <button
          onClick={() => setSelectedMessage(null)}
          className="rounded-lg bg-yellow-500 px-6 py-2 font-bold text-black hover:bg-yellow-400"
        >
          Close
        </button>
      </div>

    </div>

  </div>
)}
  </>
);
}