import { useRecoilValue } from "recoil";
import { outerboxState } from "../state/element";

const OuterPlane = () => {
    const outerBox = useRecoilValue(outerboxState);
    if (!outerBox) return null;
    return (
        <div
            className="border-2 border-gray-300 border-dashed bg-transparent"
            style={{
                position: "absolute",
                top: outerBox.position.top,
                left: outerBox.position.left,
                width: outerBox.size.width,
                height: outerBox.size.height,
            }}
        ></div>
    );
};
export default OuterPlane;
