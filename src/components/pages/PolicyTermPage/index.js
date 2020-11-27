import React, { useEffect } from 'react';
import { PageTemplate, TitleHeader } from "components";
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '600px',
    height: '100%',
  },
  title: {
    fontFamily: 'AppleSDGothicNeoL00',
    lineHeight: '1.3',
    color: '#707070',
    margin: '10px 0',
  },
  subTitle: {
    fontFamily: 'AppleSDGothicNeoUL00',
    lineHeight: '1.3',
    color: '#707070',
    margin: '10px 0 5px',
  },
  desc: {
    fontFamily: 'AppleSDGothicNeoT00',
    color: '#707070',
  },
}));

export default function PolicyTermPage(props) {
  const history = useHistory();
  
  useEffect(e => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = e => {
    history.replace("/signup_policy");
  }

  return (
    <PageTemplate header={<TitleHeader onBack={handleBack} {...props}>서비스 약관</TitleHeader>}>
      <Term />
    </PageTemplate>
  );
}

function Term() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        서비스 약관
      </h1>
      <div className={classes.desc}>
        해바 서비스를 이용해 주셔서 감사합니다.<br />
        지역 정보 서비스를 제공하는 해바의 약관은 아래와 같습니다.
      </div>
      <div className={classes.subTitle}>
        계정관련
      </div>
      <div className={classes.desc}>
        해바는 서비스 이용시 필수로 필요한 간단한 기본정보만을 수집/관리 합니다.<br />
        아래의 경우에는 계정 생성을 승인하지 않을수 있습니다.
      </div>
      <ol>
        <li className={classes.desc}>동일인이 다수의 계정을 생성하려 한 경우</li>
        <li className={classes.desc}>계정 생성시 필요한 정보를 입력하지 않거나 허위 정보를 입력한 경우</li>
        <li className={classes.desc}>해바의 운영원칙 또는 법률 위반 등의 정당한 사유로 해당 계정을 삭제 또는 징계한 경우</li>
        <li className={classes.desc}>타 서비스에서 유사한 사기 이력이 확인 된 경우</li>
      </ol>
      <div className={classes.desc}>
        계정은 본인만 이용할 수 있고, 다른 사람에게 이용을 허락하거나 양도할 수 없습니다.<br />
        사용자는 이메일 아이디와 닉네임(별명)을 제외한 모든 개인정보를 수정할 수 있습니다.
      </div>
      <div className={classes.subTitle}>
        사용시 주의해야 할 점
      </div>
      <div className={classes.desc}>
        해바는 사용자가 아래와 같이 잘못된 방법이나 행위로 서비스를 이용할 경우
        사용에 대한 제재(이용정지, 강제탈퇴 등)를 가할 수 있습니다.
      </div>
      <ol>
        <li className={classes.desc}>잘못된 방법으로 서비스의 제공을 방해하거나 해바가 안내하는 방법 이외의 다른 방법을 사용하여 해바 서비스에 접근하는 행위</li>
        <li className={classes.desc}>다른 이용자의 정보를 무단으로 수집, 이용하거나 다른 사람들에게 제공하는 행위</li>
        <li className={classes.desc}>서비스를 영리나 홍보 목적으로 이용하는 행위</li>
        <li className={classes.desc}>음란 정보나 저작권 침해 정보 등 공서양속 및 법령에 위반되는 내용의 정보 등을 발송하거나 게시하는 행위</li>
        <li className={classes.desc}>해바의 동의 없이 해바 서비스 또는 이에 포함된 소프트웨어의 일부를 복사, 수정, 배포, 판매, 양도, 대여, 담보제공하거나 타인에게 그 이용을 허락하는 행위</li>
        <li className={classes.desc}>소프트웨어를 역설계하거나 소스 코드의 추출을 시도하는 등 해바 서비스를 복제, 분해 또는 모방하거나 기타 변형하는 행위</li>
        <li className={classes.desc}>관련 법령, 해바의 모든 약관 또는 정책을 준수하지 않는 행위</li>
      </ol>
      <div className={classes.subTitle}>
        개인정보 보호 관련
      </div>
      <div className={classes.desc}>
        개인정보는 해바 서비스의 원활한 제공을 위하여 사용자가 동의한 목적과 범위 내에서만
        이용됩니다. 개인정보 보호 관련 기타 상세한 사항은 해바 개인정보처리방침을 참고하시기
        바랍니다.
      </div>
      <div className={classes.subTitle}>
        게시물의 저작권 보호
      </div>
      <ol>
        <li className={classes.desc}>해바 서비스 사용자가 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다.</li>
        <li className={classes.desc}>사용자가 서비스 내에 게시하는 게시물은 검색결과 내지 서비스 및 관련 프로모션, 광고 등에 노출될 수 있으며, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다.<br />이 경우, 해바는 저작권법 규정을 준수하며, 사용자는 언제든지 고객센터 또는 운영자 문의 기능을 통해 해당 게시물에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 요청할 수 있습니다.</li>
        <li className={classes.desc}>위 2항 이외의 방법으로 사용자의 게시물을 이용하고자 하는 경우에는 전화, 팩스, 전자우편 등을 통해 사전에 사용자의 동의를 얻어야 합니다.</li>
      </ol>
      <div className={classes.subTitle}>
        게시물의 관리
      </div>
      <ol>
        <li className={classes.desc}>사용자의 게시물이 "정보통신망법" 및 "저작권법"등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당 게시물의 게시중단 및 삭제 등을 요청할 수 있으며, 해바는 관련법에 따라 조치를 취하여야 합니다.</li>
        <li className={classes.desc}>해바는 전항에 따른 권리자의 요청이 없는 경우라도 권리침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련법에 위반되는 경우에는 관련법에 따라 해당 게시물에 대해 임시조치(삭제, 노출제한, 게시중단) 등을 취할 수 있습니다.</li>
      </ol>
      <div className={classes.subTitle}>
        사용권리
      </div>
      <div className={classes.desc}>
        해바는 서비스 이용을 위하여 양도불가능하고 무상의 라이선스를 사용자분들에게 제공합니다.<br />
        다만,해바 상표 및 로고를 사용할 권리를 사용자분들에게 부여하는 것은 아닙니다.
      </div>
      <div className={classes.subTitle}>
        서비스 고지 및 홍보내용 표시
      </div>
      <div className={classes.desc}>
        해바는 서비스 사용자분의 편의를 위해 서비스 이용과 관련된 각종 고지 및
        기타 해바 서비스 홍보를 포함한 다양한 정보를 해바 서비스에 표시하거나
        사용자의 휴대폰 문자로 발송할 수 있습니다.
      </div>
      <div className={classes.subTitle}>
        서비스 중단
      </div>
      <div className={classes.desc}>
        해바 서비스는 장비의 유지∙보수를 위한 정기 또는 임시 점검 또는 다른 상당한 이유로
        해바 서비스의 제공이 일시 중단될 수 있으며, 이때에는 미리 서비스 제공화면에 공지하겠습니다.<br />
        만약, 해바로서도 예측할 수 없는 이유로 해바 서비스가 중단된 때에는 해바가
        상황을 파악하는 즉시 통지하겠습니다.
      </div>
      <div className={classes.subTitle}>
        이용계약 해지(서비스 탈퇴)
      </div>
      <div className={classes.desc}>
        사용자가 해바 서비스의 이용을 더 이상 원치 않는 때에는 언제든지 해바 서비스 내
        제공되는 메뉴를 이용하여 해바 서비스 이용계약의 해지 신청을 할 수 있으며, 해바는
        법령이 정하는 바에 따라 신속히 처리하겠습니다.<br />
        다만, 거래사기 등의 부정이용 방지를 위해 거래를 진행중이거나 거래 관련 분쟁이 발생한 사용자는
         이용계약 해지 및 서비스 탈퇴가 특정 기간 동안 제한될 수 있습니다.<br />
         이용계약이 해지되면 법령 및 개인정보처리방침에 따라 사용자 정보를 보유하는 경우를 제외하고는
         사용자 정보나 사용자가 작성한 게시물 등 모든 데이터는 삭제됩니다.<br />
         다만, 사용자가 작성한 게시물이 제3자에 의하여 스크랩 또는 다른 공유 기능으로 게시되거나,
         사용자가 제3자의 게시물에 댓글, 채팅 등 게시물을 추가하는 등의 경우에는 다른 이용자의 정상적
         서비스 이용을 위하여 필요한 범위 내에서 해바 서비스 내에 삭제되지 않고 남아 있게 됩니다.
      </div>
      <div className={classes.subTitle}>
        책임제한
      </div>
      <div className={classes.desc}>
        해바는 법령상 허용되는 한도 내에서 해바 서비스와 관련하여 본 약관에 명시되지 않은
        어떠한 구체적인 사항에 대한 약정이나 보증을 하지 않습니다.<br />
        예를 들어, 해바는 해바 서비스에 속한 콘텐츠, 서비스의 특정 기능, 서비스의
        이용가능성에 대하여 어떠한 약정이나 보증을 하는 것이 아니며,
        해바 서비스를 있는 그대로 제공할 뿐입니다.
      </div>
      <div className={classes.subTitle}>
        손해배상
      </div>
      <div className={classes.desc}>
        해바의 과실로 인하여 사용자가 손해를 입게 될 경우 해바는 법령에 따라 사용자의 손해를 배상하겠습니다.<br />
        다만, 해바는 해바 서비스에 접속 또는 이용과정에서 발생하는 개인적인 손해,
        제3자가 불법적으로 해바의 서버에 접속하거나 서버를 이용함으로써 발생하는 손해,
        제3자가 해바 서버에 대한 전송 또는 해바 서버로부터의 전송을 방해함으로써 발생하는 손해,
        제3자가 악성 프로그램을 전송 또는 유포함으로써 발생하는 손해,
        전송된 데이터의 생략, 누락, 파괴 등으로 발생한 손해,
        명예훼손 등 제3자가 해바 서비스를 이용하는 과정에서 사용자에게 발생시킨 손해에 대하여
        책임을 부담하지 않습니다.<br />
        또한 해바는 법률상 허용되는 한도 내에서 간접 손해, 특별 손해, 결과적 손해, 징계적 손해,
        및 징벌적 손해에 대한 책임을 부담하지 않습니다.
      </div>
      <div className={classes.subTitle}>
        약관수정
      </div>
      <div className={classes.desc}>
        해바는 법률이나 해바 서비스의 변경사항을 반영하기 위한 목적 등으로 본 약관이나
        각 해바 서비스 고객센터의 해바 서비스 이용방법,
        해당 안내 및 고지사항을 수정할 수 있습니다.<br />
        본 약관이 변경되는 경우 해바는 변경 사항을 개별 해바 서비스 초기화면에 게시하며,
        변경된 약관은 게시한 날로부터 즉시 효력이 발생합니다.<br />
        사용자가 변경된 약관에 동의하지 않는 경우 변경된 약관의 적용을 받는 해당 서비스의 제공이
        더 이상 불가능하게 됩니다.
      </div>
      <div className={classes.subTitle}>
        사용자 의견
      </div>
      <div className={classes.desc}>
        해바는 사용자의 의견을 소중하게 생각합니다. 사용자는 언제든지 서비스 내 해바
        운영자 문의란을 통해 의견을 개진할 수 있습니다.<br />
        해바는 푸시 알림, 채팅 방법, 휴대폰 번호 등으로 사용자에게 여러 가지 소식을 알려드리며,
        사용자 전체에 대한 통지는 해바 서비스 초기화면 또는 공지사항 란에 게시함으로써 효력이
        발생합니다.<br />
        본 약관은 해바와 사용자와의 관계에 적용되며, 제3자의 수익권을 발생시키지 않습니다.<br />
        사용자가 본 약관을 준수하지 않은 경우에, 해바가 즉시 조치를 취하지 않더라도 해바가
        가지고 있는 권리를 포기하는 것이 아니며,
        본 약관 중 일부 조항의 집행이 불가능하게 되더라도 다른 조항에는 영향을 미치지 않습니다.<p />
        본 약관 또는 해바 서비스와 관련하여서는 대한민국의 법률이 적용됩니다.
      </div>
      <ul>
        <li className={classes.desc}>공고 및 시행일자: 2020년 11월 30일</li>
      </ul>
    </div>
  );
}
