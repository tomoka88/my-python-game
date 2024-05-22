import React, { useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');

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
      <pre id="outputArea">{output}</pre> 
    </div>
  );
};

export default CodeEditor;

// import React, { useState } from 'react';
// import AceEditor from 'react-ace';

// import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/theme-github';

// const CodeEditor: React.FC = () => {
//   const [code, setCode] = useState<string>('');
//   const [output, setOutput] = useState<string>('');

//   const runCode = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/run', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       console.log('Response Data:', data);  // デバッグ用のログ出力
//       if (data.result) {
//         setOutput(data.result.print_output + "\n" + JSON.stringify(data.result.my_instance, null, 2));
//       } else {
//         setOutput(data.error);
//       }
//     } catch (error) {
//       console.error('Error:', error);  // デバッグ用のログ出力
//       setOutput('Error running code');
//     }
//   };

//   return (
//     <div>
//      <div id="codeEditor">
//       <AceEditor
//         mode="python"
//         theme="github"
//         onChange={(newCode) => setCode(newCode)}
//         value={code}
//         name="codeEditor"
//         editorProps={{ $blockScrolling: true }}
//       />
//      </div>
//       <button id="runButton" onClick={runCode}>Run</button>  
//       <pre id="outputArea">{output}</pre> 
//     </div>
//   );
// };

// export default CodeEditor;







// import React, { useState } from 'react';
// import AceEditor from 'react-ace';

// import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/theme-github';

// const CodeEditor: React.FC = () => {
//   const [code, setCode] = useState<string>('');
//   const [output, setOutput] = useState<string>('');

// const runCode = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/run', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ code }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const data = await response.json();
  
//       // 結果がオブジェクトである場合、それをシリアライズ可能な形式に変換します
//       let formattedResult = '';
//       if (typeof data.result === 'object') {
//         // オブジェクトを文字列レプレゼンテーションに変換します（例：JSON.stringify）
//         formattedResult = JSON.stringify(data.result, null, 2);
//       } else {
//         formattedResult = data.result;
//       }
  
//       // エラーも同様に処理します
//       let errorMessage = '';
//       if (typeof data.error === 'object') {
//         errorMessage = JSON.stringify(data.error, null, 2);
//       } else {
//         errorMessage = data.error;
//       }
  
//       setOutput(formattedResult || errorMessage);
//     } catch (error) {
//       setOutput('Error running code');
//     }
//   };
//   return (
//     <div>
//       <AceEditor
//         mode="python"
//         theme="github"
//         onChange={(newCode) => setCode(newCode)}
//         value={code}
//         name="UNIQUE_ID_OF_DIV"
//         editorProps={{ $blockScrolling: true }}
//       />
//       <button onClick={runCode}>Run</button>
//       <pre>{output}</pre>
//     </div>
//   );
// };

// export default CodeEditor;

