from flask import Flask, request, jsonify
from flask_cors import CORS
import io
import sys
import traceback

app = Flask(__name__)
CORS(app, support_credentials=True)  # すべてのオリジンを許可し、クレデンシャルもサポート

class MyClass:
    def __init__(self, name):
        self.name = name

@app.route('/run', methods=['POST'])
def run_code():
    data = request.json
    code = data.get('code')
    
    # 標準出力をキャプチャ
    old_stdout = sys.stdout
    sys.stdout = captured_output = io.StringIO()
    
    try:
        exec_globals = {}
        exec(code, exec_globals)
        
        # 標準出力からキャプチャした内容を取得
        output = captured_output.getvalue()
        
        # JSONシリアライズ可能な形式に変換
        def is_json_serializable(value):
            try:
                import json
                json.dumps(value)
                return True
            except (TypeError, OverflowError):
                return False

        exec_globals_serializable = {}
        for k, v in exec_globals.items():
            if isinstance(v, MyClass):
                exec_globals_serializable[k] = v.__dict__
            elif is_json_serializable(v):
                exec_globals_serializable[k] = v
        
        exec_globals_serializable['print_output'] = output
        
        return jsonify({'result': exec_globals_serializable})
    except Exception as e:
        return jsonify({'error': str(e), 'traceback': traceback.format_exc()})
    finally:
        sys.stdout = old_stdout  # 標準出力を元に戻す

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)  # ローカルネットワーク内からのアクセスも許可


# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import io
# import sys
# import traceback

# app = Flask(__name__)
# CORS(app, support_credentials=True)  # すべてのオリジンを許可し、クレデンシャルもサポート

# class MyClass:
#     def __init__(self, name):
#         self.name = name

# @app.route('/run', methods=['POST'])
# def run_code():
#     data = request.json
#     code = data.get('code')
    
#     # 標準出力をキャプチャ
#     old_stdout = sys.stdout
#     sys.stdout = captured_output = io.StringIO()
    
#     try:
#         exec_globals = {}
#         exec(code, exec_globals)
        
#         # 標準出力からキャプチャした内容を取得
#         output = captured_output.getvalue()
        
#         # JSONシリアライズ可能な形式に変換
#         exec_globals_serializable = {}
#         for k, v in exec_globals.items():
#             if isinstance(v, MyClass):
#                 exec_globals_serializable[k] = v.__dict__
#             elif isinstance(v, (str, int, float, list, dict, bool, type(None))):
#                 exec_globals_serializable[k] = v
        
#         exec_globals_serializable['print_output'] = output
        
#         return jsonify({'result': exec_globals_serializable})
#     except Exception as e:
#         return jsonify({'error': str(e), 'traceback': traceback.format_exc()})
#     finally:
#         sys.stdout = old_stdout  # 標準出力を元に戻す

# if __name__ == '__main__':
#     app.run(debug=True, host='0.0.0.0', port=8000)  # ローカルネットワーク内からのアクセスも許可


