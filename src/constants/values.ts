import { Platform } from "react-native";
import deviceInfoModule from "react-native-device-info";
import { Region } from "react-native-nmap";
import { PostType } from "../../__generated__/globalTypes";
import { HEIGHT, WIDTH } from "./styles";

export const IS_ANDROID = Platform.OS === 'android'
export const IS_IOS = Platform.OS === 'ios'

export const IAMPORT_CODE = 'imp01398045'
export const CHANNEL_IO_PLUGIN_KEY = 'e9a51cb7-702c-4cc7-9596-4035c01002a1'
export const APPSTORE_ID = '1576824009'
export const PLAYSTORE_PACKAGE_NAME = 'com.gilberto.silva'

const PROD_TEST_MODE = true
// const LOCAL_IP = '10.220.230.223'
const LOCAL_IP = '172.20.10.2'

export const GRAPHQL_SERVER_URL = (() => {
    if (!__DEV__ || PROD_TEST_MODE) return 'https://production-5gq6bfkwja-du.a.run.app/graphql'
    if (IS_ANDROID) {
        if (deviceInfoModule.isEmulatorSync()) return 'http://10.0.2.2:8080/graphql'
        else return `http://${LOCAL_IP}:8080/graphql`
        // else return `http://${LOCAL_IP}:8080/graphql`
    }
    if (IS_IOS) {
        if (deviceInfoModule.isEmulatorSync()) return `http://localhost:8080/graphql`
        else return `http://${LOCAL_IP}:8080/graphql`
        // else return `http://${LOCAL_IP}:8080/graphql`
    }
})()

export const WEBSOCKET_SERVER_URL = (() => {
    if (!__DEV__ || PROD_TEST_MODE) return `https://production-5gq6bfkwja-du.a.run.app/graphql`
    if (IS_ANDROID) {
        if (deviceInfoModule.isEmulatorSync()) return `http://10.0.2.2:8080/graphql`
        else return `http://${LOCAL_IP}:8080/graphql`
        // else return `http://${LOCAL_IP}:8080/graphql`
    }
    if (IS_IOS) {
        if (deviceInfoModule.isEmulatorSync()) return `http://localhost:8080/graphql`
        else return `http://${LOCAL_IP}:8080/graphql`
        // else return 'ws://${LOCAL_IP}:8080/graphql'
    }
})()

export const ANIMAL_CHARACTER = {
    'cat': [
        '자신이 사람인줄 아는 개냥이',
        '호기심 많은 고양이',
        '사냥꾼 고양이',
        '예민 보스 고양이',
        '고양이들의 고양이'
    ],
    'dog': [
        '자신감 있는 강아지',
        '독립적인 강아지',
        '편안하고 행복한 강아지',
        '소심한 강아지',
        '적응력 있는 강아지'
    ]
}

