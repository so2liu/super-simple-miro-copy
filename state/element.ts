import { atom, atomFamily, selector, selectorFamily } from "recoil";
import { guardRecoilDefaultValue } from "./utils";
import { uniq } from "lodash";

interface Element {
    id: string;
    position: {
        left: number;
        top: number;
    };
    size: {
        width: number;
        height: number;
    };
    label: string;
}

export const elementIdsState = atom<Array<string>>({
    key: "elementIds",
    default: [],
});

const elementAtom = atomFamily<Element, string>({
    key: "elementState",
    default: {
        id: "",
        position: {
            left: 0,
            top: 0,
        },
        size: {
            width: 100,
            height: 100,
        },
        label: "untitled",
    },
});

export const elementState = selectorFamily<Element, string>({
    key: "elements",
    get:
        (id) =>
        ({ get }) => {
            const atom = get(elementAtom(id));
            return atom;
        },
    set:
        (id) =>
        ({ set, reset }, element) => {
            if (guardRecoilDefaultValue(element)) {
                reset(elementAtom(id));
                return;
            }
            set(elementIdsState, (ids) => uniq([...ids, id]));
            set(elementAtom(id), element);
        },
});

const selectedElementIds = atom<string[]>({
    key: "selectedElementIds",
    default: [],
});

export const isSelectedState = selectorFamily<boolean, string>({
    key: "isSelected",
    get:
        (id) =>
        ({ get }) => {
            const selectedIds = get(selectedElementIds);
            return selectedIds.includes(id);
        },
    set:
        (id) =>
        ({ set, reset }, isSelected) => {
            if (isSelected) {
                set(selectedElementIds, (ids) => uniq([...ids, id]));
            } else {
                set(selectedElementIds, (ids) => ids.filter((i) => i !== id));
            }
        },
});

export const outerboxState = selector<Omit<Element, "id"> | null>({
    key: "outerbox",
    get: ({ get }) => {
        const ids = get(selectedElementIds);
        if (ids.length === 0) return null;
        const elements = ids
            .map((id) => get(elementState(id)))
            .filter((e): e is Element => e !== null);
        const left = Math.min(...elements.map((e) => e.position.left));
        const top = Math.min(...elements.map((e) => e.position.top));
        const right = Math.max(
            ...elements.map((e) => e.position.left + e.size.width)
        );
        const bottom = Math.max(
            ...elements.map((e) => e.position.top + e.size.height)
        );
        return {
            position: {
                left,
                top,
            },
            size: {
                width: right - left,
                height: bottom - top,
            },
            label: "box",
        };
    },
});
