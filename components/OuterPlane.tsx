import { useRecoilValue } from "recoil";
import { outerboxState } from "../state/element";

const OuterPlane = () => {
    const outerBox = useRecoilValue(outerboxState);
    if (!outerBox) return null;
    return (
        <div
            className="box-border border-2 border-gray-300 border-dashed bg-transparent"
            style={{
                position: "absolute",
                top: outerBox.position.top,
                left: outerBox.position.left,
                width: outerBox.size.width,
                height: outerBox.size.height,
            }}
        >
            <div className="relative bottom-0 right-0">
                <p>
                    x: {outerBox.position.left.toFixed(0)} y:{" "}
                    {outerBox.position.top.toFixed(0)}
                </p>
                <p>
                    w: {outerBox.size.width.toFixed(0)} h:{" "}
                    {outerBox.size.height.toFixed(0)}
                </p>
            </div>
        </div>
    );
};
export default OuterPlane;
