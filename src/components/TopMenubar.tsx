import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/stores/useStore';

const TopMenubar = () => {
  const [wallThickness, setWallThickness] = useState(0.2);
  const { currentTool, setCurrentTool, setWallThickness } = useStore();

  const handleWallThicknessChange = (value: number) => {
    setWallThickness(value);
    setWallThickness(value);
  };

  const handleExport = () => {
    console.log('Export project');
  };

  const handleImport = () => {
    console.log('Import project');
  };

  const handleNew = () => {
    console.log('New project');
  };

  return (
    <div className="h-16 bg-slate-50 border-b border-slate-200 flex items-center justify-between px-4">
      {/* Left side - Logo and project name */}
      <div className="flex items-center space-x-4">
        <div className="font-bold text-lg text-slate-800">
          NichePlan
        </div>
        <div className="text-sm text-slate-600">
          Professional Estate Sketching
        </div>
      </div>

      {/* Center - Main controls */}
      <div className="flex items-center space-x-4">
        {/* Wall thickness control */}
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-slate-700">
            Wall Thickness:
          </label>
          <input
            type="range"
            min="0.1"
            max="0.5"
            step="0.05"
            value={wallThickness}
            onChange={(e) => handleWallThicknessChange(parseFloat(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-slate-600 w-12">
            {wallThickness.toFixed(2)}m
          </span>
        </div>

        {/* Quick tool selector */}
        <div className="flex items-center space-x-2 border-l pl-4">
          <Button
            variant={currentTool === 'pen' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentTool('pen')}
          >
            Pen
          </Button>
          <Button
            variant={currentTool === 'measure' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentTool('measure')}
          >
            Measure
          </Button>
          <Button
            variant={currentTool === 'select' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setCurrentTool('select')}
          >
            Select
          </Button>
        </div>
      </div>

      {/* Right side - File operations */}
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleNew}>
          New
        </Button>
        <Button variant="outline" size="sm" onClick={handleImport}>
          Import
        </Button>
        <Button variant="outline" size="sm" onClick={handleExport}>
          Export
        </Button>
      </div>
    </div>
  );
};

export default TopMenubar;
