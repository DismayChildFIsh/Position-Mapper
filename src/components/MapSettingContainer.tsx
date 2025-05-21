interface MapSettingContainerProps
{
    children: React.ReactNode;
}

/** マップ設定コンテナコンポーネント */
export const MapSettingContainer = ({ children }: MapSettingContainerProps) =>
{
    return (
        <fieldset className="mx-3 my-4">
            { children }
        </fieldset>
    );
}