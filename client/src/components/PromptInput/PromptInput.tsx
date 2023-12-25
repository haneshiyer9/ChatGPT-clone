import { useEffect, useRef, useCallback } from 'react';
import ContentEditable from 'react-contenteditable';
// import './PromptInput.css';
import '../../styles/tailwind.css'

interface PromptInputProps {
  prompt: string;
  onSubmit: () => void;
  updatePrompt: (prompt: string) => void;
  placeholder?: string;
  className?: string; 
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, onSubmit, updatePrompt, placeholder, className }) => {
  const checkKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.ctrlKey || e.shiftKey) {
        document.execCommand('insertHTML', false, '<br/><br/>');
      } else {
        onSubmit();
      }
    }
  }, [onSubmit]); // Use useCallback to memoize the function

  const contentEditableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("keydown", checkKeyPress);
    return () => {
      window.removeEventListener("keydown", checkKeyPress);
    };
  }, [checkKeyPress]);

  return (
    <ContentEditable
      innerRef={contentEditableRef}
      html={prompt}
      disabled={false}
      id="prompt-input"
      placeholder={placeholder}
      className={`prompt-input ${className || ''} p-2 border rounded focus:outline-none focus:border-blue-500`}
      onChange={(event) => updatePrompt(event.target.value)}
    />
  );
};

export default PromptInput;