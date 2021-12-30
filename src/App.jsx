import { useState, useEffect } from 'react'
import {
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  useActiveCode,
  useSandpackNavigation,
} from '@codesandbox/sandpack-react'

function App() {
  const [logLines, setLogLines] = useState([])
  const { listen } = useSandpack();
  const { updateCode } = useActiveCode();
  const { refresh } = useSandpackNavigation();

  useEffect(() => {
    updateCode(`//Add Some code here
console.log('Hello Drunk World')`)
  }, [])

  useEffect(() => {
    const stopListening = listen(msg => {
      console.log(msg)
      if (msg.type === 'done') {
        setLogLines([])
      }
      if (msg.type === 'console') {
        setLogLines(prev => [...prev, ...msg.log.map(log => log.data)])
      }
    });


    return () => stopListening();
  }, [listen]);

  return (
    <div className="app">
      <div>
        <SandpackLayout
          theme="monokai-pro"
        >
          <SandpackCodeEditor
            showTabs={false}
            showRunButton
          />
          <SandpackPreview />
        </SandpackLayout>
      </div>
      <div>
        <div>
          <button
            onClick={() => {
              setLogLines([])
            }}
          >
            Clear Log
          </button>
          <button
            onClick={() => {
              refresh()
            }}
          >
            Rerun Code
          </button>
          <button
            onClick={() => {
              updateCode(`//Add Some code here`)
            }}
          >
            Reset Code
          </button>
        </div>
        {
          logLines.length > 0 ?
            <ul className='log-lines'>
              {logLines.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul> : 'No console logs yet'
        }
      </div>
    </div>
  )
}

export default App
