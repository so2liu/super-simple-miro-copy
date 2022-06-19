import produce from "immer";
import { useCallback, useLayoutEffect, useRef } from "react";
import Draggable, { DraggableEventHandler } from "react-draggable";
import { useRecoilState } from "recoil";
import { elementState, isSelectedState } from "../state/element";

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

    const onStop: DraggableEventHandler = (_, position) => {
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
        <Draggable nodeRef={ref} bounds="parent" onStop={onStop}>
            <div
                ref={ref}
                className="hover:cursor-move border-2 border-gray-300 rounded-lg p-2 inline-block"
            >
                <h1>
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => setIsSelected(!isSelected)}
                    />
                    BoxItem
                </h1>
                <p>
                    x: {element.position.left} y: {element.position.top}
                </p>
                <p>
                    w: {element.size.width} h: {element.size.height}
                </p>
            </div>
        </Draggable>
    );
};

export default BoxItem;
