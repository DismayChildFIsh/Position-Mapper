import { test, expect, Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});

async function setLabel(page:Page){
    await page.locator('input[name="yAxisHigh"]').fill('UpLabel');
    await page.locator('input[name="yAxisLow"]').fill('BottomLabel');
    await page.locator('input[name="xAxisLow"]').fill('LeftLabel');
    await page.locator('input[name="xAxisHigh"]').fill('RightLabel');
}

test('label test', async ({ page }) => {
    setLabel(page);
  
  await expect(page.locator('canvas').first()).toHaveScreenshot('label-test.png');
});

async function setMapSize(page:Page){
    await page.getByRole('slider', { name: '横:' }).fill('500');
    await page.getByRole('slider', { name: '縦:' }).fill('500');
}

test('map size test', async ({ page }) => {
    setLabel(page);
    setMapSize(page);

    await expect(page.locator('canvas').first()).toHaveScreenshot('map-size-test.png');
});

async function setFont(page:Page){
    await page.locator('fieldset').filter({ hasText: 'ラベルサイズ:40pxフォント:Yu Gothic UI' }).getByRole('slider').fill('20');
    await page.getByRole('combobox').selectOption('游明朝');
}

test('label font test', async ({ page }) => {
    setLabel(page);
    setMapSize(page);
    setFont(page);

    await expect(page.locator('canvas').first()).toHaveScreenshot('label-font-test.png');
});

test('image upload', async ({ page }) => {
    setLabel(page);
    setMapSize(page);
    setFont(page);
    await page.getByRole('button', { name: 'Choose File' }).click();
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles(['E:/03_Programming/17_position_map/03_src/Position-Mapper/tests/images/download-10jpeg.png']);
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles(['E:/03_Programming/17_position_map/03_src/Position-Mapper/tests/images/download-13jpeg.png']);
    await page.getByRole('button', { name: 'Choose File' }).setInputFiles(['E:/03_Programming/17_position_map/03_src/Position-Mapper/tests/images/download-14jpeg.png']);

    await expect(page.locator('div:nth-child(8) > div')).toHaveScreenshot('image-upload-test.png');

    // リストの画像をクリックしたら、削除ボタンが表示されるかどうか
    await page.getByRole('button').filter({ hasText: /^$/ }).first().click();
    await expect(page.getByRole('button').filter({ hasText: /^$/ }).first()).toHaveScreenshot('list-image-click-test.png');

    // リストの別画像をクリックしたら、元の画像から削除ボタンが消え、クリックした画像に削除ボタンが表示されるかどうか
    await page.getByRole('button').filter({ hasText: /^$/ }).nth(1).click();
    await expect(page.getByRole('button').filter({ hasText: /^$/ }).first()).toHaveScreenshot('list-image-click-change-test1.png');
    await expect(page.getByRole('button').filter({ hasText: /^$/ }).nth(1)).toHaveScreenshot('list-image-click-change-test2.png');

    // 削除ボタンをクリックしたら、画像が削除されるかどうか
    await page.getByTestId('delete-btn').click();
    await expect(page.locator('div:nth-child(8) > div')).toHaveScreenshot('image-delete-test.png');

    // リストにある画像をドラッグアンドドロップでマップ上に配置できるかどうか
    await page.getByRole('button').first().hover();
    await page.mouse.down();
    await page.locator('canvas').first().hover({
        position: {
            x: 164,
            y: 297
        }
    });
    await page.mouse.up();

    await  page.getByRole('button').filter({ hasText: /^$/ }).first().hover();
    await page.mouse.down();
    await page.locator('canvas').first().hover({
        position: {
            x: 367,
            y: 273
        }
    });
    await page.mouse.up();
   
    await expect(page.locator('canvas').first()).toHaveScreenshot('image-drag-drop-test.png', {maxDiffPixelRatio:0.1});


    // 拡大ボタンで大きくなる
    await page.getByTestId('enlarge-btn').click();
    await page.getByTestId('enlarge-btn').click();
    await page.getByTestId('enlarge-btn').click();
    await expect(page.locator('canvas').first()).toHaveScreenshot('image-zoom-up-test.png', {maxDiffPixelRatio:0.01});

    // 縮小ボタンで小さくなる
    await page.getByTestId('shrink-btn').click();
    await page.getByTestId('shrink-btn').click();
    await page.getByTestId('shrink-btn').click();
    await expect(page.locator('canvas').first()).toHaveScreenshot('image-zoom-out-test.png', {maxDiffPixelRatio:0.01});

    // キャンパスをクリックすることで、拡大縮小ボタンが消える
    await page.locator('canvas').first().click();
    await expect(page.locator('canvas').first()).toHaveScreenshot('image-hide-button-test.png', {maxDiffPixelRatio:0.01});

    // 画像サイズ一括設定スライダーを動かすと、全ての画像のサイズが変わる
    await page.getByRole('group', { name: '画像サイズ一括設定' }).getByRole('slider').fill('120');
    await expect(page.locator('canvas').first()).toHaveScreenshot('image-all-change-test.png', {maxDiffPixelRatio:0.01});

    // マップ上の画像をリストへドラッグアンドドロップするとリストへ移動する
    await page.getByRole('button').first().hover();
    await page.mouse.down();
    await page.locator('div:nth-child(8) > div').hover();
    await page.mouse.up();
    await expect(page.locator('canvas').first()).toHaveScreenshot('image-back-list-test1.png');
    await expect(page.locator('div:nth-child(8) > div')).toHaveScreenshot('image-back-list-test2.png');

});

test('text image upload', async ({ page }) => {
    await page.locator('div').filter({ hasText: /^文字列:追加$/ }).getByRole('textbox').click();
    await page.locator('div').filter({ hasText: /^文字列:追加$/ }).getByRole('textbox').fill('test');
    await page.locator('div').filter({ hasText: /^文字列:追加$/ }).getByRole('button').click();
    await expect(page.locator('div:nth-child(8) > div')).toHaveScreenshot('tesxt-image-upload-test.png');
});

test('tier maker image upload', async ({ page }) => {
    await page.locator('textarea').click();
    await page.locator('textarea').fill('<div id="char-tier-outer-container-scroll">\n  <div id="char-tier-container-scroll">\n    <div id="create-image-carousel" class="sort">\n      <div></div>\n      <div id="1" class="character" style="background-image: url(&quot;/images/chart/chart/-835804/05a06b46-d602-4c70-a464-456b56f0bbb1png.png&quot;);">\n        <img class="draggable-filler" src="/images/chart/chart/-835804/05a06b46-d602-4c70-a464-456b56f0bbb1png.png" style="visibility: hidden">\n      </div>      \n    </div>\n  </div>\n</div>');
    await page.locator('div').filter({ hasText: /^TierMakerのテンプレートを使用:追加$/ }).getByRole('button').click();
    await page.waitForTimeout(2000);
    await expect(page.getByRole('img').first()).toBeVisible();



    await expect(page.locator('div:nth-child(8) > div').first()).toHaveScreenshot('templeate-image-upload-test.png');
});

