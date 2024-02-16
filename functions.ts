import type { FieldContext } from 'vee-validate';

type InteractionEventGetter = (ctx: FieldContext) => string[];

const passive = () => [];

const lazy: InteractionEventGetter = ({ meta, errorMessage }) => {
    return ['change'];
};

const aggressive: InteractionEventGetter = () => ['input'];

const eager: InteractionEventGetter = ({ meta, errorMessage }) => {
    if (errorMessage.value) {
        return ['input'];
    }

    return ['change'];
};

export const modes: any = {
    passive,
    lazy,
    aggressive,
    eager,
};


export const sliceText = (text: string, number: number) => {
    if (text?.length < number) {
        return text
    } else {
        return text?.slice(0, number) + '...'
    }
}
export const formatQueryString = (queryObject: Record<string, any>) => {
    const filteredQueryObject: Record<string, string | number> = Object.keys(queryObject)
        // .filter((key) => key !== "page")
        .reduce((obj, key) => {
            obj[key] = queryObject[key];
            return obj;
        }, {} as Record<string, string | number>);
    const queryString = Object.keys(filteredQueryObject)
        .map((key) => `${key}=${filteredQueryObject[key]}`)
        .join("&");
    return queryString;
};

export  const handleInputTextArea = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
};
export const debounce = (func: Function, delay: number) => {
    let timer: number;
    return (...args: any[]) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => {
            func(...args);
        }, delay);
    };
};
export const goTo = (link: string, type: string, show: any, router:any) => {
    show
    if (type === "category") {
        setTimeout(() => {
            router.push(`/kategoria/${link}`);
        }, 54);
    } else if (type === "post") {
        setTimeout(() => {
            router.push(`/post/${link}`);
        }, 54);
    } else {
        setTimeout(() => {
            router.push(`/autor/${link}`);
        }, 54);
    }
};
