import { nanoid } from "nanoid";
import { useRecoilState } from "recoil";
import { elementIdsState } from "../state/element";
import BoxItem from "./BoxItem";

const BoxPlane = () => {
    const [elementIds, setElementIds] = useRecoilState(elementIdsState);
    const onAddElement = () => setElementIds((ids) => [...ids, nanoid()]);

    return (
        <div className="h-full">
            <div className="h-full bg-slate-500">
                {elementIds.map((id) => (
                    <BoxItem key={id} id={id} />
                ))}
            </div>
            <div className="absolute bottom-5 right-5 bg-transparent p-5">
                <button
                    className="rounded-md  bg-lime-200 hover:bg-lime-100 px-2 py-1"
                    onClick={onAddElement}
                >
                    Create A Box
                </button>
            </div>
        </div>
    );
};

export default BoxPlane;
