export declare const graph: import("@langchain/langgraph").CompiledStateGraph<{
    _messages: import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[];
    highlightedCode: import("@opencanvas/shared/types").CodeHighlight | undefined;
    highlightedText: import("@opencanvas/shared/types").TextHighlight | undefined;
    artifact: import("@opencanvas/shared/types").ArtifactV3;
    next: string | undefined;
    language: import("@opencanvas/shared/types").LanguageOptions | undefined;
    artifactLength: import("@opencanvas/shared/types").ArtifactLengthOptions | undefined;
    regenerateWithEmojis: boolean | undefined;
    readingLevel: import("@opencanvas/shared/types").ReadingLevelOptions | undefined;
    addComments: boolean | undefined;
    addLogs: boolean | undefined;
    portLanguage: import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined;
    fixBugs: boolean | undefined;
    customQuickActionId: string | undefined;
    webSearchEnabled: boolean | undefined;
    webSearchResults: import("@opencanvas/shared/types").SearchResult[] | undefined;
    messages: import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[];
}, {
    _messages?: import("./state.js").Messages | undefined;
    highlightedCode?: import("@opencanvas/shared/types").CodeHighlight | undefined;
    highlightedText?: import("@opencanvas/shared/types").TextHighlight | undefined;
    artifact?: import("@opencanvas/shared/types").ArtifactV3 | undefined;
    next?: string | undefined;
    language?: import("@opencanvas/shared/types").LanguageOptions | undefined;
    artifactLength?: import("@opencanvas/shared/types").ArtifactLengthOptions | undefined;
    regenerateWithEmojis?: boolean | undefined;
    readingLevel?: import("@opencanvas/shared/types").ReadingLevelOptions | undefined;
    addComments?: boolean | undefined;
    addLogs?: boolean | undefined;
    portLanguage?: import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined;
    fixBugs?: boolean | undefined;
    customQuickActionId?: string | undefined;
    webSearchEnabled?: boolean | undefined;
    webSearchResults?: import("@opencanvas/shared/types").SearchResult[] | undefined;
    messages?: import("@langchain/langgraph").Messages | undefined;
}, "rewriteArtifact" | "generateArtifact" | "replyToGeneralInput" | "updateArtifact" | "updateHighlightedText" | "rewriteArtifactTheme" | "rewriteCodeArtifactTheme" | "customAction" | "webSearch" | "summarizer" | "__start__" | "generateTitle" | "generatePath" | "generateFollowup" | "cleanState" | "reflect" | "routePostWebSearch", {
    _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
    highlightedCode: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    highlightedText: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    artifact: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    next: {
        (): import("@langchain/langgraph").LastValue<string | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    language: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    artifactLength: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    regenerateWithEmojis: {
        (): import("@langchain/langgraph").LastValue<boolean | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    readingLevel: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    addComments: {
        (): import("@langchain/langgraph").LastValue<boolean | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    addLogs: {
        (): import("@langchain/langgraph").LastValue<boolean | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    portLanguage: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    fixBugs: {
        (): import("@langchain/langgraph").LastValue<boolean | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    customQuickActionId: {
        (): import("@langchain/langgraph").LastValue<string | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    webSearchEnabled: {
        (): import("@langchain/langgraph").LastValue<boolean | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    webSearchResults: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
}, {
    _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
    highlightedCode: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    highlightedText: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    artifact: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    next: {
        (): import("@langchain/langgraph").LastValue<string | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    language: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    artifactLength: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    regenerateWithEmojis: {
        (): import("@langchain/langgraph").LastValue<boolean | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    readingLevel: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    addComments: {
        (): import("@langchain/langgraph").LastValue<boolean | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    addLogs: {
        (): import("@langchain/langgraph").LastValue<boolean | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    portLanguage: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    fixBugs: {
        (): import("@langchain/langgraph").LastValue<boolean | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    customQuickActionId: {
        (): import("@langchain/langgraph").LastValue<string | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    webSearchEnabled: {
        (): import("@langchain/langgraph").LastValue<boolean | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    webSearchResults: {
        (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
        (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
        Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
    };
    messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
}, import("@langchain/langgraph").StateDefinition, {
    generatePath: Partial<import("@langchain/langgraph").StateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>>;
    replyToGeneralInput: Partial<import("@langchain/langgraph").StateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>>;
    rewriteArtifact: Partial<import("@langchain/langgraph").StateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>>;
    rewriteArtifactTheme: Partial<import("@langchain/langgraph").StateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>>;
    rewriteCodeArtifactTheme: Partial<import("@langchain/langgraph").StateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>>;
    updateArtifact: Partial<import("@langchain/langgraph").StateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>>;
    updateHighlightedText: Partial<import("@langchain/langgraph").StateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>>;
    generateArtifact: Partial<import("@langchain/langgraph").StateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>>;
    customAction: Partial<import("@langchain/langgraph").StateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>>;
    generateFollowup: Partial<import("@langchain/langgraph").StateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>>;
    cleanState: {
        highlightedCode: undefined;
        highlightedText: undefined;
        next: undefined;
        language: undefined;
        artifactLength: undefined;
        regenerateWithEmojis: undefined;
        readingLevel: undefined;
        addComments: undefined;
        addLogs: undefined;
        fixBugs: undefined;
        portLanguage: undefined;
        customQuickActionId: undefined;
        webSearchEnabled: undefined;
        webSearchResults: undefined;
    };
    reflect: {};
    generateTitle: {};
    summarizer: {};
    routePostWebSearch: import("@langchain/langgraph").UpdateType<{
        _messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("./state.js").Messages>;
        highlightedCode: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").CodeHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").CodeHighlight | undefined, import("@opencanvas/shared/types").CodeHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        highlightedText: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").TextHighlight | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").TextHighlight | undefined, import("@opencanvas/shared/types").TextHighlight | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifact: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactV3>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactV3, import("@opencanvas/shared/types").ArtifactV3>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        next: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        language: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").LanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").LanguageOptions | undefined, import("@opencanvas/shared/types").LanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        artifactLength: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ArtifactLengthOptions | undefined, import("@opencanvas/shared/types").ArtifactLengthOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        regenerateWithEmojis: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        readingLevel: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ReadingLevelOptions | undefined, import("@opencanvas/shared/types").ReadingLevelOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addComments: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        addLogs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        portLanguage: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined, import("@opencanvas/shared/types").ProgrammingLanguageOptions | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        fixBugs: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        customQuickActionId: {
            (): import("@langchain/langgraph").LastValue<string | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<string | undefined, string | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<string | undefined, string | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchEnabled: {
            (): import("@langchain/langgraph").LastValue<boolean | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<boolean | undefined, boolean | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<boolean | undefined, boolean | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        webSearchResults: {
            (): import("@langchain/langgraph").LastValue<import("@opencanvas/shared/types").SearchResult[] | undefined>;
            (annotation: import("@langchain/langgraph").SingleReducer<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>): import("@langchain/langgraph").BinaryOperatorAggregate<import("@opencanvas/shared/types").SearchResult[] | undefined, import("@opencanvas/shared/types").SearchResult[] | undefined>;
            Root: <S extends import("@langchain/langgraph").StateDefinition>(sd: S) => import("@langchain/langgraph").AnnotationRoot<S>;
        };
        messages: import("@langchain/langgraph").BinaryOperatorAggregate<import("@langchain/core/messages", { with: { "resolution-mode": "import" } }).BaseMessage[], import("@langchain/langgraph").Messages>;
    }>;
}>;
