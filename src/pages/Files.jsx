import { useEffect, useState } from "react";
import api from "../lib/axios.js";

const fileTypeColor = {
  image: "bg-blue-100 text-blue-700",
  document: "bg-purple-100 text-purple-700",
  audio: "bg-green-100 text-green-700",
  video: "bg-orange-100 text-orange-700",
};

const formatBytes = (bytes) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(1)} ${units[i]}`;
};

const Files = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const response = await api.get("dashboard/files");
        setFiles(response.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load files");
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const handleDelete = async (fileUUID) => {
    if (!confirm("Delete this file? This cannot be undone.")) return;
    try {
      await api.delete(`files/${fileUUID}`);
      setFiles((prev) => prev.filter((f) => f.file_uuid !== fileUUID));
    } catch (err) {
      console.error(err);
      alert("Failed to delete file");
    }
  };

  const [previewUrl, setPreviewUrl] = useState(null);
  const [urlLoading, setUrlLoading] = useState(false);

  const handlePreview = async (fileUUID) => {
    setUrlLoading(true);
    try {
      const response = await api.get(`files/${fileUUID}`, { responseType: "blob" });
      console.log(response);
      const url = URL.createObjectURL(response.data);
      console.log(url);
      setPreviewUrl(url);
    } catch (err) {
      console.error(err);
      alert("Failed to load preview");
    } finally {
      setUrlLoading(false);
    }
  };

  // cleanup when the preview closes or component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  if (loading) return <p className="p-6">Loading files...</p>;
  if (urlLoading) return <p className="p-6">Loading file...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="flex-1 p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-medium">Files</h1>
        <span className="text-sm text-gray-500">{files.length} total</span>
      </div>

      <div className="w-full rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Visibility</th>
              <th className="px-4 py-3">Uploaded</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {files.map((file) => (
              <tr
                key={file.file_uuid}
                onClick={file.file_type === "image" ? () => handlePreview(file.file_uuid) : () => {}}
              >
                <td className="px-4 py-3">{file.original_name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${fileTypeColor[file.file_type] ?? "bg-gray-100 text-gray-700"}`}
                  >
                    {file.file_type}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">{formatBytes(file.file_size)}</td>
                <td className="px-4 py-3 text-gray-600">{file.is_public ? "Public" : "Private"}</td>
                <td className="px-4 py-3 text-gray-600">{new Date(file.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(file.file_uuid)} className="text-sm text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
                {/* <td>
                  {file.file_type === "image" && (
                    <button
                      onClick={() => handlePreview(file.file_uuid)}
                      className="text-sm text-gray-600 hover:underline"
                    >
                      Preview
                    </button>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {previewUrl && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={() => setPreviewUrl(null)}>
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-3xl max-h-[80vh] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Files;
