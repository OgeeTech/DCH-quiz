
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useQuizSecurity = (isQuizActive: boolean, onSecurityViolation: () => void) => {
  useEffect(() => {
    if (!isQuizActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common shortcuts that could be used to cheat
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'x')) || // Copy, paste, cut
        e.key === 'F12' || // Developer tools
        (e.ctrlKey && e.shiftKey && e.key === 'I') // Developer tools
      ) {
        e.preventDefault();
        toast.warning('Action blocked for security reasons');
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.warning('Right-click disabled during quiz');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextMenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextMenu', handleContextMenu);
    };
  }, [isQuizActive, onSecurityViolation]);
};
