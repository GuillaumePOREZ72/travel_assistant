/**
 * The `Loading` function returns a spinning loading indicator component in a React
 * application using Tailwind CSS classes.
 * @returns A loading spinner component is being returned. It consists of a div
 * element with the class names "flex justify-center items-center h-64" containing
 * another div element with the class names "animate-spin rounded-full h-32 w-32
 * border-t-2 border-b-2 border-blue-500". This inner div element represents a
 * spinning loading animation.
 */
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}
