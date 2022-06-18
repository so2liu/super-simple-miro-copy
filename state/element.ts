import { atom, atomFamily, selectorFamily } from "recoil";
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

const elementIds = atom<Array<string>>({
    key: "elementIds",
    default: [],
});

const elementState = atomFamily<Element | null, string>({
    key: "elementState",
    default: null,
});

export const element = selectorFamily<Element | null, string>({
    key: "elements",
    get:
        (id) =>
        ({ get }) => {
            const atom = get(elementState(id));
            return atom;
        },
    set:
        (id) =>
        ({ set, reset }, element) => {
            if (guardRecoilDefaultValue(element)) {
                reset(elementState(id));
                return;
            }
            set(elementIds, (ids) => uniq([...ids, id]));
            set(elementState(id), element);
        },
});

const selectedElementIds = atom<string[]>({
    key: "selectedElementIds",
    default: [],
});

export const isSelected = selectorFamily<boolean, string>({
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

export const outerbox = selectorFamily<Omit<Element, "id">, string[]>({
    key: "outerbox",
    get:
        (ids) =>
        ({ get }) => {
            const elements = ids
                .map((id) => get(element(id)))
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