export const ANIMAL_SPECIES: { [type: string]: { [key: string]: string[] } } = {
    'cat': {
        'ㄱ': [],
        'ㄴ': ['노르웨이 숲', '네바 머스커레이드', '네벨룽'],
        'ㄷ': ['데본렉스', '도메스틱 숏헤어', '도메스틱 롱헤어', '돈스코이', '드래곤 리',],
        'ㄹ': ['라가머핀', '라팜', '랙돌', '러시안 블루', '라이코이', '람킨 드월프',],
        'ㅁ': ['맹크스', '메인쿤', '민스킨', '먼치킨', '미뉴에트', '메콩 밥테일'],
        'ㅂ': ['발리니즈', '버만', '버미즈', '벵갈', '봄베이', '브리티시 쇼트헤어', '브리티시 롱 헤어', '밤비노', '버밀라'],
        'ㅅ': ['시베리아', '샴', '샤트룩스', '셀커크 렉스', '소말리', '스코티시 폴드', '스핑크스', '싱가퓨라', '스노우슈', '사바나',],
        'ㅇ': ['아메리칸 밥테일', '아메리칸 쇼트헤어', '아메리칸 와이어헤어', '아메리칸 컬', '아비시니안', '오리엔탈쇼트헤어', '오리엔탈롱헤어', '오시캣', '유러피안버미즈', '이그저틱', '이집션마우', '엑조틱 쇼트헤어'],
        'ㅈ': ['자바니즈', '재패니즈 밥테일',],
        'ㅊ': ['쵸지', '차이니즈 리 와우', '치토',],
        'ㅋ': ['코리안 숏헤어', '코리안 롱헤어', '컬러포인트쇼트헤어', '코니시 렉스', '코랫',],
        'ㅌ': ['터키시 반', '터키시 앙고라', '통키니즈', '토이거',],
        'ㅍ': ['페르시안', '픽시 밥',],
        'ㅎ': ['하바나브라운', '하이랜더', '히말라얀'],
    },
    'dog': {
        'ㄱ': ['고든 세터', '골든두들', '골든 리트리버', '그레이트 데인', '그레이트 스위스 마운틴 도그', '그레이트 피레니즈', '그레이하운드', '그린란드견', '글렌 오브 이말 테리어', '기슈견',],
        'ㄴ': ['나폴리탄 마스티프', '노르웨지안 부훈트', '노르웨이 엘크 하운드', '노리치 테리어', '노바 스코셔 덕 톨링 레트리버', '노퍽 테리어', '뉴펀들랜드',],
        'ㄷ': ['닥스훈트', '달마시안', '댄디 딘몬트 테리어', '도고 까나리오', '도고 아르헨티노', '도그 드 보르도', '도베르만 핀셔', '도사견', '동경이',],
        'ㄹ': ['라사압소', '라페이로 도 알렌테조', '라포니안 허더', '래브라도 리트리버', '레온베르거', '레이크랜드 테리어', '로디지아 리지백', '로첸', '로트와일러',],
        'ㅁ': ['마스티프', '맨체스터 테리어', '몰티즈', '미니어처 불 테리어', '미니어처 슈나우저', '미니어처 핀셔',],
        'ㅂ': ['바센지', '바셋 하운드', '버니즈 마운틴 도그', '베들링턴 테리어', '벨기에 말리노이즈', '벨기에 테뷰런', '벨지안 그리펀', '벨지언 쉽독 (벨지언 셰퍼드)', '보더콜리', '보더 테리어', '보르도 마스티프', '보르조이', '보비에 드 플랜더스', '보스롱', '보스턴 테리어', '복서', '볼로네즈', '불개', '불도그', '불리 쿠타', '불 마스티프', '불 테리어', '브뤼셀 그리펀', '브리어드', '브리타니', '블랙 러시안 테리어', '블랙 앤드 탄 쿤하운드', '블러드 하운드', '비글', '비숑 프리제', '비어디드 콜리', '비즐라', '빠삐용',],
        'ㅅ': ['사모예드', '사플라니낙', '살루키', '삽살개', '샤페이', '서식스 스패니얼', '세인트 버나드', '셔틀랜드 쉽독', '소프트 코티드 휘튼 테리어', '솔로이츠 쿠인틀레', '스무드 폭스 테리어', '스웨디쉬 발훈트', '스카이 테리어', '스코티시 디어하운드', '스코티시 테리어', '스키퍼키', '스태퍼드셔 불 테리어', '스탠더드 슈나우저', '스패니쉬 그레이 하운드', '스패니쉬 마스티프', '스피노네 이탈리아노', '스피츠', '시바 이누', '시베리언 허스키', '시추', '시코쿠견', '실리엄 테리어', '실키 테리어',],
        'ㅇ': ['아나톨리아 셰퍼드', '아메리칸 불도그', '아메리칸 불리', '아메리칸 스태퍼드셔 테리어', '아메리칸 아키다', '아메리칸 에스키모 도그', '아메리칸 워터 스패니얼', '아메리칸 코커 스패니얼', '아메리칸 폭스하운드', '아이디', '아이리시 소프트코티드 휘튼 테리어', '아이리시 레드 앤드 화이트 세터', '아이리시 세터', '아이리시 울프 하운드', '아이리시 워터 스패니얼', '아이리시 테리어', '아키타', '아펜핀셔', '아프간 하운드', '알래스칸 맬러뮤트', '알래스칸 클리카이', '에스트렐라 마운틴 독', '에어데일 테리어', '오브차카', '오스트레일리안 실키 테리어', '오스트레일리안 켈피', '오스트레일리언 셰퍼드', '오스트레일리언 캐틀 도그', '오스트레일리언 테리어', '오터 하운드', '올드 잉글리시 쉽독', '와이머라너', '와이어 폭스 테리어', '와이어헤어드 포인팅 그리펀', '요크셔 테리어', '웨스트 하이랜드 화이트테리어', '웰시 스프링어 스패니얼', '웰시 코기', '웰시 테리어', '이비전 하운드', '이탤리언 그레이하운드', '잉글리시 세터', '잉글리시 스프링어 스패니얼', '잉글리시 코커 스패니얼', '잉글리시 토이 스패니얼', '잉글리시 폭스하운드',],
        'ㅈ': ['자이언트 슈나우저', '재패니즈 친', '재패니즈 스피츠', '잭 러셀 테리어', '저먼 셰퍼드', '저먼 쇼트헤어드 포인터', '저먼 와이어헤어드 포인터', '저먼 핀셔', '저먼 헌팅 테리어', '제주개', '진돗개',],
        'ㅊ': ['차우차우', '차이니즈 샤페이', '차이니즈 크레스티드', '체서피크 베이 레트리버', '치와와',],
        'ㅋ': ['카네 코르소', '카디건 웰시 코기', '카발리에 킹 찰스 스파니엘', '캉갈', '컬리코티드 레트리버', '케리 블루 테리어', '케언 테리어', '케이넌 도그', '케이스혼트', '코리안 마스티프', '코몬도르', '코커 스패니얼', '코통 드 튈레아르', '콜리', '쿠바스', '쿠이커혼제', '클럼버 스패니얼',],
        'ㅌ': ['토이 폭스 테리어', '티베탄 마스티프', '티베탄 스패니얼', '티베탄 테리어',],
        'ㅍ': ['파라오 하운드', '파슨 러셀 테리어', '파피용', '패터데일 테리어', '퍼그', '페키니즈', '펨브록 웰시 코기', '포르투기즈 워터 도그', '포메라니안', '포인터', '폭스 테리어', '폴리시 롤런드 시프도그', '폼피츠', '푸들', '푸미', '풀리', '풍산개', '프렌치 불도그', '프티 바세 그리퐁 방댕', '플랫코티드 레트리버', '플롯 하운드', '피니시 스피츠', '피레니안 마스티프', '피레니안 쉽독', '피레니언 셰퍼드', '필드 스패니얼', '필라 브라질레이로', '핏 불 테리어',],
        'ㅎ': ['해리어', '하바니즈', '홋카이도 이누', '휘핏'],
    }
}

