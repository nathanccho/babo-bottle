import { koData } from './ko-data.js';

// Translation is presentation-only: build IDs, selected values, SKUs, prices,
// uploaded files, and the user's own engraving never become translated state.
const ui = {
  'Skip to content':'본문으로 건너뛰기', 'babo bottle':'바보 보틀',
  'made for you':'당신을 위해', 'made by you':'당신의 손으로',
  'made for you. made by you.':'당신을 위해. 당신의 손으로.',
  'A KOREAN WATER BOTTLE BRAND':'한국에서 시작한 보틀 브랜드',
  'A modular bottle. Made for you.':'나에게 맞춰 바꾸는 모듈형 보틀.',
  'Add your brand':'나만의 브랜드 담기', 'Combinations':'컬러 조합',
  'Make your own':'나만의 보틀 만들기', 'Make it yours':'나답게 만들어 보세요',
  'How it works':'이렇게 만들어요', 'Our story':'바보 이야기',
  'Main navigation':'주요 메뉴', 'Babo home':'바보 홈',
  'Search the collection':'제품 검색', 'Your account':'내 계정',
  'Open shopping bag':'장바구니 열기', 'Open menu':'메뉴 열기', 'Close menu':'메뉴 닫기',
  'Swipe to explore':'옆으로 넘겨 살펴보세요', 'Why Babo':'바보의 매력',
  'Easy to clean':'구석구석 간편하게', 'Made to last':'오래 함께하도록',
  'Pick your parts':'마음에 드는 부품 고르기',
  'Pick your bottle parts':'보틀 부품 고르기',
  'Choose your lid, body, and base. Add extensions and extras.':'뚜껑, 바디, 베이스를 고르고 확장 모듈과 액세서리를 더해 보세요.',
  'Put it together':'차곡차곡 연결하기',
  'Screw the sections together. Swap a part whenever you want.':'각 섹션을 돌려 연결해 주세요. 바꾸고 싶을 때는 원하는 부품만 교체하면 돼요.',
  'Take it apart to clean':'분리해서 깨끗하게',
  'Unscrew each section to reach inside. Simple as that.':'섹션을 돌려 분리하면 안쪽까지 손쉽게 닿아요.',
  'Read how to clean your bottle':'보틀 세척 방법 보기',
  'Lids, bodies, bases, and attachments.':'뚜껑부터 바디, 베이스, 액세서리까지.',
  'View all parts':'모든 부품 보기', 'Filter bottle parts':'보틀 부품 필터',
  'All':'전체', 'Bottles':'보틀', 'Lids':'뚜껑', 'Bodies':'바디', 'Bases':'베이스',
  'Extensions':'확장 모듈', 'Attachments':'액세서리', 'Accessories':'액세서리',
  'See all':'모두 보기', 'Show less':'접기', 'Details':'자세히 보기',
  'Build it piece by piece':'하나씩 더해 완성해 보세요',
  'Start with a base. Add a body and lid.':'베이스부터 시작해 바디와 뚜껑을 더해 주세요.',
  'Then make each part yours.':'부품 하나하나를 나답게 바꿔 보세요.',
  'Your bottle':'나만의 보틀', 'Expand':'크게 보기', 'Compact':'작게 보기',
  'Start over':'처음부터 만들기', 'Interactive bottle preview':'직접 편집하는 보틀 미리보기',
  'Choose a base to begin.':'먼저 베이스를 골라 주세요.',
  'Main bottle parts':'보틀의 기본 부품', 'Review your bottle':'내 보틀 확인하기',
  'Add a base, body, and lid to review.':'베이스, 바디, 뚜껑을 더하면 구성을 확인할 수 있어요.',
  'Want to add your brand?':'내 브랜드도 담아 볼까요?', 'Preview your logo':'로고 미리보기',
  'Your brand':'나만의 브랜드', 'For teams, events, and everyday brands.':'팀, 행사, 그리고 일상의 브랜드를 위해.',
  'Engraving text':'각인할 문구', 'Upload a logo':'로고 올리기',
  'PNG, JPG or WebP. Up to 5 MB.':'PNG, JPG, WebP 파일 · 최대 5MB',
  'Deep engraving':'깊은 각인', 'Reset':'초기화',
  'Engraving concept preview':'각인 콘셉트 미리보기', 'Uploaded brand logo':'업로드한 브랜드 로고',
  'Your uploaded logo engraved on the bottle':'보틀에 각인된 업로드 로고 미리보기',
  'Engraving preview updated.':'각인 미리보기가 업데이트되었어요.',
  'Logo preview updated.':'로고 미리보기가 업데이트되었어요.',
  'Brand preview reset.':'브랜드 미리보기를 초기화했어요.',
  'Choose a PNG, JPG, or WebP image.':'PNG, JPG 또는 WebP 이미지를 골라 주세요.',
  'Choose an image under 5 MB.':'5MB 이하의 이미지를 골라 주세요.',
  'This image could not be opened. Choose another file.':'이미지를 열 수 없어요. 다른 파일을 골라 주세요.',
  'Explore':'둘러보기', 'Support':'도움말', 'Parts & attachments':'부품과 액세서리',
  'FAQs':'자주 묻는 질문', 'Part compatibility':'부품 호환 안내', 'Care guide':'관리 방법',
  'Shipping & returns':'배송 및 반품', 'Your saved builds':'저장한 보틀',
  'CONCEPT PREVIEW':'콘셉트 미리보기', 'Local preview.':'로컬 미리보기.',
  'Concept storefront · Demo pricing · Local preview':'콘셉트 스토어 · 데모 가격 · 로컬 미리보기',
  'Babo back to top':'바보 페이지 맨 위로', 'Back to top':'맨 위로',
  'Foolishly playful':'바보처럼, 즐겁게', 'HELP':'도움말', 'OUR STORY':'바보 이야기',
  'South Korea':'대한민국', 'Babo':'바보',
  'Foundation':'기본 용량', 'Lid':'뚜껑', 'Body':'바디', 'Base':'베이스',
  'Extras':'액세서리', 'Review':'구성 확인', 'Type':'종류', 'Size':'크기',
  'Color':'색상', 'Custom':'직접 선택', 'Current':'현재 색상', 'Short':'짧은', 'Long':'긴',
  'Standard':'기본형', 'Narrow':'슬림형', 'Storage':'수납형',
  'Build your bottle':'나만의 보틀 만들기', 'Build Your Babo':'나만의 바보 만들기',
  'Concept preview · Demo pricing':'콘셉트 미리보기 · 데모 가격',
  'Your bottle configuration':'내 보틀 구성', 'Configuration preview':'구성 미리보기',
  'Bottle building steps':'보틀 만들기 단계', 'Close dialog':'창 닫기',
  'Choose a size':'기본 용량 고르기', 'Choose a lid':'뚜껑 고르기',
  'Choose body sections':'바디 섹션 고르기', 'Choose a base':'베이스 고르기',
  'Add attachments':'액세서리 더하기',
  'Select a capacity, then stack up to 3 extension modules.':'기본 용량을 고른 뒤 확장 모듈을 최대 3개까지 더해 보세요.',
  'Choose how you like to drink.':'좋아하는 마시는 방식을 골라 주세요.',
  'Choose the main body, then add optional sections above it.':'메인 바디를 고르고 그 위에 원하는 섹션을 더해 보세요.',
  'Choose a standard, narrow, or storage base.':'기본형, 슬림형, 수납형 베이스 중에서 골라 주세요.',
  'Optional accessories for your bottle.':'내 보틀에 필요한 액세서리를 골라 주세요.',
  'Check your parts, colors, and estimated total.':'선택한 부품과 색상, 예상 합계를 확인해 주세요.',
  'Lower extensions':'하단 확장 모듈', 'No lower extensions':'하단 확장 모듈 없음',
  'Optional modules below the main body.':'메인 바디 아래에 더하는 선택형 모듈이에요.',
  'Lower extensions in order from main body to base':'메인 바디에서 베이스 방향으로 쌓인 하단 확장 모듈',
  'Additional middle sections':'추가 바디 섹션',
  'Stack above the main body, toward the lid. Each section has its own type, size, and color.':'메인 바디 위에서 뚜껑 방향으로 쌓아요. 섹션마다 종류, 크기, 색상을 고를 수 있어요.',
  'Middle sections in order from main body toward lid':'메인 바디에서 뚜껑 방향으로 쌓인 추가 섹션',
  'Add short section':'짧은 섹션 추가', 'Add long section':'긴 섹션 추가',
  'Maximum 3 middle sections. Remove one to add another.':'추가 바디 섹션은 최대 3개예요. 다른 섹션을 더하려면 하나를 제거해 주세요.',
  'Maximum 3 lower modules. Remove one to add another.':'하단 모듈은 최대 3개예요. 다른 모듈을 더하려면 하나를 제거해 주세요.',
  'Long lower extensions do not connect to the Storage base.':'긴 하단 확장 모듈은 수납형 베이스에 연결할 수 없어요.',
  'Each lower extension has its own type and color.':'하단 확장 모듈마다 종류와 색상을 고를 수 있어요.',
  'Not compatible with your current selection':'현재 선택한 부품과 호환되지 않아요',
  'Main body':'메인 바디', 'Main body color':'메인 바디 색상',
  'Main handle color':'메인 손잡이 색상', 'Lid color':'뚜껑 색상',
  'Body color':'바디 색상', 'Base color':'베이스 색상', 'Handle color':'손잡이 색상',
  'Section color':'섹션 색상', 'Extension color':'확장 모듈 색상', 'Attachment color':'액세서리 색상',
  'Build editing tools':'보틀 편집 도구', 'Undo':'실행 취소', 'Redo':'다시 실행',
  'Random colors':'색상 무작위 선택', 'Match all colors':'모든 색상 맞추기', 'Presets':'추천 조합',
  'Back':'이전', 'Next':'다음', 'Add to bag':'장바구니에 담기', 'demo total':'데모 합계',
  'estimated capacity':'예상 용량', 'individual pieces':'개별 부품', 'Your pieces':'내 부품 구성',
  'Demo price':'데모 가격', 'demo price':'데모 가격', 'Concept preview':'콘셉트 미리보기',
  'Share or save your build':'내 보틀 공유 또는 저장', 'Build link':'보틀 구성 링크',
  'Shareable build link':'공유 가능한 보틀 구성 링크',
  'Your link includes the chosen components and colors.':'링크에 선택한 부품과 색상이 저장돼요.',
  'Your custom Babo':'나만의 바보 보틀', 'Your bag':'장바구니', 'Your shopping bag':'내 장바구니',
  'Individual concept component':'개별 콘셉트 부품', 'Remove':'제거', 'Quantity':'수량',
  'Estimated subtotal':'예상 소계', 'Review demo order':'데모 주문 확인',
  'Continue browsing':'계속 둘러보기', 'Your bag is empty':'장바구니가 비어 있어요',
  'Choose a bottle or build your own.':'보틀을 고르거나 나만의 보틀을 만들어 보세요.',
  'DEMO CHECKOUT':'데모 주문 확인', 'Review your order':'주문 구성 확인',
  'Demo subtotal':'데모 소계', 'What a complete bottle needs':'보틀을 완성하려면',
  'Finish demo review':'데모 확인 완료', 'Back to bag':'장바구니로 돌아가기',
  'Demo order review':'데모 주문 미리보기', 'Product concept':'제품 콘셉트',
  'BOTTLE':'보틀', 'COMPONENT':'부품', 'Component':'부품', 'System':'시스템',
  'Babo modular concept':'바보 모듈형 보틀 콘셉트', 'Estimated capacity':'예상 용량',
  'Materials & fit':'소재 및 연결 방식', 'Not yet verified':'아직 검증되지 않음',
  'Customize this bottle':'이 보틀 꾸미기', 'Add part to bag':'부품 장바구니에 담기',
  'Care & compatibility':'관리 및 호환 안내', 'Item not found.':'제품을 찾을 수 없어요.',
  'Search bottles, lids, or accessories':'보틀, 뚜껑, 액세서리 검색',
  'Search bottles, parts and accessories':'보틀, 부품, 액세서리 검색',
  'Search Babo catalog':'바보 제품 검색', 'Bottles, parts, and accessories. Demo pricing.':'보틀, 부품, 액세서리 · 데모 가격',
  'No results':'검색 결과 없음', 'Try “lid”, “body”, or “strap”.':'뚜껑, 바디, 스트랩 등으로 검색해 보세요.',
  'Shared build restored.':'공유된 보틀 구성을 불러왔어요.',
  'This shared build could not be opened. Start with a preset.':'공유된 구성을 열 수 없어요. 추천 조합에서 다시 시작해 주세요.',
  'Bottle added to your bag.':'보틀을 장바구니에 담았어요.',
  'Concept component added to your bag.':'콘셉트 부품을 장바구니에 담았어요.',
  'Build reset.':'보틀 구성을 초기화했어요.', 'Build link copied.':'보틀 구성 링크를 복사했어요.',
  'Your build link is ready to copy.':'보틀 구성 링크를 복사할 수 있어요.',
  'Demo review complete. No order was placed. Your bag is saved.':'데모 확인을 마쳤어요. 실제 주문은 없으며 장바구니는 저장돼요.',
  'Choose your base':'베이스를 골라 주세요', 'Choose your body':'바디를 골라 주세요',
  'Choose your lid':'뚜껑을 골라 주세요', 'Edit your base':'베이스 수정하기',
  'Edit your body':'바디 수정하기', 'Edit your lid':'뚜껑 수정하기',
  'Choose a type, pick a color, then continue.':'종류와 색상을 고른 뒤 다음 단계로 넘어가세요.',
  'Next: body':'다음: 바디', 'Next: lid':'다음: 뚜껑', 'Customize extras':'추가 부품 꾸미기',
  'EDIT PART':'부품 수정', 'ADD A PART':'부품 더하기',
  'Changes appear on your bottle.':'바꾼 내용이 보틀에 바로 반영돼요.',
  'Choose a part to place it in the preview.':'미리보기에 놓을 부품을 골라 주세요.',
  'Add to bottle':'보틀에 추가', 'Body size':'바디 크기', 'Module size':'모듈 크기',
  'Choose body':'바디 고르기', 'Choose lid':'뚜껑 고르기', 'Choose base':'베이스 고르기',
  'Add modules or attachments':'모듈과 액세서리 더하기',
  'Remove base':'베이스 제거', 'Remove body':'바디 제거', 'Remove lid':'뚜껑 제거',
  'Edit this section':'이 섹션 수정하기', 'This module stacks above the main body.':'메인 바디 위에 쌓이는 모듈이에요.',
  'Remove section':'섹션 제거', 'Edit this extension':'이 확장 모듈 수정하기',
  'This module sits between the body and base.':'바디와 베이스 사이에 놓이는 모듈이에요.',
  'Remove extension':'확장 모듈 제거', 'ATTACHMENT':'액세서리',
  'Choose a type and its own color.':'종류와 색상을 각각 골라 주세요.',
  'Attachment type':'액세서리 종류', 'Remove attachment':'액세서리 제거',
  'Make room for more':'조금 더 담아 보세요',
  'Each extra part has its own type and color.':'추가 부품마다 종류와 색상을 고를 수 있어요.',
  'Place a body to add modules and attachments.':'바디를 놓으면 모듈과 액세서리를 더할 수 있어요.',
  'Body sections':'바디 섹션', 'Add body section':'바디 섹션 추가',
  'Stack above the main body.':'메인 바디 위에 쌓아요.', 'Clear extensions':'투명 확장 모듈',
  'Stack below the body. Long extensions require a Standard or Narrow base.':'바디 아래에 쌓아요. 긴 확장 모듈은 기본형 또는 슬림형 베이스에 연결해 주세요.',
  'Start with the base':'베이스부터 시작해 보세요',
  'Choose a shape to place your first piece.':'모양을 고르고 첫 부품을 놓아 보세요.',
  'Edit bottle parts':'보틀 부품 수정', 'Click any part to edit it.':'부품을 누르면 수정할 수 있어요.',
  'Your build starts here':'여기서 나만의 보틀이 시작돼요',
  'Remove long extensions before choosing a Storage base':'수납형 베이스를 선택하려면 긴 확장 모듈을 먼저 제거해 주세요',
  'Coral':'코랄', 'Lagoon':'라군', 'Butter':'버터', 'Sage':'세이지', 'Sky':'스카이',
  'Ink':'잉크', 'Lilac':'라일락', 'Cloud':'클라우드', 'Cream':'크림', 'Navy':'네이비',
  'Blue':'블루', 'Mint':'민트', 'Rose':'로즈', 'Teal':'틸', 'Sand':'샌드',
  'Lavender':'라벤더', 'Cobalt':'코발트', 'Orange':'오렌지', 'Yellow':'옐로',
  'Aqua':'아쿠아', 'Lime':'라임', 'Seafoam':'시폼', 'Red':'레드',
  'Coral + cream':'코랄 + 크림', 'Navy + blue':'네이비 + 블루', 'Sage + mint':'세이지 + 민트',
  'Rose + cream':'로즈 + 크림', 'Teal + sand':'틸 + 샌드', 'Lavender + teal':'라벤더 + 틸',
  'Cobalt + orange':'코발트 + 오렌지', 'Yellow + navy':'옐로 + 네이비',
  'Lilac + lime':'라일락 + 라임', 'Red + aqua':'레드 + 아쿠아',
  'Short smooth body section':'짧은 스무스 바디 섹션', 'Bead charm':'비즈 참',
  'Base color':'베이스 색상', 'Brand preview':'브랜드 미리보기',
  'Switch to Korean':'한국어로 보기', 'Switch to English':'영어로 보기',
  'Read our story':'바보 이야기 읽기',
  'Footer navigation':'하단 메뉴', 'Parts':'부품', 'Bag':'장바구니',
  'Concept storefront':'콘셉트 스토어', 'Demo pricing':'데모 가격',
  'Final materials, care, and compatibility are unconfirmed.':'최종 소재, 관리 방법, 호환성은 아직 확정되지 않았어요.',
  'Fit is unverified.':'실제 연결과 사용 적합성은 아직 검증되지 않았어요.',
  'clear stack':'모듈 모두 비우기',
  'The Storage base accepts no extensions or up to 3 short modules. Physical fit and performance have not been tested.':'수납형 베이스에는 확장 모듈 없이 사용하거나 짧은 모듈을 최대 3개까지 연결할 수 있어요. 실제 연결과 성능은 아직 시험하지 않았어요.',
  'Stack up to 3 modules. The Storage base cannot be combined with any long extension. Capacity and compatibility are concept estimates.':'모듈을 최대 3개까지 쌓을 수 있어요. 수납형 베이스에는 긴 확장 모듈을 연결할 수 없어요. 용량과 호환성은 콘셉트 기준의 예상치예요.',
  'This is a preview. No order will be placed.':'미리보기 화면이에요. 실제 주문은 진행되지 않아요.',
  'No payment is collected, no shipment is created, and these items are not reserved. Use this review to explore your configuration.':'결제, 배송, 상품 예약은 진행되지 않아요. 이 화면에서 선택한 구성을 확인해 보세요.',
  'Physical samples, compatibility testing, materials, care instructions, and final pricing are required before any real purchase could be offered.':'실제 판매에 앞서 제품 샘플, 호환성 시험, 소재, 관리 방법, 최종 가격을 확정해야 해요.',
  'Demo prices in USD. Shipping, tax, and fulfillment are not available. No products are being sold through this preview.':'가격은 미국 달러 기준 데모 가격이에요. 배송, 세금 계산, 주문 처리는 제공되지 않으며 이 미리보기에서 실제 제품을 판매하지 않아요.',
  'These are visual configurations and estimated prices. Materials, capacity, watertightness, food safety, and module fit are not verified. Checkout is a demo; no payment or real order will be taken.':'보틀 구성과 예상 가격을 살펴보는 화면이에요. 소재, 용량, 밀폐 성능, 식품 안전성, 모듈 연결은 아직 검증되지 않았어요. 주문 확인은 데모이며 실제 결제나 주문은 진행되지 않아요.',
  'A foundation, lid, body, and base from the compatible Babo concept family. Extensions and accessories are optional. A standalone part is not a complete bottle.':'호환되는 바보 콘셉트의 기본 용량, 뚜껑, 바디, 베이스가 필요해요. 확장 모듈과 액세서리는 선택 사항이며 개별 부품만으로는 보틀이 완성되지 않아요.',
  'The Snack compartment is an attachment, separate from the Storage base. Accessories are optional. Materials, attachment fit, and load limits are unverified.':'스낵 수납함은 수납형 베이스와 다른 액세서리예요. 액세서리는 선택 사항이며 소재, 연결 방식, 하중 제한은 아직 검증되지 않았어요.',
  'Capacity and price are estimates. The bottle and connections need physical testing.':'용량과 가격은 예상치예요. 보틀과 연결 부위는 실제 제품 시험이 필요해요.',
  'Babo is a modular bottle concept. Swap parts, change the size, and preview your own brand.':'바보는 부품을 바꾸고 용량을 조절하며 나만의 브랜드를 담는 모듈형 보틀 콘셉트입니다.',
  '.. See all':'모두 보기', '… See all':'모두 보기', 'Optional extras':'추가 부품 (선택)',
  'Your main bottle is complete. Extras are optional.':'기본 보틀이 완성됐어요. 원한다면 부품을 더해 보세요.',
  'Your main bottle is ready. Change any color or add extras.':'기본 보틀이 준비됐어요. 색상을 바꾸거나 부품을 더해 보세요.',
  'Choose a type to add this piece.':'종류를 고르면 이 부품을 더할 수 있어요.',
  'Finish your base, body, and lid to add more pieces.':'베이스, 바디, 뚜껑을 완성하면 부품을 더할 수 있어요.',
  'Add more pieces, or review your bottle as it is.':'부품을 더하거나 지금 구성으로 보틀을 확인해 보세요.',
  'Add above the main body':'메인 바디 위에 더하기', 'Add below the main body':'메인 바디 아래에 더하기',
  'Carry, clip, or accessorize':'메고, 걸고, 나답게 꾸며 보세요',
  'Six Babo bottle combinations in coral, navy, sage, rose, teal, and lavender, arranged around a clear center with interchangeable lids, clear extensions, and carry accessories.':'코랄, 네이비, 세이지, 로즈, 틸, 라벤더의 바보 보틀 여섯 가지. 교체형 뚜껑과 투명 확장 모듈, 휴대용 액세서리가 함께 구성되어 있어요.',
  'Babo bottle parts and accessories ready to mix and match':'자유롭게 조합할 수 있는 바보 보틀 부품과 액세서리',
  'Coral and cream Babo bottle with its sections screwed together':'섹션을 연결해 완성한 코랄과 크림 색상의 바보 보틀',
  'Bottle brush for cleaning inside the separated sections':'분리한 섹션 안쪽을 닦는 보틀 세척 브러시',
  'Blank coral and cream Babo bottle with your engraving preview':'나만의 각인을 미리 보는 코랄과 크림 색상의 바보 보틀',
  'Explore bottle parts':'보틀 부품 살펴보기', 'Your main bottle':'내 기본 보틀',
  'Continue':'계속', 'Live configuration':'실시간 구성', 'Module':'모듈',
  'short clear extension':'짧은 투명 확장 모듈', 'long clear extension':'긴 투명 확장 모듈',
};

