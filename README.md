# ExaCode Canvas

ExaCode Canvas는 AI 에이전트와 협업하여 문서를 작성하고 편집할 수 있는 오픈소스 웹 애플리케이션입니다. OpenAI의 "Canvas"에서 영감을 받았지만, 몇 가지 주요한 차이점이 있습니다.

1. **오픈소스**: 프론트엔드부터 콘텐츠 생성 에이전트, 반성 에이전트까지 모든 코드가 오픈소스이며 MIT 라이선스입니다.
2. **내장 메모리**: ExaCode Canvas는 반성 에이전트와 함께 제공되며, 스타일 규칙과 사용자 인사이트를 공유 메모리 저장소에 저장합니다. 이를 통해 세션을 넘나들며 사용자에 대한 정보를 기억할 수 있습니다.
3. **기존 문서에서 시작**: 빈 텍스트나 원하는 언어의 코드 에디터에서 시작할 수 있어, 채팅 상호작용으로 강제 시작하는 대신 기존 콘텐츠로 시작할 수 있습니다.

## 주요 기능

- **메모리**: 자동으로 사용자와 채팅 기록에 대한 반성과 기억을 생성하는 내장 메모리 시스템. 이후 채팅 상호작용에서 이를 포함하여 더 개인화된 경험을 제공합니다.
- **사용자 정의 빠른 작업**: 사용자에게 연결되고 세션 간에 지속되는 자체 프롬프트를 정의할 수 있습니다. 한 번의 클릭으로 쉽게 호출하여 현재 보고 있는 아티팩트에 적용할 수 있습니다.
- **사전 구축 빠른 작업**: 일반적인 글쓰기 및 코딩 작업을 위한 사전 구축된 빠른 작업 시리즈가 항상 사용 가능합니다.
- **아티팩트 버전 관리**: 모든 아티팩트에 "버전"이 연결되어 있어 시간을 되돌려 아티팩트의 이전 버전을 볼 수 있습니다.
- **코드, 마크다운, 또는 둘 다**: 아티팩트 보기에서 코드와 마크다운 모두 보고 편집할 수 있습니다.
- **실시간 마크다운 렌더링 및 편집**: 편집하는 동안 렌더링된 마크다운을 볼 수 있어 전환할 필요가 없습니다.

## 로컬 설정

이 가이드는 ExaCode Canvas를 로컬에서 설정하고 실행하는 방법을 다룹니다.

### 사전 요구사항

ExaCode Canvas는 다음 API 키와 외부 서비스가 필요합니다:

#### 패키지 매니저

