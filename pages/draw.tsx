import { RecoilRoot } from "recoil";
import BoxPlane from "../components/BoxPlane";
import CanvasPlane from "../components/CanvasPlane";
import OuterPlane from "../components/OuterPlane";

const Draw = () => {
    return (
        <RecoilRoot>
            <div className="relative h-screen">
                <OuterPlane />
                <BoxPlane />
                <CanvasPlane />
            </div>
        </RecoilRoot>
    );
};

export default Draw;
