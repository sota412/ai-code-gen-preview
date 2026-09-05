// DOM要素
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

// ローカルストレージキー
const STORAGE_KEY = 'aiCodeGeneratorState';

// 初期化
function init() {
    loadFromStorage();
    setupEventListeners();
}

// イベントリスナー設定
function setupEventListeners() {
    generateBtn.addEventListener('click', generateCode);
    copyBtn.addEventListener('click', copyCode);
    downloadBtn.addEventListener('click', downloadCode);
    refreshPreviewBtn.addEventListener('click', updatePreview);
    
    // コード出力が変わったら自動的にプレビューを更新
    codeOutput.addEventListener('change', updatePreview);
}

// ストレージから復元
function loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        const state = JSON.parse(saved);
        promptInput.value = state.prompt || '';
        codeTypeSelect.value = state.codeType || 'html-css-js';
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
        apiKey: apiKeyInput.value
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// コード生成
async function generateCode() {
    const apiKey = apiKeyInput.value.trim();
    const prompt = promptInput.value.trim();
    const codeType = codeTypeSelect.value;

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
        const code = await callOpenAIAPI(apiKey, prompt, codeType);
        displayCode(code);
        updatePreview();
    } catch (error) {
        showError(`エラー: ${error.message}`);
        console.error(error);
    } finally {
        showLoading(false);
    }
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
        throw new Error(error.error?.message || 'API呼び出しに失敗しました');
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

// システムプロンプトの取得
function getSystemPrompt(codeType) {
    const prompts = {
        'html-css-js': `あなたは優秀なフロントエンド開発者です。ユーザーのリクエストに基づいて、完全に機能するHTML/CSS/JavaScriptコードを生成してください。\n\n以下のルールに従ってください：\n1. 完全なHTMLドキュメント構造を含める（<!DOCTYPE html>から始まる）\n2. CSSはHTMLの<style>タグ内に含める\n3. JavaScriptはHTMLの<script>タグ内に含める\n4. モダンで見栄えの良いデザインを心がける\n5. レスポンシブデザインを考慮する\n6. アクセシビリティを考慮する\n7. コードには適切なコメントを付ける\n8. 外部ライブラリは必要な場合のみ使用する`,
        'react': `あなたは優秀なReact開発者です。ユーザーのリクエストに基づいて、機能するReactコンポーネントを生成してください。\n\nルール：\n1. JSX構文を使用\n2. 必要に応じてhooksを使用\n3. CSSはコンポーネント内に含める\n4. 完全で実行可能なコードを生成\n5. PropTypesまたはTypeScriptの型定義を含める`,
        'vue': `あなたは優秀なVue開発者です。ユーザーのリクエストに基づいて、機能するVueコンポーネントを生成してください。\n\nルール：\n1. Vue 3の<script setup>構文を使用\n2. テンプレートとスタイルを含める\n3. リアクティビティを適切に使用\n4. 完全で実行可能なコードを生成`
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
    const match = text.match(/```(?:html|jsx|vue)?\n?([\s\S]*?)```/m);
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
        previewFrame.srcdoc = '<p>コードを生成してください</p>';
        return;
    }

    try {
        // HTMLコードをiframeに設定
        if (code.includes('<!DOCTYPE') || code.includes('<html')) {
            previewFrame.srcdoc = code;
        } else if (code.includes('import React') || code.includes('function')) {
            // ReactやVueコンポーネントの場合は警告を表示
            showError('Reactコンポーネントはプレビューできません。本プロジェクトで確認してください。');
            previewFrame.srcdoc = '<p>Reactコンポーネントはこのプレビューウィンドウでは表示できません。</p>';
        } else {
            // HTMLラッパーで囲む
            const wrapped = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
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
