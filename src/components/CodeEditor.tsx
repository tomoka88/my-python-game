import React, { useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [savedId, setSavedId] = useState<number | null>(null); //5/23追加

  const runCode = async () => {
    try {
      const response = await fetch('http://localhost:8000/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response Data:', data);  // デバッグ用のログ出力
      if (data.result) {
        setOutput(data.result.print_output);
      } else {
        setOutput(data.error);
      }
    } catch (error) {
      console.error('Error:', error);  // デバッグ用のログ出力
      setOutput('Error running code');
    }
  };
//5/23追加
  const saveCode = async () => {
    try {
      const response = await fetch('http://localhost:8000/save_code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message);
      setSavedId(data.id);  // 保存されたコードのIDを状態に保存
    } catch (error) {
      alert('Error saving code');
    }
  };


  return (
    <div>
     <div id="codeEditor">
      <AceEditor
        mode="python"
        theme="github"
        onChange={(newCode) => setCode(newCode)}
        value={code}
        name="codeEditor"
        editorProps={{ $blockScrolling: true }}
      />
     </div>
      <button id="runButton" onClick={runCode}>Run</button>
      <button id="saveButton" onClick={saveCode}>Save</button> {/* この行を追加 */}
      {savedId && <p>Saved Code ID: {savedId}</p>}
      <pre id="outputArea">{output}</pre> 
    </div>
  );
};

export default CodeEditor;

