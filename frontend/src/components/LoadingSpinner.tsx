export default function LoadingSpinner({
  message = "Searching and summarizing papers...",
}) {
  return (
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      <p className="mt-4 text-gray-300">{message}</p>
    </div>
  );
}
