import './App.css'

import { LabelNameSetting } from './components/LabelNameSetting';
import { MapSizeSetting } from './components/MapSizeSetting';
import { LabelFontSetting } from './components/LabelFontSetting';
import { ImageUploader } from './components/ImageUploader';
import { AllItemSizeChanger } from './components/AllImageSizeChanger';
import { MapContextProvider } from './context/MapContextProvider';
import { DropArea } from './components/DropArea';
import { ItemItemContextProvider } from './context/ItemContextProvider';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

/**
 * ポジショニングマップ生成ツール
 */
function App()
{
  return (
    <ItemItemContextProvider>
      <MapContextProvider>
        <Header />
        <main>
          <LabelNameSetting />
          <MapSizeSetting />
          <LabelFontSetting />
          <AllItemSizeChanger />
          <hr></hr>
          <DropArea />
          <ImageUploader />
        </main>
        <Footer />
      </MapContextProvider>
    </ItemItemContextProvider>
  );
}

export default App
