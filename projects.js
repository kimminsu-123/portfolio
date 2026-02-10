// Distoria 프로젝트 데이터 (2025.03.01~2025.11.10)
const distoriaContent = {
    meta: {
        title: "Distoria",
        subtitle: "차원을 넘나드는 FPS 로그라이크 - 중세시대를 장악한 피안화 세력과의 전투",
        period: "2025.03.01 - 2025.11.10",
        platform: "PC",
        team: "16명",
        role: "Unity Client Developer / 리드 프로그래머 / TD"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🎮</span>
                게임 플레이 영상
            </h3>
            <div class="media-gallery">
                <div class="media-item" style="width:100%;">
                    <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                        <iframe 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 2px solid var(--accent-primary); border-radius: 12px;"
                            src="https://www.youtube.com/embed/Rod2KIllyt4" 
                            title="Distoria 게임플레이" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">📖</span>
                프로젝트 개요
            </h3>
            <div class="overview-content">
                <p style="line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;">
                    세계를 장악하려는 제노스와 그에 맞서는 단체 이클립타이드. 
                    이그니스라 불리는 능력자들은 차원을 넘나들 수 있는 힘을 가지고 있다.
                </p>
                <p style="line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;">
                    주인공의 부모는 핵심 이그니스로 활약했지만, 제노스가 미래·현재·과거를 동시에 침범하면서 전투 끝에 목숨을 잃는다.
                    분노한 주인공은 능력이 발현되고, 부모의 복수와 세계 평화를 위해 중세시대를 장악한 '피안화' 세력을 물리치기 위해 과거로 향한다.
                </p>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무 및 기여
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">프로젝트 세팅 및 팀 리딩</div>
                    <div class="responsibility-description">
                        초기 프로젝트 구조 설계, 프로그래머 코드 리뷰 및 구조 컨펌, 빌드 작업, 유니티 및 Git 매뉴얼 제작
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">무기 시스템 개발</div>
                    <div class="responsibility-description">
                        총알, 탄창, 총기, 총알 특수능력을 포함한 FPS 무기 시스템 전체 구현. 
                        발사, 재장전, 플레이어 액션 등 전투 메커니즘 개발
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">그래픽스 및 물리 최적화</div>
                    <div class="responsibility-description">
                        Render Feature를 활용한 무기 렌더링 최적화, JobSystem과 UniTask로 물리 연산 비동기 처리하여 60FPS 안정화 달성
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">게임 시스템 개발</div>
                    <div class="responsibility-description">
                        데이터 테이블 시스템, 아이템 시스템, 상점 시스템, 퀘스트 시스템, 버프 시스템, FloatingUI 개발. 
                        LivingEntity와 HurtBox 시스템으로 피격 처리 구현
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">개발 툴 및 서버</div>
                    <div class="responsibility-description">
                        커스텀 에디터를 활용한 레벨 디자인 툴 개발, 파일 로깅 시스템 구축, 
                        졸업작품 시연용 랭킹 서버 개발 (C# Winform)
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">⭐</span>
                주요 기능
            </h3>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">🔫</div>
                    <div class="feature-title">다양한 무기 시스템</div>
                    <div class="feature-description">총알 특수능력과 탄창 시스템이 결합된 FPS 전투</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🎲</div>
                    <div class="feature-title">로그라이크 요소</div>
                    <div class="feature-description">랜덤 아이템과 버프로 매 플레이마다 다른 경험</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">📜</div>
                    <div class="feature-title">퀘스트 시스템</div>
                    <div class="feature-description">스토리 진행과 연계된 퀘스트</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🏆</div>
                    <div class="feature-title">랭킹 시스템</div>
                    <div class="feature-description">실시간 업데이트되는 점수 랭킹</div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">Unity</span>
                <span class="tech-item">C#</span>
                <span class="tech-item">GitHub</span>
                <span class="tech-item">Cinemachine</span>
                <span class="tech-item">Timeline</span>
                <span class="tech-item">DOTween</span>
                <span class="tech-item">UniRx</span>
                <span class="tech-item">UniTask</span>
                <span class="tech-item">Job System</span>
                <span class="tech-item">FMOD</span>
                <span class="tech-item">C# Winform (서버)</span>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">💡</span>
                기술적 도전과 해결
            </h3>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>FPS에서 총기가 배경에 가려지는 문제를 어떻게 해결했나요?</span>
                </div>
                <div class="challenge-answer">
                    초기에는 Camera Stacking으로 해결했지만 Draw Call이 2배가 되는 문제가 발생했습니다. 
                    이후 URP의 Render Feature를 활용하여 무기와 플레이어를 항상 가장 나중에 렌더링하도록 변경, 
                    성능 저하 없이 가려짐 문제를 해결했습니다.
                </div>
            </div>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>근접 사격 시 총구가 몬스터를 뚫고 지나가 명중하지 않는 문제는 어떻게 해결했나요?</span>
                </div>
                <div class="challenge-answer">
                    오버워치의 3인칭 시스템을 참고했습니다. 
                    플레이어와 적의 거리가 일정 이하일 때는 총구 기준이 아닌 카메라 기준으로 Raycast를 발사하여 
                    즉시 명중 판정을 처리하도록 구현했습니다.
                </div>
            </div>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>60FPS 유지를 위해 어떤 최적화를 진행했나요?</span>
                </div>
                <div class="challenge-answer">
                    많은 물리 연산으로 인한 프레임 드랍이 심각했습니다. 
                    Unity의 기본 Physics 대신 DOTS의 JobSystem과 UniTask를 활용해 물리 연산을 비동기로 처리하여 
                    메인 스레드 부하를 줄였고, 결과적으로 안정적인 60FPS를 달성했습니다.
                </div>
            </div>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>레벨 디자이너의 작업 시간을 어떻게 단축시켰나요?</span>
                </div>
                <div class="challenge-answer">
                    몬스터를 하나하나 배치하고 설정하는 데 시간이 오래 걸린다는 피드백을 받았습니다. 
                    Custom Inspector를 활용한 Spawner 툴을 개발하여 클릭 한 번으로 몬스터 배치와 이벤트 연결이 가능하게 만들었고, 
                    Wave 방식 및 영역 진입 트리거를 자동으로 설정할 수 있게 했습니다.
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔗</span>
                링크
            </h3>
            <div class="modal-links">
                <a href="https://spiny-curve-75f.notion.site/Distoria-246135ce59d38098ba7bde231c3337e3?source=copy_link" class="modal-btn modal-btn-primary" target="_blank" onclick="event.stopPropagation();">
                    📄 Notion 상세 페이지
                    <span>→</span>
                </a>
                <a href="https://youtu.be/Rod2KIllyt4" class="modal-btn modal-btn-secondary" target="_blank" onclick="event.stopPropagation();">
                    🎬 YouTube 플레이 영상
                    <span>→</span>
                </a>
                <a href="Distoria Source Codes.zip" class="modal-btn modal-btn-code" target="_blank" onclick="event.stopPropagation();">
                    💾 소스 코드 다운로드
                    <span>→</span>
                </a>
            </div>
        </div>
    `
};

// 디더깅 프로젝트 데이터 (2024.09.01~2024.12.06)
const didduckingContent = {
    meta: {
        title: "디더깅",
        subtitle: "패링과 무공으로 납치된 부모님을 구출하는 2D 액션 게임",
        period: "2024.09.01 - 2024.12.06",
        platform: "PC",
        team: "11명",
        role: "Unity Client Developer / 리드 프로그래머 / TD"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🎮</span>
                게임 플레이 영상
            </h3>
            <div class="media-gallery">
                <div class="media-item" style="width:100%;">
                    <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                        <iframe 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 2px solid var(--accent-primary); border-radius: 12px;"
                            src="https://www.youtube.com/embed/UQihDznK2fs" 
                            title="디더깅 게임플레이" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">📖</span>
                프로젝트 개요
            </h3>
            <div class="overview-content">
                <p style="line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;">
                    거대한 농장으로 막대한 부를 얻은 주인공 가족. 
                    챔피언십 만화를 보며 챔피언의 꿈을 키우던 주인공 '더깅'.
                </p>
                <p style="line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;">
                    보석에 집착하던 까마귀가 농장의 허수아비를 조종하여 부모님을 납치하는 사건이 발생한다.
                    주인공 더깅은 그동안 갈고 닦았던 패링 실력과 무공으로 부모님을 되찾기 위해 모험을 떠난다.
                </p>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무 및 기여
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">핵심 시스템 설계 및 구현</div>
                    <div class="responsibility-description">
                        FSM 모듈 코드 설계 및 구현, Scriptable Object 기반 Object Pool 시스템 개발, 
                        다중 씬 관리 시스템, 모듈형 Utilities 코드 개발
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">전투 시스템 개발</div>
                    <div class="responsibility-description">
                        패링과 그로기 시스템 구현. 타이밍 기반의 정교한 전투 메커니즘으로 
                        플레이어가 적의 공격을 패링하고 반격할 수 있는 시스템 개발
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">캐릭터 개발</div>
                    <div class="responsibility-description">
                        플레이어, 일반 몬스터, 보스 몬스터의 전투 로직과 애니메이션 시스템 구현
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">개발 툴 제작</div>
                    <div class="responsibility-description">
                        Custom Editor를 활용한 애니메이션 이벤트 연결 툴 개발. 
                        기획자와 아트 디자이너가 코드 수정 없이 공격 타이밍과 사운드를 조절할 수 있도록 지원
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">팀 교육 및 문서화</div>
                    <div class="responsibility-description">
                        Unity와 Git을 처음 접하는 팀원들을 위해 직접 매뉴얼을 제작하고 교육. 
                        모든 팀원이 원활하게 협업할 수 있도록 지속적인 지원 제공
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">⭐</span>
                주요 기능
            </h3>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">⚔️</div>
                    <div class="feature-title">패링 시스템</div>
                    <div class="feature-description">타이밍 기반의 정교한 패링으로 적의 공격을 무력화</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">💫</div>
                    <div class="feature-title">그로기 시스템</div>
                    <div class="feature-description">적을 제압하고 강력한 반격 기회 획득</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🎬</div>
                    <div class="feature-title">Timeline 연출</div>
                    <div class="feature-description">몰입감 있는 컷씬과 보스전 연출</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🎨</div>
                    <div class="feature-title">Spine 애니메이션</div>
                    <div class="feature-description">부드럽고 생동감 있는 2D 애니메이션</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🏃</div>
                    <div class="feature-title">액션 중심 전투</div>
                    <div class="feature-description">무공을 활용한 다양한 액션 조합</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">👹</div>
                    <div class="feature-title">다양한 적</div>
                    <div class="feature-description">일반 몬스터부터 강력한 보스까지</div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">Unity</span>
                <span class="tech-item">C#</span>
                <span class="tech-item">Github</span>
                <span class="tech-item">Tilemap</span>
                <span class="tech-item">Cinemachine</span>
                <span class="tech-item">Timeline</span>
                <span class="tech-item">Spine URP</span>
                <span class="tech-item">DOTween</span>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">💡</span>
                기술적 도전과 해결
            </h3>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>Spine 애니메이션에 이벤트를 연결하는 문제를 어떻게 해결했나요?</span>
                </div>
                <div class="challenge-answer">
                    아트 디자이너가 Spine Event를 직접 심는 방법을 몰라서 발생한 문제였습니다. 
                    Custom Inspector를 활용해 애니메이션의 Normalized 시간과 이벤트를 연결할 수 있는 에디터 툴을 제작했습니다. 
                    사운드 변경과 애니메이션 Preview 기능도 추가하여 기획자도 쉽게 조절할 수 있게 만들었습니다.
                </div>
            </div>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>Unity와 Git 경험이 없는 팀원들과 어떻게 협업했나요?</span>
                </div>
                <div class="challenge-answer">
                    Unity와 Git 사용 매뉴얼을 직접 제작하여 제공하고, 궁금한 점은 즉시 답변할 수 있는 체계를 만들었습니다. 
                    덕분에 모든 팀원이 빠르게 학습하여 일정에 차질 없이 개발을 진행할 수 있었습니다.
                </div>
            </div>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>Object Pool을 Scriptable Object로 구현한 이유는?</span>
                </div>
                <div class="challenge-answer">
                    Scriptable Object를 활용하면 Pool 설정을 데이터로 관리할 수 있고, 
                    인스펙터에서 직관적으로 설정을 변경할 수 있어 유지보수가 편리합니다. 
                    또한 런타임에 동적으로 Pool 크기를 조절할 수 있는 유연성도 확보했습니다.
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔗</span>
                링크 및 다운로드
            </h3>
            <div class="modal-links">
                <a href="https://spiny-curve-75f.notion.site/246135ce59d38046a012d3f234151774?source=copy_link" class="modal-btn modal-btn-primary" target="_blank" onclick="event.stopPropagation();">
                    📄 Notion 페이지
                    <span>→</span>
                </a>
                <a href="https://www.youtube.com/watch?v=UQihDznK2fs" class="modal-btn modal-btn-secondary" target="_blank" onclick="event.stopPropagation();">
                    🎬 YouTube 플레이 영상
                    <span>→</span>
                </a>
                <a href="Deducking Source Codes.zip" class="modal-btn modal-btn-code" download onclick="event.stopPropagation();">
                    💾 소스 코드 다운로드
                    <span>→</span>
                </a>
            </div>
        </div>
    `
};

// 탈(TAL) 프로젝트 데이터 (2024.07.15~2024.07.19)
const talContent = {
    meta: {
        title: "탈(TAL)",
        subtitle: "도깨비 탈에 잠식당한 주인공의 공포 탈출기 - 5일 게임잼 작품",
        period: "2024.07.15 - 2024.07.19",
        platform: "PC",
        team: "4명",
        role: "Unity Client Developer / 리드 프로그래머"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🎮</span>
                게임 플레이 영상
            </h3>
            <div class="media-gallery">
                <div class="media-item" style="width:100%;">
                    <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                        <iframe 
                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 2px solid var(--accent-primary); border-radius: 12px;"
                            src="https://www.youtube.com/embed/RI5yqaG5vKE" 
                            title="탈(TAL) 게임플레이" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">📖</span>
                프로젝트 개요
            </h3>
            <div class="overview-content">
                <p style="line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;">
                    도깨비 불을 따라 들어간 집에서 주인공이 무심코 가면을 쓰게 되고, 
                    평소 보이지 않던 기이한 것들이 보이기 시작한다.
                </p>
                <p style="line-height: 1.8; color: var(--text-secondary); margin-bottom: 1rem;">
                    공포에 떨며 집안 곳곳을 탐색하던 주인공은 탈출 직전 탈에 완전히 잠식당하고, 
                    결국 새로운 도깨비불이 되어 또 다른 희생자를 찾아 나서게 된다.
                </p>
                <p style="line-height: 1.8; color: var(--text-muted); font-style: italic;">
                    ⏱️ 5일간의 게임잼에서 제작된 쯔꾸르풍 공포 게임
                </p>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무 및 기여
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">몬스터 AI 시스템 개발</div>
                    <div class="responsibility-description">
                        두억시니, 지네, 보스 지네 등 다양한 몬스터의 AI와 행동 패턴을 구현. 
                        2D 환경에 맞는 4방향 길찾기 알고리즘을 적용하여 쯔꾸르 특유의 느낌을 살림
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">아이템 & 인벤토리 시스템</div>
                    <div class="responsibility-description">
                        아이템 수집, 인벤토리 관리, 아이템 사용 등 플레이어의 생존에 필요한 
                        전체 아이템 시스템을 설계하고 구현
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">재사용 가능한 상호작용 시스템</div>
                    <div class="responsibility-description">
                        컴포넌트 기반의 모듈형 상호작용 시스템 개발. 
                        대화 + 아이템 + 이벤트를 자유롭게 조합하여 다양한 퍼즐과 상호작용을 
                        빠르게 구현할 수 있는 구조 설계
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">비동기 씬 이동 시스템</div>
                    <div class="responsibility-description">
                        부드러운 씬 전환을 위한 비동기 로딩 시스템 구현
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">⭐</span>
                주요 기능
            </h3>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">👻</div>
                    <div class="feature-title">공포 분위기</div>
                    <div class="feature-description">쯔꾸르풍 그래픽으로 표현한 섬뜩한 공포 연출</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🎭</div>
                    <div class="feature-title">탈 시스템</div>
                    <div class="feature-description">탈 착용 시 보이는 특별한 요소들</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🔍</div>
                    <div class="feature-title">탐험 & 퍼즐</div>
                    <div class="feature-description">집 곳곳을 탐험하며 탈출 방법 찾기</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🧩</div>
                    <div class="feature-title">모듈형 상호작용</div>
                    <div class="feature-description">컴포넌트 조합으로 다양한 퍼즐 구현</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🤖</div>
                    <div class="feature-title">몬스터 AI</div>
                    <div class="feature-description">4방향 길찾기 알고리즘 기반 AI</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🎒</div>
                    <div class="feature-title">인벤토리</div>
                    <div class="feature-description">아이템 수집 및 관리 시스템</div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">Unity</span>
                <span class="tech-item">C#</span>
                <span class="tech-item">Github</span>
                <span class="tech-item">Tilemap</span>
                <span class="tech-item">DOTween</span>
                <span class="tech-item">A* Pathfinding</span>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">💡</span>
                기술적 도전과 해결
            </h3>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>2D 환경에서 길찾기 알고리즘을 어떻게 구현했나요?</span>
                </div>
                <div class="challenge-answer">
                    NavMesh는 2D에서 사용할 수 없어, 짧은 게임잼 기간을 고려해 A* 알고리즘이 구현된 에셋을 활용했습니다. 
                    이후 코드를 수정하여 8방향이 아닌 4방향으로 변경해 쯔꾸르 특유의 느낌을 살렸습니다.
                </div>
            </div>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>다양한 상호작용 시스템을 짧은 기간에 어떻게 구현했나요?</span>
                </div>
                <div class="challenge-answer">
                    각각의 상호작용을 개별적으로 만드는 대신, 재사용 가능한 컴포넌트 기반 시스템을 설계했습니다. 
                    '열쇠가 필요한 문'을 '특정 아이템이 필요한 상호작용'으로 추상화하고, 
                    대화 + 아이템 + 이벤트를 자유롭게 조합할 수 있게 만들어 개발 시간을 크게 단축했습니다.
                </div>
            </div>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>게임잼 5일이라는 짧은 기간 동안 어떻게 완성했나요?</span>
                </div>
                <div class="challenge-answer">
                    모듈형 시스템 설계로 재사용성을 극대화하고, 
                    검증된 에셋을 활용하되 프로젝트에 맞게 커스터마이징하는 전략을 사용했습니다. 
                    또한 상호작용 컴포넌트를 조합하는 방식으로 기획자가 원하는 다양한 퍼즐을 
                    빠르게 구현할 수 있었습니다.
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔗</span>
                링크 및 다운로드
            </h3>
            <div class="modal-links">
                <a href="https://spiny-curve-75f.notion.site/d7ba6891b7a34e6181e21b91c929eaaf?source=copy_link" class="modal-btn modal-btn-primary" target="_blank" onclick="event.stopPropagation();">
                    📄 Notion 페이지
                    <span>→</span>
                </a>
                <a href="https://youtu.be/RI5yqaG5vKE" class="modal-btn modal-btn-secondary" target="_blank" onclick="event.stopPropagation();">
                    🎬 YouTube 플레이 영상
                    <span>→</span>
                </a>
                <a href="TAL Source Codes.zip" class="modal-btn modal-btn-code" download onclick="event.stopPropagation();">
                    💾 소스 코드 다운로드
                    <span>⬇</span>
                </a>
            </div>
        </div>
    `
};

// 회사 프로젝트 - IMTSOFT
const imtsoft_gwangmyeong_posContent = {
    meta: {
        title: "광명동굴 POS 시스템",
        subtitle: "(빈약!채움필수!)",
        period: "(빈약!채움필수!)",
        platform: "(빈약!채움필수!)",
        team: "(빈약!채움필수!)",
        role: "(빈약!채움필수!)"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🏢</span>
                회사 프로젝트
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.8;">
                IMTSOFT에서 진행한 광명동굴 POS 시스템 프로젝트입니다.<br>
                (빈약!채움필수!)
            </p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">(빈약!채움필수!)</div>
                    <div class="responsibility-description">
                        (빈약!채움필수!)
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">(빈약!채움필수!)</span>
            </div>
        </div>
    `
};

const imtsoft_subway_posContent = {
    meta: {
        title: "Subway POS 시스템",
        subtitle: "(빈약!채움필수!)",
        period: "(빈약!채움필수!)",
        platform: "(빈약!채움필수!)",
        team: "(빈약!채움필수!)",
        role: "(빈약!채움필수!)"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🏢</span>
                회사 프로젝트
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.8;">
                IMTSOFT에서 진행한 Subway POS 시스템 프로젝트입니다.<br>
                (빈약!채움필수!)
            </p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">(빈약!채움필수!)</div>
                    <div class="responsibility-description">
                        (빈약!채움필수!)
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">(빈약!채움필수!)</span>
            </div>
        </div>
    `
};

const imtsoft_callisco_posContent = {
    meta: {
        title: "캘리스코 POS 시스템",
        subtitle: "(빈약!채움필수!)",
        period: "(빈약!채움필수!)",
        platform: "(빈약!채움필수!)",
        team: "(빈약!채움필수!)",
        role: "(빈약!채움필수!)"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🏢</span>
                회사 프로젝트
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.8;">
                IMTSOFT에서 진행한 캘리스코 POS 시스템 프로젝트입니다.<br>
                (빈약!채움필수!)
            </p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">(빈약!채움필수!)</div>
                    <div class="responsibility-description">
                        (빈약!채움필수!)
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">(빈약!채움필수!)</span>
            </div>
        </div>
    `
};

const imtsoft_meal_systemContent = {
    meta: {
        title: "IMT 자체 급식 시스템",
        subtitle: "POS / KIOSK / DID / DIT / Server Computer",
        period: "(빈약!채움필수!)",
        platform: "(빈약!채움필수!)",
        team: "(빈약!채움필수!)",
        role: "(빈약!채움필수!)"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🏢</span>
                회사 프로젝트
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.8;">
                IMTSOFT에서 진행한 자체 급식 시스템 프로젝트입니다.<br>
                POS, KIOSK, DID, DIT, Server Computer를 포함한 통합 시스템<br>
                (빈약!채움필수!)
            </p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">(빈약!채움필수!)</div>
                    <div class="responsibility-description">
                        (빈약!채움필수!)
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">(빈약!채움필수!)</span>
            </div>
        </div>
    `
};

// 회사 프로젝트 - Tenacities
const tenacities_toanyContent = {
    meta: {
        title: "ToAny",
        subtitle: "(빈약!채움필수!)",
        period: "(빈약!채움필수!)",
        platform: "(빈약!채움필수!)",
        team: "(빈약!채움필수!)",
        role: "(빈약!채움필수!)"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🏢</span>
                회사 프로젝트
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.8;">
                Tenacities에서 진행한 ToAny 프로젝트입니다.<br>
                (빈약!채움필수!)
            </p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">(빈약!채움필수!)</div>
                    <div class="responsibility-description">
                        (빈약!채움필수!)
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">(빈약!채움필수!)</span>
            </div>
        </div>
    `
};

const tenacities_duettaeboContent = {
    meta: {
        title: "DuetTaebo",
        subtitle: "(빈약!채움필수!)",
        period: "(빈약!채움필수!)",
        platform: "(빈약!채움필수!)",
        team: "(빈약!채움필수!)",
        role: "(빈약!채움필수!)"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🏢</span>
                회사 프로젝트
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.8;">
                Tenacities에서 진행한 DuetTaebo 프로젝트입니다.<br>
                (빈약!채움필수!)
            </p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">(빈약!채움필수!)</div>
                    <div class="responsibility-description">
                        (빈약!채움필수!)
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">(빈약!채움필수!)</span>
            </div>
        </div>
    `
};

const tenacities_cryptobuddiesContent = {
    meta: {
        title: "Crypto Buddies",
        subtitle: "(빈약!채움필수!)",
        period: "(빈약!채움필수!)",
        platform: "(빈약!채움필수!)",
        team: "(빈약!채움필수!)",
        role: "(빈약!채움필수!)"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🏢</span>
                회사 프로젝트
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.8;">
                Tenacities에서 진행한 Crypto Buddies 프로젝트입니다.<br>
                (빈약!채움필수!)
            </p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">(빈약!채움필수!)</div>
                    <div class="responsibility-description">
                        (빈약!채움필수!)
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">(빈약!채움필수!)</span>
            </div>
        </div>
    `
};

const tenacities_19rouletteContent = {
    meta: {
        title: "19 Roulette",
        subtitle: "(빈약!채움필수!)",
        period: "(빈약!채움필수!)",
        platform: "(빈약!채움필수!)",
        team: "(빈약!채움필수!)",
        role: "(빈약!채움필수!)"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🏢</span>
                회사 프로젝트
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.8;">
                Tenacities에서 진행한 19 Roulette 프로젝트입니다.<br>
                (빈약!채움필수!)
            </p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">(빈약!채움필수!)</div>
                    <div class="responsibility-description">
                        (빈약!채움필수!)
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">(빈약!채움필수!)</span>
            </div>
        </div>
    `
};

// 프로젝트 1 데이터
const project1Content = {
    meta: {
        title: "멀티플레이어 액션 게임",
        subtitle: "Unity 기반 실시간 PvP 액션 게임으로 최적화와 네트워크 동기화에 집중한 프로젝트",
        period: "2024.01 - 2024.06",
        platform: "PC / Mobile",
        team: "4명 (기획 1, 클라이언트 2, 서버 1)",
        role: "Unity Client Developer"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🖼️</span>
                미디어
            </h3>
            <div class="media-gallery">
                <div class="media-item">
                    <div class="media-placeholder">
                        <div style="text-align:center;">
                            <div style="font-size:4rem;margin-bottom:1rem;">🖼️</div>
                            <div style="font-size:1rem;color:var(--text-secondary);">게임 스크린샷을 추가하세요</div>
                        </div>
                    </div>
                </div>
                <div class="media-item">
                    <div class="media-placeholder">
                        <div style="text-align:center;">
                            <div style="font-size:4rem;margin-bottom:1rem;">🎬</div>
                            <div style="font-size:1rem;color:var(--text-secondary);">게임플레이 영상을 추가하세요</div>
                        </div>
                    </div>
                </div>
            </div>
            <p style="margin-top:1rem;color:var(--text-muted);font-size:0.9rem;">
                💡 팁: 이미지는 &lt;img src="project1-screenshot.jpg"&gt; 형태로 추가하세요
            </p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무 및 기여
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">전투 시스템 구현</div>
                    <div class="responsibility-description">
                        캐릭터 스킬, 콤보 시스템, 히트박스 처리 등 핵심 전투 메커니즘을 구현했습니다. 
                        프레임 단위의 정확한 타이밍과 부드러운 애니메이션 전환을 위해 State Machine을 활용했습니다.
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">네트워크 동기화 최적화</div>
                    <div class="responsibility-description">
                        Photon을 사용한 멀티플레이어 구현에서 발생하는 지연과 동기화 문제를 해결했습니다. 
                        Client-side prediction과 Server reconciliation을 적용하여 네트워크 지연 환경에서도 부드러운 플레이 경험을 제공했습니다.
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">성능 최적화</div>
                    <div class="responsibility-description">
                        프로파일러를 활용한 병목 지점 파악 및 개선을 통해 모바일 환경에서 60fps 안정화를 달성했습니다. 
                        Object Pooling, LOD, Occlusion Culling 등의 기법을 적용했습니다.
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">⭐</span>
                주요 기능
            </h3>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">⚔️</div>
                    <div class="feature-title">실시간 PvP</div>
                    <div class="feature-description">최대 4명이 동시에 플레이하는 실시간 배틀 시스템</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🎮</div>
                    <div class="feature-title">다양한 스킬</div>
                    <div class="feature-description">캐릭터별 고유 스킬과 콤보 시스템</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🏆</div>
                    <div class="feature-title">랭킹 시스템</div>
                    <div class="feature-description">실시간 업데이트되는 글로벌 랭킹</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">📱</div>
                    <div class="feature-title">크로스 플랫폼</div>
                    <div class="feature-description">PC와 모바일 간 크로스 플레이 지원</div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">Unity 2022 LTS</span>
                <span class="tech-item">C#</span>
                <span class="tech-item">Photon PUN2</span>
                <span class="tech-item">DOTween</span>
                <span class="tech-item">Addressables</span>
                <span class="tech-item">Git</span>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">💡</span>
                기술적 도전과 해결
            </h3>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>네트워크 지연 환경에서 부드러운 게임플레이를 어떻게 구현했나요?</span>
                </div>
                <div class="challenge-answer">
                    Client-side prediction을 통해 플레이어의 입력을 즉시 반영하고, 서버로부터 권위있는 상태를 받으면 
                    reconciliation을 수행하는 방식으로 구현했습니다. 또한 interpolation을 통해 다른 플레이어의 움직임을 부드럽게 표현했습니다.
                </div>
            </div>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>모바일에서 60fps를 어떻게 달성했나요?</span>
                </div>
                <div class="challenge-answer">
                    Unity Profiler로 CPU와 GPU 병목 지점을 파악하고, Draw Call 감소를 위한 Batching, Object Pooling으로 GC 부하 감소, 
                    Shader 최적화, 그리고 불필요한 Physics 연산을 제거하는 등 다각도로 접근했습니다.
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔗</span>
                링크
            </h3>
            <div class="modal-links">
                <a href="#" class="modal-btn modal-btn-primary" target="_blank" onclick="event.stopPropagation();">
                    GitHub 저장소
                    <span>→</span>
                </a>
                <a href="#" class="modal-btn modal-btn-secondary" target="_blank" onclick="event.stopPropagation();">
                    플레이 영상
                    <span>→</span>
                </a>
                <a href="#" class="modal-btn modal-btn-secondary" target="_blank" onclick="event.stopPropagation();">
                    기술 블로그
                    <span>→</span>
                </a>
            </div>
        </div>
    `
};

// 프로젝트 2 데이터
const project2Content = {
    meta: {
        title: "오픈월드 RPG 게임",
        subtitle: "대규모 맵과 AI 시스템을 갖춘 싱글플레이어 RPG",
        period: "2023.06 - 2023.12",
        platform: "PC",
        team: "6명 (기획 2, 클라이언트 3, 아트 1)",
        role: "Client Developer (AI & Quest)"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🖼️</span>
                미디어
            </h3>
            <div class="media-gallery">
                <div class="media-item">
                    <div class="media-placeholder">
                        <div style="text-align:center;">
                            <div style="font-size:4rem;margin-bottom:1rem;">🗺️</div>
                            <div style="font-size:1rem;color:var(--text-secondary);">게임 스크린샷을 추가하세요</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무 및 기여
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">AI 시스템 구현</div>
                    <div class="responsibility-description">
                        Behavior Tree를 활용한 NPC AI 시스템을 구축했습니다. 
                        적 AI의 전투 패턴, 순찰, 추적 등의 행동을 모듈화하여 디자이너가 쉽게 조합할 수 있도록 했습니다.
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">퀘스트 시스템</div>
                    <div class="responsibility-description">
                        데이터 기반의 확장 가능한 퀘스트 시스템을 설계 및 구현했습니다. 
                        ScriptableObject를 활용하여 비프로그래머도 퀘스트를 생성할 수 있는 에디터 툴을 제작했습니다.
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">⭐</span>
                주요 기능
            </h3>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">🗺️</div>
                    <div class="feature-title">오픈월드</div>
                    <div class="feature-description">자유롭게 탐험 가능한 대규모 맵</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🤖</div>
                    <div class="feature-title">스마트 AI</div>
                    <div class="feature-description">Behavior Tree 기반 적응형 AI</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">📜</div>
                    <div class="feature-title">퀘스트</div>
                    <div class="feature-description">100개 이상의 메인/서브 퀘스트</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">⚡</div>
                    <div class="feature-title">실시간 전투</div>
                    <div class="feature-description">액션 기반 전투 시스템</div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">Unity 2021 LTS</span>
                <span class="tech-item">C#</span>
                <span class="tech-item">Behavior Designer</span>
                <span class="tech-item">Cinemachine</span>
                <span class="tech-item">TextMeshPro</span>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">💡</span>
                기술적 도전과 해결
            </h3>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>대규모 맵에서 성능을 어떻게 유지했나요?</span>
                </div>
                <div class="challenge-answer">
                    씬을 여러 구역으로 분할하고 Addressables를 활용한 비동기 로딩으로 메모리 사용량을 최적화했습니다. 
                    또한 Occlusion Culling과 LOD를 적극 활용했습니다.
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔗</span>
                링크
            </h3>
            <div class="modal-links">
                <a href="#" class="modal-btn modal-btn-primary" target="_blank" onclick="event.stopPropagation();">
                    GitHub 저장소
                    <span>→</span>
                </a>
                <a href="#" class="modal-btn modal-btn-secondary" target="_blank" onclick="event.stopPropagation();">
                    개발 일지
                    <span>→</span>
                </a>
            </div>
        </div>
    `
};

// 프로젝트 3 데이터
const project3Content = {
    meta: {
        title: "모바일 러너 게임",
        subtitle: "터치 기반의 캐주얼 러닝 게임",
        period: "2023.01 - 2023.05",
        platform: "Android / iOS",
        team: "3명 (기획 1, 개발 1, 아트 1)",
        role: "Solo Client Developer"
    },
    html: `
        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🖼️</span>
                미디어
            </h3>
            <div class="media-gallery">
                <div class="media-item">
                    <div class="media-placeholder">
                        <div style="text-align:center;">
                            <div style="font-size:4rem;margin-bottom:1rem;">🏃</div>
                            <div style="font-size:1rem;color:var(--text-secondary);">게임 스크린샷을 추가하세요</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">👨‍💻</span>
                담당 업무 및 기여
            </h3>
            <div class="responsibility-list">
                <div class="responsibility-item">
                    <div class="responsibility-title">전체 클라이언트 개발</div>
                    <div class="responsibility-description">
                        게임플레이 로직부터 UI, 이펙트, 최적화까지 클라이언트 전반을 혼자 담당했습니다.
                    </div>
                </div>
                <div class="responsibility-item">
                    <div class="responsibility-title">절차적 레벨 생성</div>
                    <div class="responsibility-description">
                        무한 러너 방식의 레벨을 절차적으로 생성하는 시스템을 구현했습니다. 
                        난이도 곡선을 고려한 장애물 배치 알고리즘을 설계했습니다.
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">⭐</span>
                주요 기능
            </h3>
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">🏃</div>
                    <div class="feature-title">무한 러너</div>
                    <div class="feature-description">끝없이 이어지는 절차적 레벨</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">💎</div>
                    <div class="feature-title">수집 요소</div>
                    <div class="feature-description">다양한 캐릭터와 스킨 해금</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🎯</div>
                    <div class="feature-title">일일 미션</div>
                    <div class="feature-description">매일 새로운 도전 과제</div>
                </div>
                <div class="feature-item">
                    <div class="feature-icon">🌟</div>
                    <div class="feature-title">파워업</div>
                    <div class="feature-description">게임을 더 재미있게 만드는 아이템</div>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔧</span>
                기술 스택
            </h3>
            <div class="tech-stack-list">
                <span class="tech-item">Unity 2020 LTS</span>
                <span class="tech-item">C#</span>
                <span class="tech-item">DOTween</span>
                <span class="tech-item">TextMeshPro</span>
                <span class="tech-item">Firebase</span>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">💡</span>
                기술적 도전과 해결
            </h3>
            <div class="challenge-item">
                <div class="challenge-question">
                    <span>Q.</span>
                    <span>무한 러너를 어떻게 구현했나요?</span>
                </div>
                <div class="challenge-answer">
                    Object Pooling을 활용하여 맵 타일과 장애물을 재사용하고, 플레이어가 일정 거리를 진행하면 
                    뒤의 타일을 앞으로 재배치하는 방식으로 구현했습니다.
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">
                <span class="section-icon">🔗</span>
                링크
            </h3>
            <div class="modal-links">
                <a href="#" class="modal-btn modal-btn-primary" target="_blank" onclick="event.stopPropagation();">
                    GitHub 저장소
                    <span>→</span>
                </a>
            </div>
        </div>
    `
};

// 프로젝트 데이터 맵 (기간 순서대로 내림차순)
const projectsData = {
    // 개인/팀 프로젝트
    distoria: distoriaContent,
    didducking: didduckingContent,
    tal: talContent,
    
    // 기존 예시 프로젝트들 (나중에 실제 프로젝트로 교체 예정)
    project1: project1Content,
    project2: project2Content,
    project3: project3Content,
    
    // 회사 프로젝트 - IMTSOFT
    imtsoft_gwangmyeong_pos: imtsoft_gwangmyeong_posContent,
    imtsoft_subway_pos: imtsoft_subway_posContent,
    imtsoft_callisco_pos: imtsoft_callisco_posContent,
    imtsoft_meal_system: imtsoft_meal_systemContent,
    
    // 회사 프로젝트 - Tenacities
    tenacities_toany: tenacities_toanyContent,
    tenacities_duettaebo: tenacities_duettaeboContent,
    tenacities_cryptobuddies: tenacities_cryptobuddiesContent,
    tenacities_19roulette: tenacities_19rouletteContent
};
