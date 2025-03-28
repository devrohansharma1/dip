import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  language: string;
  code: string;
  title?: string;
}

const CodeBlock = ({ language, code, title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="code-block my-4">
      <div className="code-header bg-secondary text-muted-foreground p-2 flex justify-between items-center rounded-t-md">
        <span>{title || language}</span>
        <Button 
          onClick={handleCopy} 
          variant="primary" 
          size="sm" 
          className="text-xs h-8"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" /> Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" /> Copy
            </>
          )}
        </Button>
      </div>
      <pre className="code-content bg-card text-foreground p-4 overflow-x-auto whitespace-pre rounded-b-md border border-border font-mono text-sm">
        {code}
      </pre>
    </div>
  );
};

export default CodeBlock;
