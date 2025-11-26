export interface topic {
    topic_name : string;
    topic_content : string;
}

export interface topics {
    source_name : string;
    topics : topic[]
}

export interface question {
    question : string;
    options : string[];
    answer : string;
}

export interface questions {
    title : string;
    questions : question[];
}