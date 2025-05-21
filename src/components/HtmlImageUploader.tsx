import { useRef, useState } from "react";
import { useItemContext } from "../context/ItemContext";
import { parseHtmlString } from "../utils/HtmlUtils";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form';
import { Alert, InputGroup } from "react-bootstrap";

/** ティアメーカーのHTMLから画像を取得するアップローダコンポーネント */
export const HtmlImageUploader = () =>
{
    /** ティアメーカーのホスト名 */
    const TIERMAKER_HOST = "tiermaker.com";
    /** ティアメーカーのURL */
    const TIERMAKER_URL = "https://" + TIERMAKER_HOST + "/";
    /** ティアメーカーのテンプレート画像が配置されているタグのID */
    const TEMPLATE_IMAGE_LIST_ID = "create-image-carousel";

    const { addItem: addImage } = useItemContext();

    // エラー情報
    const [ errorText, setErrorText ] = useState<string>("");

    // HTMLが描き込まれるテキストエリアへの参照
    const textAreaRef = useRef<HTMLTextAreaElement>(null)

    /** ティアメーカーのテンプレート画像アップロード */
    const handleLoadImageHtml = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
    {
        // テキストエリア取得
        const textArea = textAreaRef.current;
        if (!textArea) return;
        const html = textArea.value;

        // HTML情報を取得
        const documentHtml = parseHtmlString(html);
        if (!documentHtml) {
            setErrorText("テンプレート取得に失敗しました。やり方を確認して下さい。");
            return;
        }

        // テンプレート画像が配置されている要素を取得
        const imagesDev = documentHtml.getElementById(TEMPLATE_IMAGE_LIST_ID);
        if (!imagesDev){ 
            setErrorText("テンプレート取得に失敗しました。TierMakerのサイト構成が変更された可能性があります。")
            return;
        }

        // テンプレート画像をすべて取得
        const images = imagesDev.querySelectorAll('img');
        images.forEach(img =>
        {
            const urlObject = new URL(img.src);
            urlObject.port = "";
            urlObject.host = TIERMAKER_HOST;

            const image = new Image();
            // ロード成功時
            image.onload = () =>
            {
                addImage(urlObject.toString(), image.naturalWidth, image.naturalHeight);
            };

            // ロード失敗時
            image.onerror = (event: string | Event) =>{
                setErrorText(errorText + "画像の読み込みに失敗しました。:" + image.src + "\n");
                console.error(event);
            }

            image.src = urlObject.toString();
        })

        textArea.value = "";
        setErrorText("");
    }

    return (
        <>
            <InputGroup>
                <InputGroup.Text >
                    <a href={TIERMAKER_URL} target="_blank" rel="noopener noreferrer">TierMaker</a>のテンプレートを使用:
                </InputGroup.Text>
                <Form.Control as="textarea" ref={ textAreaRef } />
                <Button
                    onClick={ handleLoadImageHtml }
                >
                    追加
                </Button>
            </InputGroup>
            <details>
                <summary>やり方</summary>
                <ol>
                    <li>
                        <a href={TIERMAKER_URL} target="_blank" rel="noopener noreferrer">TierMaker</a>で、使用したいテンプレートがあるページを開く。※TierMaker Liveからは読み込めません。
                    </li>
                    <li>
                        使用したい画像が下の方に並んでいることを確認する。※ティア表にある画像は読み込みません。
                    </li>
                    <li>
                        デペロッパーツールを起動する。F12または、ブラウザのメニューから「その他のツール」→「デペロッパーツール」
                    </li>
                    <li>
                        「Elements」タブの&lt;html&gt;を右クリックして、「copy」→「copy elements」を選択。または&lt;html&gt;を選択してCtrl + Cキー。
                    </li>
                    <li>
                        テキストボックスに貼り付けて「追加」ボタン押下。
                    </li>
                </ol>
            </details>
            { errorText.length > 0 && (
                <Alert variant="danger">
                    { errorText }
                </Alert>
            ) }
        </>
    );
}