import { PracticalType } from "../data/practicals";
import CodeBlock from "./CodeBlock";

interface PracticalSectionProps {
  practical: PracticalType;
}

const PracticalSection = ({ practical }: PracticalSectionProps) => {
  const { 
    id, 
    title, 
    aim, 
    steps, 
    algorithm, 
    codeSnippets, 
    examples, 
    prevId, 
    nextId, 
    image 
  } = practical;

  return (
    <section id={`practical-${id}`} className="bg-card rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Practical {id}: {title}</h2>
      
      {aim && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Aim</h3>
          <p>{aim}</p>
        </div>
      )}
      
      {steps && steps.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Steps</h3>
          <ol className="list-decimal pl-6 space-y-2">
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      
      {algorithm && algorithm.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Algorithm</h3>
          <ol className="list-decimal pl-6 space-y-2">
            {algorithm.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      )}
      
      {(codeSnippets && codeSnippets.length > 0) && (
        <div className="mb-6">
          {image ? (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img src={image} alt={`${title} Example`} className="rounded-lg w-full" />
                <p className="text-center mt-2 text-sm text-muted-foreground">Example of {title.toLowerCase()}</p>
              </div>
              <div className="md:w-1/2">
                {codeSnippets.map((snippet, index) => (
                  <CodeBlock 
                    key={index}
                    language={snippet.language}
                    code={snippet.code}
                    title={snippet.title}
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              {codeSnippets.map((snippet, index) => (
                <CodeBlock 
                  key={index}
                  language={snippet.language}
                  code={snippet.code}
                  title={snippet.title}
                />
              ))}
            </>
          )}
        </div>
      )}
      
      {examples && examples.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Example Execution</h3>
          {examples.map((example, index) => (
            <div key={index} className="bg-secondary rounded-md p-4">
              {example.input && (
                <>
                  <p className="mb-2"><strong>Input:</strong></p>
                  <pre className="text-foreground font-mono">{example.input}</pre>
                </>
              )}
              
              {example.output && (
                <>
                  <p className="mt-4 mb-2"><strong>Output:</strong></p>
                  <pre className="text-foreground font-mono">{example.output}</pre>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-between">
        {prevId ? (
          <a href={`#practical-${prevId}`} className="text-primary hover:text-primary/90 flex items-center">
            <i className="fas fa-chevron-left mr-2"></i> Previous: {practical.title}
          </a>
        ) : (
          <div></div>
        )}
        
        {nextId ? (
          <a href={`#practical-${nextId}`} className="text-primary hover:text-primary/90 flex items-center">
            Next: {practical.title} <i className="fas fa-chevron-right ml-2"></i>
          </a>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};

export default PracticalSection;
