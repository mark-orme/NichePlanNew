import { useStore } from '@/stores/useStore';

const GridOverlay = () => {
  const { gridSettings, transform } = useStore();

  if (!gridSettings.visible || !gridSettings.enabled) {
    return null;
  }

  const { pixelsPerMeter, smallSpacing, largeSpacing } = gridSettings;
  const { scale, x, y } = transform;

  // Calculate grid spacing in pixels
  const smallGridSpacing = smallSpacing * pixelsPerMeter * scale;
  const largeGridSpacing = largeSpacing * pixelsPerMeter * scale;

  // Don't render grid if it's too dense or too sparse
  if (smallGridSpacing < 5 || smallGridSpacing > 200) {
    return null;
  }

  const gridStyle = {
    backgroundImage: `
      linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(to right, rgba(0,0,0,0.2) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.2) 1px, transparent 1px)
    `,
    backgroundSize: `
      ${smallGridSpacing}px ${smallGridSpacing}px,
      ${smallGridSpacing}px ${smallGridSpacing}px,
      ${largeGridSpacing}px ${largeGridSpacing}px,
      ${largeGridSpacing}px ${largeGridSpacing}px
    `,
    backgroundPosition: `${x}px ${y}px`,
  };

  return (
    <div 
      className="absolute inset-0 pointer-events-none opacity-30"
      style={gridStyle}
    />
  );
};

export default GridOverlay;