const canonical = value => String(value).replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/\s+/g,' ').trim();
const exact = new Map(Object.entries({...koData,...ui}).map(([en,ko])=>[canonical(en).toLowerCase(),ko]));
const lookup = value => exact.get(canonical(value).toLowerCase());
const labelWords = {
  'smooth':'스무스', 'handle':'손잡이형', 'textured':'골지', 'ribbed':'골지', 'clear':'투명',
  'straw':'스트로', 'chug':'처그', 'loop':'루프', 'flip':'플립',
  'body section':'바디 섹션', 'middle section':'추가 바디 섹션',
  'lower extension':'하단 확장 모듈', 'extension':'확장 모듈',
  'attachment':'액세서리', 'section':'섹션', 'body':'바디', 'base':'베이스', 'lid':'뚜껑',
  'short':'짧은', 'long':'긴', 'color':'색상', 'size':'크기', 'type':'종류',
};
const labelExpression = new RegExp(`\\b(${Object.keys(labelWords).sort((a,b)=>b.length-a.length).join('|')})\\b`,'gi');
const translateLabel = value => lookup(value) || value.replace(labelExpression,match=>labelWords[match.toLowerCase()]);

function translateCore(source,depth=0) {
  const direct=lookup(source);if(direct)return direct;
  if(depth>5)return source;
  const s=canonical(source);
  if(!/[A-Za-z]/.test(s)||/^(?:https?:\/\/|blob:|data:|#[0-9a-f]{3,8}$)/i.test(s)||/^BB-[A-Z0-9-]+$/i.test(s))return source;
  const punctuation=s.match(/^([\s\S]+?)([.!?])$/);
  if(punctuation){const found=lookup(punctuation[1]);if(found)return found+punctuation[2];}
  let m;
  for(const suffix of [' Final materials, care, and compatibility are unconfirmed.',' Fit is unverified.'])if(s.endsWith(suffix))return translateCore(s.slice(0,-suffix.length),depth+1)+' '+translateCore(suffix.trim(),depth+1);
  if((m=source.match(/^Engraving preview: ([\s\S]*)$/i)))return `각인 미리보기: ${!brandEdited&&m[1]==='YOUR BRAND'?'나의 브랜드':m[1]}`;
  if((m=source.match(/^Brand preview: ([\s\S]*)$/i)))return `브랜드 미리보기: ${m[1]}`;
  if((m=s.match(/^(\d+) items? in bag$/i)))return `장바구니에 ${m[1]}개`;
  if((m=s.match(/^(\d+) of (\d+) main parts$/i)))return `기본 부품 ${m[2]}개 중 ${m[1]}개`;
  if((m=s.match(/^(\d+) parts shown\.?$/i)))return `부품 ${m[1]}개 표시 중`;
  if((m=s.match(/^(\d+) of (\d+) parts$/i)))return `부품 ${m[2]}개 중 ${m[1]}개`;
  if((m=s.match(/^(\d+) parts$/i)))return `부품 ${m[1]}개`;
  if((m=s.match(/^Step (\d+) of (\d+) · Add your (base|body|lid)$/i)))return `${m[1]}단계 / ${m[2]} · ${translateLabel(m[3])} 더하기`;
  if((m=s.match(/^(Base|Body|Lid) added\. Pick a color, then continue\.$/i)))return `${translateLabel(m[1])}를 더했어요. 색상을 고른 뒤 다음 단계로 넘어가세요.`;
  if((m=s.match(/^(\d+)\.\s+(.+)$/)))return `${m[1]}. ${translateCore(m[2],depth+1)}`;
  if((m=s.match(/^Handle (.+)$/i)))return `손잡이 ${translateCore(m[1],depth+1)}`;
  if((m=s.match(/^(\d+) results?$/i)))return `검색 결과 ${m[1]}개`;
  if((m=s.match(/^(\d+) (?:pieces|individual pieces)$/i)))return `부품 ${m[1]}개`;
  if((m=s.match(/^See all (\d+) pieces$/i)))return `부품 ${m[1]}개 모두 보기`;
  if((m=s.match(/^(\d+) added$/i)))return `${m[1]}개 추가됨`;
  if((m=s.match(/^(\d+)\s*\/\s*(\d+) (modules|sections)$/i)))return `${m[1]} / ${m[2]} ${m[3]==='modules'?'모듈':'섹션'}`;
  if((m=s.match(/^STEP (\d+)\s*\/\s*(\d+)$/i)))return `${m[1]}단계 / ${m[2]}`;
  if((m=s.match(/^Approx\. (\d+(?:[,.]\d+)*) ml$/i)))return `약 ${m[1]} ml`;
  if((m=s.match(/^Approx\. \+(\d+) ml$/i)))return `약 +${m[1]} ml`;
  if((m=s.match(/^(Core|Mini|Max)\s*·\s*approx\. ([\d,.]+) ml$/i)))return `${({core:'기본',mini:'미니',max:'맥스'})[m[1].toLowerCase()]} · 약 ${m[2]} ml`;
  if((m=s.match(/^Configuration updated\. Estimated capacity (\d+) milliliters\. (\d+) pieces\. Demo total (\$[\d.,]+)\.$/i)))return `구성을 변경했어요. 예상 용량 ${m[1]} ml. 부품 ${m[2]}개. 데모 합계 ${m[3]}.`;
  if((m=s.match(/^(Decrease|Increase) quantity of (.*), current quantity (\d+)$/i)))return `${translateCore(m[2],depth+1)} 수량 ${m[1].toLowerCase()==='decrease'?'줄이기':'늘리기'}, 현재 ${m[3]}개`;
  if((m=s.match(/^Quantity (\d+)$/i)))return `수량 ${m[1]}개`;
  if((m=s.match(/^(.*) selected in the bottle builder below\.$/i)))return `아래 보틀 만들기에서 ${translateCore(m[1],depth+1)} 조합을 선택했어요.`;
  if((m=s.match(/^(\d+) milliliter bottle, (\d+) stacked extensions, (\d+) attachments$/i)))return `${m[1]} ml 보틀, 확장 모듈 ${m[2]}개, 액세서리 ${m[3]}개`;
  if((m=s.match(/^BODY SECTION (\d+)$/i)))return `바디 섹션 ${m[1]}`;
  if((m=s.match(/^LOWER EXTENSION (\d+)$/i)))return `하단 확장 모듈 ${m[1]}`;
  if((m=s.match(/^(Middle section|Lower extension|Body section|Extension) (\d+)(?: (type|size|color))?$/i)))return `${translateLabel(m[1])} ${m[2]}${m[3]?' '+translateLabel(m[3]):''}`;
  if((m=s.match(/^Remove (middle section|lower extension|body section|extension) (\d+)$/i)))return `${translateLabel(m[1])} ${m[2]} 제거`;
  if((m=s.match(/^(Short|Long) (smooth|handle|ribbed|textured|clear) middle(?: · (\d+))?$/i)))return `${translateLabel(m[1])} ${translateLabel(m[2])} 추가 바디${m[3]?' · '+m[3]:''}`;
  if((m=s.match(/^(Edit|Add|Remove|Choose|View|Explore|Customize|Preview) (.+)$/i))){
    const tail=translateCore(m[2],depth+1);if(tail!==m[2])return `${tail} ${{edit:'수정',add:'추가',remove:'제거',choose:'고르기',view:'보기',explore:'살펴보기',customize:'꾸미기',preview:'미리보기'}[m[1].toLowerCase()]}`;
  }
  if((m=s.match(/^Custom (.+)$/i)))return `직접 고르는 ${translateLabel(m[1])}`;
  if((m=s.match(/^(.*) color(?:: (.*))?$/i)))return `${translateCore(m[1],depth+1)} 색상${m[2]?': '+translateCore(m[2],depth+1):''}`;
  if((m=s.match(/^(.+?) (bottle|attachment|component) concept$/i)))return `${translateCore(m[1],depth+1)} ${{bottle:'보틀',attachment:'액세서리',component:'부품'}[m[2].toLowerCase()]} 콘셉트`;
  if((m=s.match(/^(.+) concept$/i))){const label=translateCore(m[1],depth+1);if(label!==m[1])return `${label} 콘셉트`;}
  if((m=s.match(/^A modular bottle with a (.*), (.*), and (.*)\. Customize the parts and colors in the builder\.$/i)))return `${translateCore(m[1],depth+1)}, ${translateCore(m[2],depth+1)}, ${translateCore(m[3],depth+1)}로 구성한 모듈형 보틀이에요. 만들기 화면에서 부품과 색상을 바꿔 보세요.`;
  if((m=s.match(/^A (.+) is one part of a bottle\. Add a compatible foundation, lid, body, and base to complete your assembly\.$/i)))return `${translateCore(m[1],depth+1)}은 보틀을 구성하는 부품이에요. 호환되는 기본 용량, 뚜껑, 바디, 베이스를 더해 완성해 주세요.`;
  if((m=s.match(/^(.*) × (\d+)$/)))return `${translateCore(m[1],depth+1)} × ${m[2]}`;
  if((m=s.match(/^(\$[\d.,]+) demo total$/i)))return `${m[1]} 데모 합계`;
  if((m=s.match(/^(?:short|long)(?:, (?:short|long))* extension modules$/i)))return s.replace(/ extension modules$/i,' 확장 모듈').replace(/short/gi,'짧은').replace(/long/gi,'긴');
  if((m=s.match(/^(\d+) middle sections above the main body\.?$/i)))return `메인 바디 위 추가 섹션 ${m[1]}개.`;
  if((m=s.match(/^(\d+) attachments\.?$/i)))return `액세서리 ${m[1]}개.`;
  if(s.includes(' · '))return s.split(' · ').map(piece=>translateCore(piece,depth+1)).join(' · ');
  if(s.includes(': '))return s.split(': ').map(piece=>translateCore(piece,depth+1)).join(': ');
  if(s.includes(' + '))return s.split(' + ').map(piece=>translateCore(piece,depth+1)).join(' + ');
  if(s.includes('. '))return s.split(/(?<=[.!?])\s+/).map(piece=>translateCore(piece,depth+1)).join(' ');
  if(s.includes(', '))return s.split(', ').map(piece=>translateCore(piece,depth+1)).join(', ');
  if(punctuation){const translated=translateCore(punctuation[1],depth+1);if(translated!==punctuation[1])return translated+punctuation[2];}
  return translateLabel(source);
}

let language='en',initialized=false,observer=null,queued=false,brandEdited=false;
const textSources=new WeakMap(),attributeSources=new WeakMap();
const observedAttributes=['aria-label','aria-valuetext','alt','title','placeholder','content'];
const ignoreSelector='title,script,style,title,code,pre,textarea,[contenteditable="true"],[data-i18n-ignore],[translate="no"],#brand-logo-text,.bb-wordmark,#language-toggle';
export function t(value,locale=language) {
  const raw=String(value??'');if(locale!=='ko')return raw;
  const leading=raw.match(/^\s*/)[0],trailing=raw.match(/\s*$/)[0],core=raw.trim();
  return core?leading+translateCore(core)+trailing:raw;
}
export function getLanguage(){return language;}
function protectedText(node){const parent=node.parentElement;return !parent||!!parent.closest(ignoreSelector)||!!parent.closest('svg');}
function translateText(node){
  if(protectedText(node)||!node.nodeValue?.trim())return;
  let record=textSources.get(node);
  if(!record||node.nodeValue!==record.rendered)record={source:node.nodeValue,rendered:node.nodeValue};
  const next=t(record.source);if(node.nodeValue!==next)node.nodeValue=next;
  record.rendered=next;textSources.set(node,record);
}
function translateAttribute(element,name){
  if(element.closest('#language-toggle,[data-i18n-ignore],[translate="no"]'))return;
  if(name==='content'&&!element.matches('meta[name="description"]'))return;
  const current=element.getAttribute(name);if(current===null)return;
  let records=attributeSources.get(element);if(!records){records=new Map();attributeSources.set(element,records);}
  let record=records.get(name);if(!record||current!==record.rendered)record={source:current,rendered:current};
  const next=t(record.source);if(current!==next)element.setAttribute(name,next);
  record.rendered=next;records.set(name,record);
}
function syncBrandDefault(){
  const input=document.getElementById('brand-text'),label=document.getElementById('brand-logo-text');
  if(!input||!label||brandEdited)return;
  if(!['YOUR BRAND','나의 브랜드',''].includes(input.value))return;
  const placeholder=language==='ko'?'나의 브랜드':'YOUR BRAND';
  input.value=placeholder;input.placeholder=placeholder;
  if(!label.hidden)label.textContent=placeholder;
}
function updateToggle(){
  const button=document.getElementById('language-toggle');if(!button)return;
  button.textContent=language==='ko'?'EN':'KR';button.lang=language==='ko'?'en':'ko';
  button.setAttribute('aria-label',language==='ko'?'영어로 보기':'Switch to Korean');
  button.setAttribute('aria-pressed',String(language==='ko'));button.dataset.language=language;
}
function observe(){observer?.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:observedAttributes});}
export function translateDOM(root=document){
  observer?.disconnect();
  try{
    if(root.nodeType===3)translateText(root);
    else {
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let node;
      while((node=walker.nextNode()))translateText(node);
      const elements=[];if(root.nodeType===1)elements.push(root);
      elements.push(...root.querySelectorAll('[aria-label],[aria-valuetext],[alt],[title],[placeholder],meta[name="description"]'));
      for(const element of elements)for(const name of observedAttributes)if(element.hasAttribute(name))translateAttribute(element,name);
    }
    syncBrandDefault();updateToggle();
  }finally{if(initialized)observe();}
}
function schedule(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;translateDOM(document);});}
export function setLanguage(value,{persist=true}={}){
  language=value==='ko'?'ko':'en';
  if(typeof document==='undefined')return language;
  document.documentElement.lang=language;
  if(persist)try{localStorage.setItem('babo-language',language);}catch{}
  translateDOM(document);
  window.dispatchEvent(new CustomEvent('languagechange',{detail:{language}}));
  return language;
}
export function initI18n(){
  if(initialized){translateDOM(document);return;}
  initialized=true;
  try{language=localStorage.getItem('babo-language')==='ko'?'ko':'en';}catch{language='en';}
  const brand=document.getElementById('brand-text');brandEdited=!!brand&&!['','YOUR BRAND','나의 브랜드'].includes(brand.value);
  observer=new MutationObserver(schedule);
  document.addEventListener('click',event=>{
    if(event.target.closest('#language-toggle'))setLanguage(language==='ko'?'en':'ko');
    if(event.target.closest('#brand-reset')){brandEdited=false;schedule();}
  });
  document.addEventListener('input',event=>{if(event.target.id==='brand-text')brandEdited=true;},true);
  window.addEventListener('storage',event=>{if(event.key==='babo-language'||event.key===null){let next='en';try{next=localStorage.getItem('babo-language')==='ko'?'ko':'en';}catch{}setLanguage(next,{persist:false});}});
  setLanguage(language,{persist:false});
}
