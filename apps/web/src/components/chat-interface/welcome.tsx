import { ProgrammingLanguageOptions } from "@opencanvas/shared/types";
import { ThreadPrimitive, useThreadRuntime } from "@assistant-ui/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC, useMemo } from "react";
import { TighterText } from "../ui/header";
import { ProgrammingLanguagesDropdown } from "../ui/programming-lang-dropdown";
import { Button } from "../ui/button";

const _QUICK_START_PROMPTS_SEARCH = [
  "Write a market analysis of AI chip manufacturers in 2025",
  "Create a blog post about the latest climate change policies and their impact",
  "Draft an investor update on renewable energy trends this quarter",
  "Write a report on current cybersecurity threats in cloud computing",
  "Analyze the latest developments in quantum computing for a tech newsletter",
  "Create a summary of emerging medical breakthroughs in cancer treatment",
  "Write about the impact of current interest rates on the housing market",
  "Draft an article about breakthroughs in battery technology this year",
  "Analyze current supply chain disruptions in semiconductor manufacturing",
  "Write about how recent AI regulations affect business innovation",
];

const _QUICK_START_PROMPTS = [
  "Write a bedtime story about a brave little robot",
  "Create a function to calculate Fibonacci numbers in TypeScript",
  "Draft a resignation letter for a position I've had for 2 years",
  "Build a simple weather dashboard using React and Tailwind",
  "Write a poem about artificial intelligence",
  "Create a basic Express.js REST API with two endpoints",
  "Draft a congratulatory speech for my sister's graduation",
  "Build a command-line calculator in Python",
  "Write instructions for making perfect scrambled eggs",
  "Create a simple snake game using HTML canvas",
  "Write me a TODO app in React",
  "Explain why the sky is blue in a short essay",
  "Help me draft an email to my professor Craig",
  "Write a web scraping program in Python",
];

function _getRandomPrompts(prompts: string[], count: number = 4): string[] {
  return [...prompts].sort(() => Math.random() - 0.5).slice(0, count);
}

interface QuickStartButtonsProps {
  handleQuickStart: (
    type: "text" | "code",
    language?: ProgrammingLanguageOptions
  ) => void;
  composer: React.ReactNode;
  searchEnabled: boolean;
}

interface QuickStartPromptsProps {
  searchEnabled: boolean;
}

const QuickStartPrompts = ({ searchEnabled: _searchEnabled }: QuickStartPromptsProps) => {
  const _threadRuntime = useThreadRuntime();

  const handleClick = (_text: string, index: number) => {
    // 1번(index 0)과 3번(index 2) 버튼은 Service_Key 링크로 이동
    if (index === 0 || index === 2) {
      window.open("http://exacode-chat.lge.com/Service_Key", "_blank");
      return;
    }
    
    // 2번(index 1)과 4번(index 3) 버튼은 Issue Report 링크로 이동
    if (index === 1 || index === 3) {
      window.open("http://collab.lge.com/main/display/EXACODE/How+To+Report+Issuess", "_blank");
      return;
    }
  };

  const selectedPrompts = useMemo(
    () => [
      "VSCode 플러그인으로 제공되는\nEXACODE Agent 서비스를 사용해 보세요.",
      "문의 사항이나 요청사항이 있으시다면\nEXACODE JIRA를 통해 연락 부탁드립니다.",
      "Try EXACODE Agent in VSCode",
      "If you have any questions or requests, please contact us via Jira."
    ],
    []
  );

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {selectedPrompts.map((prompt, index) => (
          <Button
            key={`quick-start-prompt-${index}`}
            onClick={() => handleClick(prompt, index)}
            variant="outline"
            className="min-h-[60px] w-full flex items-center justify-center p-6 whitespace-normal text-gray-500 hover:text-gray-700 transition-colors ease-in rounded-2xl"
          >
            <p className="text-center break-words text-sm font-normal whitespace-pre-line">
              {prompt}
            </p>
          </Button>
        ))}
      </div>
    </div>
  );
};

const QuickStartButtons = (props: QuickStartButtonsProps) => {
  const handleLanguageSubmit = (language: ProgrammingLanguageOptions) => {
    props.handleQuickStart("code", language);
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full">
      <div className="flex flex-col gap-6">
        <p className="text-gray-600 text-sm">Start with a blank canvas</p>
        <div className="flex flex-row gap-1 items-center justify-center w-full">
          <ProgrammingLanguagesDropdown handleSubmit={handleLanguageSubmit} />
        </div>
      </div>
      <div className="flex flex-col gap-6 mt-2 w-full">
        <p className="text-gray-600 text-sm">or with a message</p>
        {props.composer}
        <QuickStartPrompts searchEnabled={props.searchEnabled} />
      </div>
    </div>
  );
};

interface ThreadWelcomeProps {
  handleQuickStart: (
    type: "text" | "code",
    language?: ProgrammingLanguageOptions
  ) => void;
  composer: React.ReactNode;
  searchEnabled: boolean;
}

export const ThreadWelcome: FC<ThreadWelcomeProps> = (
  props: ThreadWelcomeProps
) => {
  return (
    <ThreadPrimitive.Empty>
      <div className="flex items-center justify-center mt-16 w-full">
        <div className="text-center max-w-3xl w-full">
          <Avatar className="mx-auto w-20 h-20">
            <AvatarImage src="/EXACODE_Canvas.png" alt="EXACODE Canvas Logo" />
            <AvatarFallback>
              <img
                src="/EXACODE_Canvas.png"
                alt="EXACODE Canvas Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </AvatarFallback>
          </Avatar>
          <TighterText className="mt-4 text-lg font-medium text-blue-900">
            Let&apos;s code together with EXACODE!
          </TighterText>
          <div className="mt-8 w-full">
            <QuickStartButtons
              composer={props.composer}
              handleQuickStart={props.handleQuickStart}
              searchEnabled={props.searchEnabled}
            />
          </div>
        </div>
      </div>
    </ThreadPrimitive.Empty>
  );
};
