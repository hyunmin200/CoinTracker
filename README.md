# CoinTracker
> 이 프로젝트는 React 중급 스터디에서 공부하면서 만든 미니 프로젝트입니다.

## 🪙코인 데이터를 불러와서 시각화 해주는 사이트🪙

이 사이트는 코인 API를 사용하여 100개의 코인 데이터를 가져와서 시각화해서 보여주는 사이트입니다.

## ⚙️사용 기술
React, React-Router, React-Query, Recoil, Styled-Component, TypeScript

## ℹ️설명
### 메인 페이지
<img style="width: 400px" src="https://github.com/hyunmin200/CoinTracker/assets/102218665/0339b576-1dfe-4f63-ae58-e1de12b7bb81" />
<img style="width: 400px" src="https://github.com/hyunmin200/CoinTracker/assets/102218665/14a32860-babf-44eb-bb70-115755efee8d" />

메인 페이지입니다.  
coinpaprika의 api를 사용해서 100개의 코인들을 가져와 리스트형태로 뿌려줍니다.  

다크모드와 화이트 모드는 Styled-Component의 ThemeProvider를 사용해 만들었습니다.  

### 코인 페이지
<img style="width: 400px" src="https://github.com/hyunmin200/CoinTracker/assets/102218665/b327d934-a871-4a1d-aa35-38e3f2a0a2d8" />  

코인 페이지에서는 메인 페이지에서 클릭한 코인의 상세 정보를 볼 수 있습니다.  

#### 차트 페이지
<img style="width: 400px" src="https://github.com/hyunmin200/CoinTracker/assets/102218665/4010cf50-bbe0-400a-aa45-b840a970e161" />  

코인 페이지에서 Chart를 클릭하면 차트를 보여줍니다.  

차트는 20일정도의 가격변동을 확인할 수 있으며 마우스를 올리면 상세 정보를 확인할 수 있습니다.  

#### 가격 페이지
<img style="width: 400px" src="https://github.com/hyunmin200/CoinTracker/assets/102218665/aa0d437d-a3b0-4b59-8681-8f1723b0d98f" />  

그 코인의 최고가를 보여줍니다.  
몇 년 몇 날 며칠 몇 시에 최고가를 달성했지도 보여줍니다.
