/** フッターコンポーネント */
export const Footer = () =>
{
    return (
        <>
            <hr />
            {/* 
                pyはpadding、mはmargin。
                yはtopとbottom
            */}
            <footer className="py-3 my-4">
                <p className="text-center">
                    © 2025 狼狽う子は魚(Dismay Child Fish)
                </p>
            </footer>
        </>
    );
}