export const DEVICE_RATIO = WIDTH / HEIGHT * 1.26

export const DELTA_LEVEL: Omit<Region, 'latitude' | 'longitude'>[] = [
    {
        latitudeDelta: 5,
        longitudeDelta: 5 * DEVICE_RATIO
    },
    {
        latitudeDelta: 1,
        longitudeDelta: 1 * DEVICE_RATIO
    },
    {
        latitudeDelta: 0.15,
        longitudeDelta: 0.15 * DEVICE_RATIO
    },
    {
        latitudeDelta: 0.045,
        longitudeDelta: 0.045 * DEVICE_RATIO
    }
]


export const DEFAULT_REGION_LAT_LOG: Omit<Region, 'latitudeDelta' | 'longitudeDelta'> = {
    latitude: 37.377712,
    longitude: 127.129062,
}

export const DEFAULT_REGION: Region = {
    ...DEFAULT_REGION_LAT_LOG,
    ...DELTA_LEVEL[0]
}

export const RATE_OPEN_TIMES_KEY = '@OPEN_TIMES'
export const IS_RATED = '@IS_RATED'
export const RATE_PERIOD = 50

export const WITHDRAW_REASONS = [
    '잘 사용하지 않는 앱 입니다',
    '계정을 새로 생성하고 싶어요',
    '반려동물을 더 이상 키우지 않아요',
    '비매너 사용자 때문에 사용하고 싶지 않아요'
]

export const REPORT_USER_REASONS = [
    '욕설, 비방, 인격모독, 성적인 발언 및 내용',
    '앱의 취지와 관계없이 광고를 보냅니다',
    '금품을 요구하는 채팅을 보냅니다'
]
export const REPORT_CHAT_REASONS = [
    '욕설, 비방, 인격모독, 성적인 발언 및 내용',
    '광고성 채팅'
]
export const REPORT_CHAT_ROOM_REASONS = [
    '그룹채팅방에서 정상적이지 않은 대화가 오고갑니다',
    '욕설, 비방, 인격모독, 성적인 발언 및 내용이 많음',
    '광고가 너무 많음'
]

export const INFLOWS = [
    '지인추천',
    '오프라인행사',
    '인스타그램, 페이스북',
    '카페',
    '카카오톡 채팅방',
    '기타'
]

export const POST_TYPES: { name: string, value: PostType }[] = [
    { name: '자유주제', value: PostType.free },
    { name: '산책하실분?', value: PostType.walk },
]