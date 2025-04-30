export type PracticeBasicInfo = {
    _id: string;
    name: string;
    description: string;
}

export type PracticeWithExample = PracticeBasicInfo & {
    examples: {
        positive: Example[];
        negative: Example[];
    };
    categories: string[];
    space: {
        _id: string;
        name: string;
    };
    created: string;
};

export type Example = {
    _id: string;
    position: {
        begin: {
            ch: number;
            line: number;
        };
        end: {
            ch: number;
            line: number;
        };
    };
    description: string;
    fileWorkshopPreview?: {
        contents: {
            _id: string;
            content: string;
            line: number;
        }[];
        lang: string;
        path: string;
    };
};