export default class Utils {
  static numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static parseDate = (x, g) => {
    const date = x.split(' ')[0].split('-');
    const gb = g ? g : '.';
    return `${date[1]}${gb}${date[2]}`;
  }
  
  static detailDay = term => {
    let str = '';
    switch(term.detailDay) {
      case 128: str += '협의'; break;
      case 127: str += '매일'; break;
      case 65: str += '주말'; break;
      case 62: str += '주중'; break;
      default: {
        let l = '';
        l = term.detailDay & 64 ? '일' : '';
        l += term.detailDay & 32 ? l !== '' ? '/월' : '월' : '';
        l += term.detailDay & 16 ? l !== '' ? '/화' : '화' : '';
        l += term.detailDay & 8 ? l !== '' ? '/수' : '수' : '';
        l += term.detailDay & 4 ? l !== '' ? '/목' : '목' : '';
        l += term.detailDay & 2 ? l !== '' ? '/금' : '금' : '';
        l += term.detailDay & 1 ? l !== '' ? '/토' : '토' : '';
        str += l;
        break;
      }
    }
    return str;
  }

  static detailDayChecker = (term, value) => {
    return term.detailDay & value ? true : false;
  }

  static alertError = e => {
    console.log(e);
    let rst = null;
    if(e.response) {
      if(e.response.data) {
        rst = e.response.data;
      } else {
        rst = e.response;
      }
    } else {
      rst = e;
    }
    return rst;
  }
}