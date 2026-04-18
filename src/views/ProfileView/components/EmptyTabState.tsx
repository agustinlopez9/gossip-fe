const EmptyTabState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center px-6 py-20">
    <div className="bg-surface-secondary mb-4 flex h-14 w-14 items-center justify-center rounded-full">
      <span className="text-2xl">💬</span>
    </div>
    <p className="text-tertiary text-center text-sm">{message}</p>
  </div>
);

export default EmptyTabState;
