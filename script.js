// DOM要素
const aiProviderSelect = document.getElementById('aiProvider');
const apiKeyInput = document.getElementById('apiKey');
const promptInput = document.getElementById('prompt');
const codeTypeSelect = document.getElementById('codeType');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');
const refreshPreviewBtn = document.getElementById('refreshPreviewBtn');
const codeOutput = document.getElementById('codeOutput');
const previewFrame = document.getElementById('previewFrame');
const previewError = document.getElementById('previewError');
const loadingSpinner = document.getElementById('loadingSpinner');
const apiKeyHint = document.getElementById('apiKeyHint');
const apiLinkGemini = document.getElementById('apiLinkGemini');
const apiLinkOpenAI = document.getElementById('apiLinkOpenAI');

// ローカルストレージキー
const STORAGE_KEY = 'aiCodeGeneratorState';

// 初期化
function init() {
    loadFromStorage();
    setupEventListeners();
    updateAPILinkVisibility();
}

// イベントリスナー設定
function setupEventListeners() {
    generateBtn.addEventListener('click', generateCode);
    copyBtn.addEventListener('click', copyCode);
    downloadBtn.addEventListener('click', downloadCode);
    refreshPreviewBtn.addEventListener('click', updatePreview);
    aiProviderSelect.addEventListener('change', updateAPILinkVisibility);
    codeOutput.addEventListener('change', updatePreview);
}

// APIプロバイダ切り替えに伴うUIの更新
function updateAPILinkVisibility() {
    const provider = aiProviderSelect.value;
    const isGemini = provider === 'gemini';
    
    if (isGemini) {
        apiKeyHint.textContent = 'Gemini API Key は安全にブラウザに保存されます';
        apiLinkGemini.style.display = 'block';
        apiLinkOpenAI.style.display = 'none';
        apiKeyInput.placeholder = 'gemini-...';
    } else {
        apiKeyHint.textContent = 'OpenAI API Key は安全にブラウザに保存されます';
        apiLinkGemini.style.display = 'none';
        apiLinkOpenAI.style.display = 'block';
        apiKeyInput.placeholder = 'sk-...';
    }
}

// ストレージから復元
function loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const state = JSON.parse(saved);
        promptInput.value = state.prompt || '';
        codeTypeSelect.value = state.codeType || 'html-css-js';
        aiProviderSelect.value = state.aiProvider || 'gemini';
        if (state.apiKey) {
            apiKeyInput.value = state.apiKey;
        }
    }
}

// ストレージに保存
function saveToStorage() {
    const state = {
        prompt: promptInput.value,
        codeType: codeTypeSelect.value,
        apiKey: apiKeyInput.value,
        aiProvider: aiProviderSelect.value
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// コード生成
async function generateCode() {
    const apiKey = apiKeyInput.value.trim();
    const prompt = promptInput.value.trim();
    const codeType = codeTypeSelect.value;
    const aiProvider = aiProviderSelect.value;

    // バリデーション
    if (!apiKey) {
        showError('API Keyを入力してください');
        return;
    }
    if (!prompt) {
        showError('プロンプトを入力してください');
        return;
    }

    // ローディング表示
    showLoading(true);
    clearError();
    saveToStorage();

    try {
        let code;
        if (aiProvider === 'gemini') {
            code = await callGeminiAPI(apiKey, prompt, codeType);
        } else {
            code = await callOpenAIAPI(apiKey, prompt, codeType);
        }
        displayCode(code);
        updatePreview();
    } catch (error) {
        showError(`エラー: ${error.message}`);
        console.error(error);
    } finally {
        showLoading(false);
    }
}

// Google Gemini API呼び出し
async function callGeminiAPI(apiKey, prompt, codeType) {
    const systemPrompt = getSystemPrompt(codeType);
    const userPrompt = `${prompt}\n\n完全に機能するコードを生成してください。HTMLの場合は<html>から</html>までの完全な構造を含めてください。`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [
                    {
                        text: systemPrompt + '\n\n' + userPrompt
                    }
                ]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2000,
            }
        })
    });

    if (!response.ok) {
        const error = await response.json();
        const errorMessage = error.error?.message || 'Gemini API呼び出しに失敗しました';
        throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('API が無効な応答を返しました');
    }

    return data.candidates[0].content.parts[0].text;
}

// OpenAI API呼び出し
async function callOpenAIAPI(apiKey, prompt, codeType) {
    const systemPrompt = getSystemPrompt(codeType);
    const userPrompt = `${prompt}\n\n完全に機能するコードを生成してください。HTMLの場合は<html>から</html>までの完全な構造を含めてください。`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-4-turbo-preview',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
            max_tokens: 2000
        })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'OpenAI API呼び出しに失敗しました');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// システムプロンプトの取得
