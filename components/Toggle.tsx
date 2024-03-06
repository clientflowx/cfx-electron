interface ToggleProps {
  title: string;
}

const Toggle: React.FC<ToggleProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{title}</span>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}

export default Toggle;
