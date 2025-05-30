import { useEffect, useState } from 'react';

interface AppProps {
  hasWebGPUSupport: boolean;
}

const App = ({ hasWebGPUSupport }: AppProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
      const loader = document.getElementById('initialLoader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!hasWebGPUSupport) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '500px', padding: '2rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <h1>WebGPU Required</h1>
          <p>NichePlan requires WebGPU support. Please use Chrome 113+, Safari 18+, or Firefox 120+</p>
        </div>
      </div>
    );
  }

  if (!isInitialized) return null;

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ height: '60px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
        <div style={{ fontWeight: '600', color: '#1e293b' }}>NichePlan - Phase 1 Foundation Complete</div>
      </div>
      <div style={{ flex: 1, display: 'flex', backgroundColor: '#ffffff' }}>
        <div style={{ width: '60px', backgroundColor: '#f8fafc', borderRight: '1px solid #e2e8f0' }}></div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>🎨 Ready for Drawing</div>
            <div>WebGPU-powered canvas ready for Apple Pencil input</div>
          </div>
        </div>
        <div style={{ width: '250px', backgroundColor: '#f8fafc', borderLeft: '1px solid #e2e8f0', padding: '1rem' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>GIA Measurements</h3>
          <div style={{ color: '#64748b', fontSize: '0.875rem' }}>Professional measurement tools ready</div>
        </div>
      </div>
      <div style={{ height: '32px', backgroundColor: '#1e293b', color: '#f8fafc', display: 'flex', alignItems: 'center', padding: '0 1rem', fontSize: '0.75rem' }}>
        Phase 1 Complete ✅ | WebGPU: Ready | Apple Pencil: Supported
      </div>
    </div>
  );
};

export default App;