function getSystemPrompt(codeType) {
    const prompts = {
        'html-css-js': `あなたは優秀なフロントエンド開発者です。ユーザーのリクエストに基づいて、完全に機能するHTML/CSS/JavaScriptコードを生成してください。

以下のルールに従ってください：
1. 完全なHTMLドキュメント構造を含める（<!DOCTYPE html>から始まる）
2. CSSはHTMLの<style>タグ内に含める
3. JavaScriptはHTMLの<script>タグ内に含める
4. モダンで見栄えの良いデザインを心がける
5. レスポンシブデザインを考慮する
6. アクセシビリティを考慮する
7. コードには適切なコメントを付ける
8. 外部ライブラリは必要な場合のみ使用する`,
        'react': `あなたは優秀なReact開発者です。ユーザーのリクエストに基づいて、機能するReactコンポーネントを生成してください。

ルール：
1. JSX構文を使用
2. 必要に応じてhooksを使用
3. CSSはコンポーネント内に含める
4. 完全で実行可能なコードを生成
5. PropTypesまたはTypeScriptの型定義を含める`,
        'vue': `あなたは優秀なVue開発者です。ユーザーのリクエストに基づいて、機能するVueコンポーネントを生成してください。

ルール：
1. Vue 3の<script setup>構文を使用
2. テンプレートとスタイルを含める
3. リアクティビティを適切に使用
4. 完全で実行可能なコードを生成`
    };

    return prompts[codeType] || prompts['html-css-js'];
}

// コードを表示
function displayCode(code) {
    // コードブロックを抽出
    const cleanCode = extractCodeBlock(code);
    codeOutput.innerHTML = `<pre><code>${escapeHtml(cleanCode)}</code></pre>`;
}

// マークダウンのコードブロックを抽出
function extractCodeBlock(text) {
    // ```で囲まれたコードブロックを探す
    const match = text.match(/```(?:html|jsx|vue|javascript|js)?\n?([\s\S]*?)```/m);
    if (match) {
        return match[1].trim();
    }
    // コードブロックがない場合は全文を返す
    return text.trim();
}

// HTMLエスケープ
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// プレビュー更新
function updatePreview() {
    const code = codeOutput.textContent;
    clearError();

    if (!code || code === '// コードがここに表示されます') {
        previewFrame.srcdoc = '<p style="padding: 2rem; color: #999;">コードを生成してください</p>';
        return;
    }

    try {
        // HTMLコードをiframeに設定
        if (code.includes('<!DOCTYPE') || code.includes('<html')) {
            previewFrame.srcdoc = code;
        } else if (code.includes('import React') || code.includes('export') || (code.includes('function') && code.includes('return'))) {
            // ReactやVueコンポーネントの場合は警告を表示
            showError('ReactやVueコンポーネントはこのプレビューでは表示できません。');
            previewFrame.srcdoc = '<p style="padding: 2rem; color: #666;">React/Vueコンポーネントはこのプレビューウィンドウでは表示できません。生成されたコードを参照してください。</p>';
        } else {
            // HTMLラッパーで囲む
            const wrapped = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; }
    </style>
</head>
<body>
${code}
</body>
</html>`;
            previewFrame.srcdoc = wrapped;
        }
    } catch (error) {
        showError(`プレビューエラー: ${error.message}`);
    }
}

// コピー
async function copyCode() {
    const code = codeOutput.textContent;
    if (code === '// コードがここに表示されます') {
        showError('コピーするコードがありません');
        return;
    }

    try {
        await navigator.clipboard.writeText(code);
        showSuccess('コードをコピーしました！');
    } catch (error) {
        showError('コピーに失敗しました');
    }
}

// ダウンロード
function downloadCode() {
    const code = codeOutput.textContent;
    if (code === '// コードがここに表示されます') {
        showError('ダウンロードするコードがありません');
        return;
    }

    const codeType = codeTypeSelect.value;
    const extensions = {
        'html-css-js': 'html',
        'react': 'jsx',
        'vue': 'vue'
    };

    const filename = `generated-code.${extensions[codeType]}`;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showSuccess(`${filename} をダウンロードしました！`);
}

// UI ヘルパー
function showLoading(show) {
    loadingSpinner.style.display = show ? 'flex' : 'none';
    codeOutput.style.display = show ? 'none' : 'block';
    generateBtn.disabled = show;
}

function showError(message) {
    previewError.textContent = message;
    previewError.style.display = 'block';
}

function clearError() {
    previewError.style.display = 'none';
}

function showSuccess(message) {
    // 成功メッセージを一時的に表示
    const originalText = generateBtn.textContent;
    generateBtn.textContent = '✓ ' + message;
    setTimeout(() => {
        generateBtn.textContent = originalText;
    }, 2000);
}

// 初期化実行
init();