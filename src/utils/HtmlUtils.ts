/* 文字列からDocumentを取得 */
export const parseHtmlString = (htmlString: string): Document | null =>
{
    // パーサーを作成
    const parser = new DOMParser();

    try
    {
        // HTML文字列を解析して Document オブジェクトを取得
        const doc = parser.parseFromString(htmlString, 'text/html');

        // エラーチェック
        const errorNode = doc.querySelector('parsererror');
        if (errorNode)
        {
            console.error("HTML解析エラー:", errorNode.textContent);
            return null;
        }

        // 解析されたドキュメントを返す
        return doc;
    }
    catch (error:unknown)
    {
        if (error instanceof Error) {
            console.error("HTML解析エラー:", error.message);
        } else {
            console.error("HTML解析エラー:", String(error));
        }
        return null;
    }
}

// 画像のオリジンが自サイトか判定
export const checkOrigin = (effectiveSrc: string) =>
{
    // Data URL は 同一オリジン扱い
    if (effectiveSrc.startsWith('data:'))
    {
        return true;
    }

    try
    {
        const pageOrigin = window.location.origin;
        const imageOrigin = new URL(effectiveSrc).origin; // URLを解析してオリジン取得 (blob: も扱える)

        const isSameOrigin = imageOrigin === pageOrigin;
        return isSameOrigin;

    } catch (e)
    {
        // URL解析に失敗した場合 (無効なURL、稀に相対パスなど)
        console.error(`URL解析エラー: ${ effectiveSrc }`, e);
        return true;
    }
};