- [Yarn](https://yarnpkg.com/)

#### API 키들

- [OpenAI API 키](https://platform.openai.com/signup/)
- [Anthropic API 키](https://console.anthropic.com/)
- (선택사항) [Google GenAI API 키](https://aistudio.google.com/apikey)
- (선택사항) [Fireworks AI API 키](https://fireworks.ai/login)
- (선택사항) [Groq AI API 키](https://groq.com) - 오디오/비디오 전사
- (선택사항) [FireCrawl API 키](https://firecrawl.dev) - 웹 스크래핑
- (선택사항) [ExaSearch API 키](https://exa.ai) - 웹 검색

#### 인증

- 인증을 위한 [Supabase](https://supabase.com/) 계정

#### LangGraph 서버

- 그래프를 로컬에서 실행하기 위한 [LangGraph CLI](https://langchain-ai.github.io/langgraph/cloud/reference/cli/)

#### LangSmith

- 추적 및 관찰성을 위한 [LangSmith](https://smith.langchain.com/)

### 설치

먼저 리포지토리를 클론합니다:

```bash
git clone https://github.com/langchain-ai/open-canvas.git
cd open-canvas
```

다음으로 의존성을 설치합니다:

```bash
yarn install
```

의존성 설치 후, 프로젝트 루트와 `apps/web`에 있는 `.env.example` 파일들을 `.env`로 복사하고 필수 값들을 설정합니다:

```bash
# 루트 .env 파일은 에이전트를 위한 LangGraph 서버에서 읽힙니다.
cp .env.example .env
```

```bash
# apps/web/.env 파일은 프론트엔드에서 읽힙니다.
cd apps/web/
cp .env.example .env
```

그런 다음 Supabase로 인증을 설정합니다.

### 인증 설정

Supabase 계정을 생성한 후, [대시보드](https://supabase.com/dashboard/projects)를 방문하여 새 프로젝트를 만듭니다.

다음으로, 프로젝트 내의 `Project Settings` 페이지로 이동한 후 `API` 탭으로 이동합니다. `Project URL`과 `anon public` 프로젝트 API 키를 복사합니다. 이를 `apps/web/.env` 파일의 `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_ANON_KEY` 환경변수에 붙여넣습니다.

이후 `Authentication` 페이지와 `Providers` 탭으로 이동합니다. `Email`이 활성화되어 있는지 확인합니다 (`Confirm Email`도 활성화했는지 확인). 원한다면 `GitHub` 및/또는 `Google`도 인증에 사용할 수 있습니다.

#### 인증 테스트

인증이 작동하는지 확인하려면 `yarn dev`를 실행하고 [localhost:3000](http://localhost:3000)을 방문합니다. 이는 [로그인 페이지](http://localhost:3000/auth/login)로 리다이렉트되어야 합니다. 여기서 Google이나 GitHub로 로그인하거나, 이러한 제공자를 구성하지 않았다면 [가입 페이지](http://localhost:3000/auth/signup)로 이동하여 이메일과 비밀번호로 새 계정을 만들 수 있습니다.

### LangGraph 서버 설정

ExaCode Canvas를 로컬에서 실행하는 첫 번째 단계는 애플리케이션을 빌드하는 것입니다. 이는 ExaCode Canvas가 모노레포 설정을 사용하며, 다른 패키지/앱이 액세스할 수 있도록 워크스페이스 의존성을 빌드해야 하기 때문입니다.

리포지토리 루트에서 다음 명령을 실행합니다:

```bash
yarn build
```

이제 LangGraph 서버를 로컬에서 설정하고 실행하는 방법을 다루겠습니다.

`apps/agents`로 이동하여 `yarn dev`를 실행합니다 (`npx @langchain/langgraph-cli dev --port 54367` 실행):

```
Ready!
- API: http://localhost:54367
- Studio UI: https://smith.langchain.com/studio?baseUrl=http://localhost:54367
```

LangGraph 서버가 실행된 후, `apps/web` 내에서 다음 명령을 실행하여 ExaCode Canvas 프론트엔드를 시작합니다:

```bash
yarn dev
```

초기 로드 시 컴파일에 약간의 시간이 걸릴 수 있습니다.

그런 다음 브라우저에서 [localhost:3000](http://localhost:3000)을 열고 상호작용을 시작하세요!

## LLM 모델

ExaCode Canvas는 모든 LLM 모델과 호환되도록 설계되었습니다. 현재 배포에는 다음 모델들이 구성되어 있습니다:

- **Anthropic Claude 3 Haiku**: Anthropic의 가장 빠른 모델로, 문서 편집 같은 빠른 작업에 적합합니다.
- **Fireworks Llama 3 70B**: Meta의 SOTA 오픈소스 모델로, Fireworks AI에서 제공됩니다.
- **OpenAI GPT 4o Mini**: OpenAI의 최신, 가장 작은 모델입니다.

새 모델을 추가하고 싶다면 다음 간단한 단계를 따르세요:

1. `packages/shared/src/models.ts`에서 모델 제공자 변수를 추가하거나 업데이트합니다.
2. `apps/agents` 내에 제공자를 위한 필요한 패키지를 설치합니다 (예: `@langchain/anthropic`).
3. `apps/agents/src/agent/utils.ts`의 `getModelConfig` 함수를 업데이트하여 새 모델 이름과 제공자를 위한 `if` 문을 포함합니다.
4. 다음을 확인할 수 있는지 수동으로 테스트합니다:
   > - 4a. 새 아티팩트 생성
   > - 4b. 후속 메시지 생성 (아티팩트 생성 후 자동으로 발생)
   > - 4c. 채팅의 메시지를 통한 아티팩트 업데이트
   > - 4d. 빠른 작업을 통한 아티팩트 업데이트
   > - 4e. 텍스트/코드에 대해 반복 (둘 다 작동하는지 확인)

### 로컬 Ollama 모델

ExaCode Canvas는 Ollama에서 실행되는 로컬 LLM 호출을 지원합니다. 이는 호스팅된 버전의 ExaCode Canvas에서는 활성화되지 않지만, 자체 로컬/배포된 ExaCode Canvas 인스턴스에서 사용할 수 있습니다.

로컬 Ollama 모델을 사용하려면, 먼저 [Ollama](https://ollama.com)가 설치되어 있고 도구 호출을 지원하는 모델이 풀되어 있는지 확인합니다 (기본 모델은 `llama3.3`입니다).

다음으로 `ollama run llama3.3`을 실행하여 Ollama 서버를 시작합니다.

그런 다음 `NEXT_PUBLIC_OLLAMA_ENABLED` 환경변수를 `true`로 설정하고, `OLLAMA_API_URL` 환경변수를 Ollama 서버의 URL로 설정합니다 (기본값은 `http://host.docker.internal:11434`).

## SSO 및 LDAP 연동 (ExaCode Canvas 전용)

ExaCode Canvas는 LG전자 내부 시스템과의 연동을 지원합니다:

### SSO 연동
- **서버**: sso.lge.com
- **쿠키**: ssoId
- **테스트 계정**: exacode@lge.com

### LDAP 연동
- **서버**: lgesaads01.lge.net:636
- **프로토콜**: LDAPS
- **기준 DN**: OU=LGE Users,dc=LGE,dc=NET

### 연동 테스트
로그인 페이지의 개발자 도구에서 "SSO 연동 확인" 및 "LDAP 연동 확인" 버튼을 사용하여 연동 상태를 확인할 수 있습니다.

## 서버 이전

다른 서버로 이전하려면 `docs/` 폴더의 배포 스크립트를 사용하세요:

```bash
# 새 서버로 배포
./docs/scripts/deploy.sh <새_IP_주소> [새_도메인]

# 연동 테스트
./docs/scripts/quick-test.sh
```

자세한 내용은 `docs/deployment-plan.md`와 `docs/scripts/README.md`를 참조하세요.

## 문제 해결

ExaCode Canvas를 직접 실행할 때 발생할 수 있는 일반적인 문제들:

- **LangGraph 서버가 성공적으로 실행되고 클라이언트가 요청할 수 있지만 텍스트가 생성되지 않음**: 동일한 브라우저에서 여러 다른 LangGraph 서버를 시작하고 연결한 경우 발생할 수 있습니다. `oc_thread_id_v2` 쿠키를 삭제하고 페이지를 새로고침해 보세요.

- **클라이언트에서 요청을 시도할 때 500 네트워크 오류가 발생함**: LangGraph 서버가 실행 중인지 확인하고 올바른 포트로 요청하고 있는지 확인하세요.

- **클라이언트에서 요청을 시도할 때 "thread ID not found" 오류 토스트가 발생함**: LangGraph 서버가 실행 중인지 확인하고 올바른 포트로 요청하고 있는지 확인하세요.

- **요청할 때 "Model name is missing in config." 오류가 발생함**: 이 오류는 구성에서 `customModelName`이 지정되지 않았을 때 발생합니다.