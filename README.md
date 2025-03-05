<div align="center">
  <img width="200" height="200" alt="프로젝트 로고" src="./public/logo.png" />
</div>

<br>
<br>

## 💬 프로젝트 소개

**주변 약국을 쉽고 빠르게 찾아보세요.**
<br><br>
외지나 이사 후 갑작스런 병으로 약국 정보를 찾기 어려운 문제를 해결하기 위해 용산구 내 약국 정보를 쉽게 제공하는 프로젝트를 기획했습니다.

- 이사나 외지 생활 중 급병 시 약국 정보를 쉽게 확인할 수 있는 플랫폼
- 용산구 내 약국 정보, 위치, 전화번호 등 상세 정보 제공
- 신속한 치료와 건강 관리 지원을 위한 정보 접근성 향상

> - **작업 기간** : 2025. 02. 26 ~ 2025. 03. 05
> - **배포 주소** : https://pharmacy-map-eight.vercel.app/
<br />

## 👩‍👩‍👧‍👧 프로젝트 멤버 소개

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/33hyun">
        <img src="https://github.com/33hyun.png" width="80" alt="33hyun"/>
        <br />
        <sub><b>33hyun</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/1kxxk">
        <img src="https://github.com/1kxxk.png" width="80" alt="1kxxk"/>
        <br />
        <sub><b>1kxxk</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/Baek-hJ">
        <img src="https://github.com/Baek-hJ.png" width="80" alt="Baek-hJ"/>
        <br />
        <sub><b>Baek-hJ</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/99ShinByeongseon">
        <img src="https://github.com/99ShinByeongseon.png" width="80" alt="99ShinByeongseon"/>
        <br />
        <sub><b>99ShinByeongseon</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/dhdnjs0702">
        <img src="https://github.com/dhdnjs0702.png" width="80" alt="dhdnjs0702"/>
        <br />
        <sub><b>dhdnjs0702</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/wjsehdud777">
        <img src="https://github.com/wjsehdud777.png" width="80" alt="wjsehdud777"/>
        <br />
        <sub><b>wjsehdud777</b></sub>
        </a>
        <br />
      </td>   
    </tr>
    <tr>
      <td width="200px" align="center">
        디테일 페이지 작성
        <br>supabase 연결
      </td>
      <td width="200px" align="center">
        마이 페이지 작성
      </td>
      <td width="200px" align="center">
        검색결과 페이지 작성
      </td>
      <td width="200px" align="center">
      메인 페이지 작성
      </td>
      <td width="200px" align="center">
      검색 결과 페이지 작성
        <br>supabase 연결
      </td>
        <td width="200px" align="center">
      로그인/아웃 
        <br>회원가입 페이지 작성
      </td>
    </tr>
  </tbody>
</table>

<br />

## ⚙ 프로젝트 기능 소개

- **React 기반 웹 애플리케이션**입니다.
- **react-router-dom**을 이용해 페이지 간 네비게이션을 처리합니다.
- **Supabase**를 사용하여 데이터를 안전하고 효율적으로 관리합니다.
- **회원가입 및 로그인 기능을** 제공합니다.
- **회원 정보 유효성 검사**를 통해 정확한 데이터가 저장되도록 합니다.
- **sweet alert2**을 사용하여 사용자 경험을 개선했습니다.
- **약국 정보**: 약국이름, 약국위치, 전화번호, 리뷰기능 확인할 수 있습니다.
- **지도 Api**를 사용하여 지도 내 약국 위치를 확인할 수 있습니다.

<br>

## ⚙ 프로젝트 기획 및 협업 과정

### 🖍 기획 및 디자인

- Figma를 활용한 UI/UX 설계
<table>
  <tbody>
    <tr>
      <td align="center">
        <b>Description 작성을 통한 기획 세부화</b>
      </td>
    </tr>
    <tr>
      </td>
      <td width="900" align="center">
        <img src="./src/assets/figma.JPG" />
      </td>     
    </tr>
  </tbody>
</table>
<br>

### 🔗 협업 프로세스

- #### 페이지 단위 작업 관리
  - [각 페이지별 이슈](https://github.com/dhdnjs0702/Pharmacy_Map/issues) 생성
  - 페이지별 feature 브랜치 운영 (`feature/search`, `feature/detail`)
- #### [Pull Request 템플릿을 활용한 코드 리뷰](https://github.com/dhdnjs0702/Pharmacy_Map/pull/1)

<br><br>

## 📖 프로젝트 회고

- **supabase** 공공 데이터 포털 api를 가져와서 연결을 했다면 해결이 됬을것 -> 그러나 이번 프로젝트는 무료버전 슈퍼베이스를 사용해야하기에 약간의 한계가 있었고 아직 배우는 단계여서 기술이 부족한것도 한몫함.
- 시간 관계상 마이페이지의 **디테일**이 부족하여 아쉬웠다.
- **디자인** 일관성이 부족해 **통일감**이 있는 디자인이 필요하다는 생각이 들었다.


<br />

## 📁 프로젝트 구조

```markdown
📁
├─ public/ # 정적 파일
├─ src/
│ ├─ common/ # 공통 모듈
│ ├─ components/ # 재사용 가능한 UI 컴포넌트
│ ├─ customhook/ # 커스텀 훅 폴더
│ ├─ pages/ # 페이지 컴포넌트
│ ├─ supabase/ # Supabase 관련 모듈 관리
│ └─ zustand/ # Zustand 상태 관리 관련 파일
...
```

<br />

## 🧶 기술 스택

<div align="left">

### Environment

<img src="https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=https://upload.wikimedia.org/wikipedia/commons/a/a7/Visual_Studio_Code_1.35_icon.svg&logoColor=white" />
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
<br>

### Development

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&amp;logo=supabase&amp;logoColor=white">

### Record

<a href="https://www.figma.com/design/SnKoaJ8xQiLnqNhDQUaJEx/%EA%B0%90Chill%EB%A7%9B-%EB%B0%B1%EA%B3%BC?node-id=0-1&t=zT9Fy8RWzbVdfSol-1" target="blank"><img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" /></a>
<a href="https://www.notion.so/teamsparta/7-_chill-b92286d960044bd3923b6107df8497da" target="blank"><img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" alt="Notion" /></a>

<br>
