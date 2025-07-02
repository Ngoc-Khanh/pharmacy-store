export const GifLoader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <img
            src="/hin.gif"
            alt="Loading..."
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
    </div>
  )
}