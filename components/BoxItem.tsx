import produce from "immer";
import { useCallback, useLayoutEffect, useRef } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { useRecoilState } from "recoil";
import { elementState, isSelectedState } from "../state/element";
import { roundTo10 } from "../utils/round";

const BoxItem = ({ id }: { id: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [element, setElement] = useRecoilState(elementState(id));

    const [isSelected, setIsSelected] = useRecoilState(isSelectedState(id));

    const updateSize = useCallback(() => {
        setElement((element) =>
            produce(element, (draft) => {
                draft.size = {
                    width: ref.current!.offsetWidth,
                    height: ref.current!.offsetHeight,
                };
            })
        );
    }, [setElement]);

    useLayoutEffect(() => {
        // initialize element with right size
        updateSize();
    }, [updateSize]);

    const updatePosition: DraggableEventHandler = (_, position) => {
        setElement((element) =>
            produce(element, (draft) => {
                const rect = ref.current!.getBoundingClientRect();
                draft.position.left = rect.x;
                draft.position.top = rect.y;
            })
        );
        updateSize();
    };

    return (
        <Draggable nodeRef={ref} bounds="parent" onDrag={updatePosition}>
            <div
                ref={ref}
                className="hover:cursor-move box-border bg-lime-200 px-4 py-3 inline-block shadow-xl"
            >
                <h1>
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={isSelected}
                        onChange={() => setIsSelected(!isSelected)}
                        onTouchStart={() => setIsSelected(!isSelected)}
                    />
                    BoxItem
                </h1>
                <p>
                    x: {element.position.left.toFixed(0)} y:{" "}
                    {element.position.top}
                </p>
                <p>
                    w: {element.size.width.toFixed(0)} h:{" "}
                    {element.size.height.toFixed(0)}
                </p>
            </div>
        </Draggable>
    );
};

export default BoxItem;
